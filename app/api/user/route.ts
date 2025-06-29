import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { updateUserSchema } from "@/lib/zod/schemas/user";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { hashToken } from "@/lib/auth/hash-token";
import { waitUntil } from "@vercel/functions";
import { sendEmail } from "@/emails/send";
import { redis } from "@/lib/upstash/redis";
import ConfirmEmailChange from "@/emails/confirm-email.change";
import { ratelimit } from "@/lib/upstash/ratelimit";
import { unsubscribe } from "@/lib/resend/unsubscribe";

export const PATCH = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const { success, data } = await updateUserSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { name, email, defaultWorkspace } = data;

    if (defaultWorkspace) {
      const workspaceUser = await prisma.workspaceUser.findFirst({
        where: {
          userId: session.user.id,
          workspace: {
            slug: defaultWorkspace
          }
        }
      });

      if (!workspaceUser) {
        throw new PatternRevealApiError({
          code: "forbidden",
          message: `You don't have access to workspace "${defaultWorkspace}".`
        });
      }
    }

    if (email && email !== session.user.email) {
      const userWithEmail = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (userWithEmail) {
        throw new PatternRevealApiError({
          code: "conflict",
          message: "Email already in use."
        });
      }

      // Allow 10 email change requests per day
      const { success } = await ratelimit(10, "1 d").limit(
        `email-change-request:${session.user.id}`
      );

      if (!success) {
        throw new PatternRevealApiError({
          code: "rate_limit_exceeded",
          message:
            "You've requested too many email change requests. Please try again later."
        });
      }

      // Create token
      const token = randomBytes(32).toString("hex");
      const expiresIn = 15 * 60 * 1000; // 15 minutes

      await prisma.verificationToken.create({
        data: {
          identifier: session.user.id,
          token: await hashToken(token, { secret: true }),
          expires: new Date(Date.now() + expiresIn)
        }
      });

      await redis.set(
        `email-change-request:user:${session.user.id}`,
        {
          email: session.user.email,
          newEmail: email
        },
        {
          px: expiresIn
        }
      );

      waitUntil(
        sendEmail({
          subject: "Confirm your email address change",
          email,
          react: ConfirmEmailChange({
            email: session.user.email,
            newEmail: email,
            confirmUrl: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/confirm-email-change/${token}`
          })
        })
      );
    }

    try {
      const response = await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: {
          ...(name && { name }),
          ...(defaultWorkspace && { defaultWorkspace })
        }
      });

      return NextResponse.json(response);
    } catch (error) {
      throw new PatternRevealApiError({
        code: "internal_server_error",
        message: "Failed to update user."
      });
    }
  },
  {
    requiredPermissions: ["mood.write"]
  }
);

export const PUT = PATCH;

export const DELETE = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const userOwnsWorkspaces = await prisma.workspaceUser.findMany({
      where: {
        userId: session.user.id,
        role: "OWNER"
      }
    });

    console.log({ userOwnsWorkspaces });

    if (userOwnsWorkspaces.length > 0) {
      throw new PatternRevealApiError({
        code: "forbidden",
        message:
          "You must transfer ownership of your workspaces or delete them before deleting your account."
      });
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id: session.user.id
      }
    });

    // Unsubscribe from email list
    await unsubscribe({
      email: session.user.email
    });

    return NextResponse.json(deletedUser);
  },
  {
    requiredPermissions: ["mood.write"]
  }
);

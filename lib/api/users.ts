import type { Role, WorkspaceWithUsers } from "@/lib/types";
import prisma from "../prisma";

import { randomBytes } from "crypto";
import { ONE_WEEK_IN_SECONDS } from "@/utils/constants";
import { PatternRevealApiError } from "./errors";
import { Prisma } from "@prisma/client";
import { hashToken } from "../auth/hash-token";
import { sendEmail } from "@/emails/send";
import WorkspaceInvite from "@/emails/workspace-invite";
import type { Session } from "../auth/authOptions";

export async function inviteUser({
  email,
  role = "MEMBER",
  workspace,
  session
}: {
  email: string;
  role?: Role;
  workspace: WorkspaceWithUsers;
  session?: Session;
}) {
  // same method of generating a token as next-auth
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + ONE_WEEK_IN_SECONDS * 1000);

  // create a workspace invite record and a verification request token that lasts for a week
  // here we use a try catch to account for the case where the user has already been invited
  // for which `prisma.workspaceInvite.create()` will throw a unique constraint error
  try {
    await prisma.workspaceInvite.create({
      data: {
        email,
        role,
        expires,
        workspaceId: workspace.id
      }
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new PatternRevealApiError({
        code: "conflict",
        message: "User has already been invited to this workspace."
      });
    }
  }

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: await hashToken(token, { secret: true }),
      expires
    }
  });

  const params = new URLSearchParams({
    callbackUrl: `${process.env.NEXTAUTH_URL}/${workspace.slug}?invite=1`,
    email,
    token
  });

  const url = `${process.env.NEXTAUTH_URL}/api/auth/callback/email?${params}`;

  return await sendEmail({
    subject: `You've been invited to join a workspace on ${process.env.NEXT_PUBLIC_APP_NAME}`,
    email,
    react: WorkspaceInvite({
      email,
      url,
      workspaceName: workspace.name,
      workspaceUser: session?.user.name || null,
      workspaceUserEmail: session?.user.email || null
    })
  });
}

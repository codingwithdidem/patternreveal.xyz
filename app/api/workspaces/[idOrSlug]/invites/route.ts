import { exceededLimitError, PatternRevealApiError } from "@/lib/api/errors";
import { inviteUser } from "@/lib/api/users";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/upstash/redis";
import { inviteTeammatesSchema } from "@/lib/zod/schemas/invites";
import { NextResponse } from "next/server";
import { z } from "zod";

// GET /api/workspaces/:idOrSlug/invites - Get invites for a workspace
export const GET = withWorkspace(
  async ({ workspace }) => {
    const invites = await prisma.workspaceInvite.findMany({
      where: {
        workspaceId: workspace.id,
      },
      select: {
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(invites);
  },
  {
    requiredPermissions: ["workspaces.read"],
  }
);

// POST /api/workspaces/:idOrSlug/invites - Create an invite for a workspace
export const POST = withWorkspace(
  async ({ req, workspace, session }) => {
    const { teammates } = await inviteTeammatesSchema.parseAsync(
      await parseRequestBody(req)
    );

    if (teammates.length >= 10) {
      throw new PatternRevealApiError({
        message: "You can only invite up to 10 teammates at a time",
        code: "bad_request",
      });
    }

    const [alreadyMemberOfWorkspace, workspaceUserCount, workspaceInviteCount] =
      await Promise.all([
        prisma.workspaceUser.findFirst({
          where: {
            workspaceId: workspace.id,
            user: {
              email: { in: teammates.map((teammate) => teammate.email) },
            },
          },
        }),
        prisma.workspaceUser.count({ where: { workspaceId: workspace.id } }),
        prisma.workspaceInvite.count({ where: { workspaceId: workspace.id } }),
      ]);

    if (alreadyMemberOfWorkspace) {
      throw new PatternRevealApiError({
        message:
          "One or more of the emails you provided are already members of this workspace",
        code: "bad_request",
      });
    }

    if (workspaceUserCount + workspaceInviteCount > workspace.usersLimit) {
      throw new PatternRevealApiError({
        code: "exceeded_limit",
        message: exceededLimitError({
          plan: workspace.plan,
          limit: workspace.usersLimit,
          type: "users",
        }),
      });
    }

    // Delete saved invites
    await redis.del(`invites:${workspace.id}`);

    // Create invites
    const results = await Promise.allSettled(
      teammates.map(({ email, role }) =>
        inviteUser({
          email,
          role,
          workspace,
          session,
        })
      )
    );

    if (results.some((result) => result.status === "rejected")) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message:
          teammates.length > 1
            ? "Some invitations could not be sent."
            : "Invitation could not be sent.",
      });
    }

    return NextResponse.json({
      message: "Invite(s) sent",
    });
  },
  {
    requiredPermissions: ["workspaces.write"],
  }
);

// DELETE /api/workspaces/:idOrSlug/invites/:id - Delete an invite for a workspace
export const DELETE = withWorkspace(
  async ({ searchParams, workspace }) => {
    const { email } = z.object({ email: z.string() }).parse(searchParams);

    const response = await prisma.workspaceInvite.delete({
      where: {
        email_workspaceId: {
          email,
          workspaceId: workspace.id,
        },
      },
    });

    return NextResponse.json(response);
  },
  {
    requiredPermissions: ["workspaces.write"],
  }
);

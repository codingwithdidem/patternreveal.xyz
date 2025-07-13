import { exceededLimitError } from "@/lib/api/errors";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import type { PlanProps } from "@/lib/types";
import { NextResponse } from "next/server";

// POST /api/workspaces/[idOrSlug]/invites/accept – accept a workspace invite
export const POST = withPermissions(async ({ session, params }) => {
  const { idOrSlug: slug } = params;

  const invite = await prisma.workspaceInvite.findFirst({
    where: {
      email: session.user.email,
      workspace: {
        slug
      }
    },
    select: {
      expires: true,
      role: true,
      workspace: {
        select: {
          id: true,
          slug: true,
          plan: true,
          usersLimit: true,
          _count: {
            select: {
              users: true
            }
          }
        }
      }
    }
  });

  if (!invite) {
    return new Response("Invalid invite", { status: 404 });
  }

  if (invite.expires < new Date()) {
    return new Response("Invite expired", { status: 410 });
  }

  const workspace = invite.workspace;

  if (workspace._count.users >= workspace.usersLimit) {
    return new Response(
      exceededLimitError({
        plan: workspace.plan as PlanProps,
        limit: workspace.usersLimit,
        type: "users"
      }),
      {
        status: 403
      }
    );
  }

  const response = await Promise.all([
    prisma.workspaceUser.create({
      data: {
        userId: session.user.id,
        role: invite.role,
        workspaceId: workspace.id
      }
    }),
    prisma.workspaceInvite.delete({
      where: {
        email_workspaceId: {
          email: session.user.email,
          workspaceId: workspace.id
        }
      }
    }),
    session.user["defaultWorkspace"] === null &&
      prisma.user.update({
        where: {
          id: session.user.id
        },
        data: {
          defaultWorkspace: workspace.slug
        }
      })
  ]);
  return NextResponse.json(response);
});

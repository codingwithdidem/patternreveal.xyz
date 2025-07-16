import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import prisma from "@/lib/prisma";
import { throwIfNoAccess } from "@/lib/tokens/permissions";
import { roles } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(roles, {
    errorMap: () => ({
      message: `Role must be either "owner" or "member".`
    })
  })
});

const removeUserSchema = z.object({
  userId: z.string().min(1)
});

// GET /api/workspaces/:idOrSlug/members - Get members for a workspace
export const GET = withWorkspace(async ({ workspace }) => {
  const members = await prisma.workspaceUser.findMany({
    where: {
      workspaceId: workspace.id
    },
    select: {
      id: true,
      role: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true
        }
      }
    },
    orderBy: [
      { role: "asc" }, // OWNER first, then MEMBER
      { createdAt: "asc" }
    ]
  });

  return NextResponse.json(
    members.map((member) => ({
      ...member.user,
      role: member.role
    }))
  );
});

// PATCH /api/workspaces/:idOrSlug/members/:userId - Update member role
export const PATCH = withWorkspace(async ({ req, workspace, searchParams }) => {
  const { success, data } = await updateRoleSchema.safeParse(
    await parseRequestBody(req)
  );

  if (!success) {
    throw new PatternRevealApiError({
      code: "bad_request",
      message: "Invalid request body format."
    });
  }

  const { userId, role } = data;

  const updatedMember = await prisma.workspaceUser.update({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId: workspace.id
      }
    },
    data: { role },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    }
  });

  return NextResponse.json(updatedMember);
});

// DELETE /api/workspaces/:idOrSlug/members/:userId - Remove member from workspace or leave workspace
export const DELETE = withWorkspace(
  async ({ workspace, searchParams, session, permissions }) => {
    const { success, data } = removeUserSchema.safeParse(searchParams);

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { userId } = data;

    if (userId !== session.user.id) {
      throwIfNoAccess({
        permissions,
        requiredPermissions: ["workspaces.write"]
      });
    }

    const [workspaceUser, workspaceOwnerCount] = await Promise.all([
      prisma.workspaceUser.findUnique({
        where: {
          userId_workspaceId: {
            userId,
            workspaceId: workspace.id
          }
        }
      }),
      prisma.workspaceUser.count({
        where: {
          workspaceId: workspace.id,
          role: "OWNER"
        }
      })
    ]);

    if (!workspaceUser) {
      throw new PatternRevealApiError({
        code: "not_found",
        message: "Workspace user not found."
      });
    }

    // If the user is the last owner and is deleting themselves, throw an error
    if (
      workspaceUser.role === "OWNER" &&
      workspaceOwnerCount === 1 &&
      userId === session.user.id
    ) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message:
          "Cannot delete the last owner of the workspace. Please transfer ownership to another member first."
      });
    }

    await prisma.workspaceUser.delete({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId: workspace.id
        }
      }
    });

    return NextResponse.json({ success: true });
  }
);

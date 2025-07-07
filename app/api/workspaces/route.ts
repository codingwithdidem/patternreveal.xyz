import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import {
  createWorkspaceSchema,
  WorkspaceSchema
} from "@/lib/zod/schemas/workspace";
import { PatternRevealApiError } from "@/lib/api/errors";
import { Prisma } from "@prisma/client";
import { FREE_WORKSPACES_LIMIT } from "@/lib/constants/limits";
import { nanoid } from "@/utils/functions/nanoid";
import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { cancelSubscription } from "@/lib/paddle/cancel-subscription";

export const GET = withPermissions(
  async ({ session }) => {
    const workspaces = await prisma.workspace.findMany({
      where: {
        users: {
          some: {
            userId: session.user.id
          }
        }
      }
    });

    return NextResponse.json(workspaces);
  },
  {
    requiredPermissions: []
  }
);

export const POST = withPermissions(
  async ({ req, session }) => {
    const { name, slug } = await createWorkspaceSchema.parseAsync(
      await parseRequestBody(req)
    );

    try {
      const workspace = await prisma.$transaction(
        async (tx) => {
          const freeWorkspacesCount = await tx.workspace.count({
            where: {
              plan: "free",
              users: {
                some: {
                  userId: session.user.id,
                  role: "OWNER"
                }
              }
            }
          });

          if (freeWorkspacesCount >= FREE_WORKSPACES_LIMIT) {
            throw new PatternRevealApiError({
              code: "exceeded_limit",
              message: "You have reached the limit of free workspaces"
            });
          }

          const result = await tx.workspace.create({
            data: {
              name,
              slug,
              users: {
                create: {
                  userId: session.user.id,
                  role: "OWNER"
                }
              },
              billingCycleStart: new Date().getDate(),
              inviteCode: nanoid(24),
              store: {}
            },
            include: {
              users: {
                where: {
                  userId: session.user.id
                },
                select: {
                  role: true
                }
              }
            }
          });
          return result;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          maxWait: 5000,
          timeout: 5000
        }
      );

      // if the user has no default workspace, set the new workspace as the default
      if (
        session.user.defaultWorkspace === null ||
        session.user.defaultWorkspace === undefined
      ) {
        waitUntil(
          prisma.user.update({
            where: {
              id: session.user.id
            },
            data: {
              defaultWorkspace: workspace.slug
            }
          })
        );
      }

      return NextResponse.json(WorkspaceSchema.parse(workspace));
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PatternRevealApiError({
          code: "conflict",
          message: `The slug "${slug}" is already in use.`
        });
      }

      if (error instanceof PatternRevealApiError) {
        throw error;
      }

      throw new PatternRevealApiError({
        code: "internal_server_error",
        message: "Error creating workspace. Please try again later."
      });
    }
  },
  {
    requiredPermissions: []
  }
);

export const DELETE = withWorkspace(
  async ({ workspace, headers, session }) => {
    // Check if the user is the owner of the workspace
    const isOwner = await prisma.workspaceUser.findFirst({
      where: {
        workspaceId: workspace.id,
        userId: session.user.id,
        role: "OWNER"
      }
    });

    if (!isOwner) {
      throw new PatternRevealApiError({
        code: "unauthorized",
        message: "You are not the owner of this workspace"
      });
    }

    await Promise.all([
      // Delete all the users from the workspace
      prisma.workspaceUser.deleteMany({
        where: {
          workspaceId: workspace.id
        }
      }),
      // Update the user's default workspace to the first workspace
      prisma.user.updateMany({
        where: {
          defaultWorkspace: workspace.slug
        },
        data: {
          defaultWorkspace: null
        }
      })
    ]);

    waitUntil(
      Promise.all([
        // Cancel the workspace subscription if it exists
        workspace.paddleId && cancelSubscription(workspace.paddleId),

        // Queue the workspace for deletion
        prisma.workspace.delete({
          where: {
            id: workspace.id
          }
        })
      ])
    );

    return NextResponse.json(
      {
        ...WorkspaceSchema.parse({
          ...workspace
        })
      },
      { headers }
    );
  },
  {
    requiredPermissions: ["mood.read"]
  }
);

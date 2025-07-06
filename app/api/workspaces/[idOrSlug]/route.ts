import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import prisma from "@/lib/prisma";
import {
  updateWorkspaceSchema,
  WorkspaceSchema
} from "@/lib/zod/schemas/workspace";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = withWorkspace(
  async ({ workspace, headers }) => {
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

export const PATCH = withWorkspace(
  async ({ req, workspace, headers }) => {
    const { name } = await updateWorkspaceSchema.parseAsync(
      await parseRequestBody(req)
    );

    try {
      const workspaceUpdated = await prisma.workspace.update({
        where: {
          id: workspace.id
        },
        data: {
          ...(name && { name })
        }
      });

      return NextResponse.json(
        {
          ...WorkspaceSchema.parse({
            ...workspaceUpdated
          })
        },
        { headers }
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new PatternRevealApiError({
            code: "conflict",
            message: "Workspace name already exists"
          });
        }

        throw new PatternRevealApiError({
          code: "internal_server_error",
          message: "Failed to update workspace"
        });
      }

      throw error;
    }
  },
  {
    requiredPermissions: ["mood.read"]
  }
);

export const PUT = PATCH;

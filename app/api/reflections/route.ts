import { PatternRevealApiError } from "@/lib/api/errors";
import {
  throwIfReflectionsUsageExceeded,
  updateReflectionsUsage,
} from "@/lib/api/reflections";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import prisma from "@/lib/prisma";

import {
  createReflectionSchema,
  deleteReflectionSchema,
  getReflectionsQuerySchemaExtended,
} from "@/lib/zod/schemas/reflection";
import { waitUntil } from "@vercel/functions";
import { NextResponse } from "next/server";

/**
 * Get all reflection entries. Requires the `reflection.read` permission.
 */
export const GET = withWorkspace(
  async ({ headers, workspace, searchParams }) => {
    const params = getReflectionsQuerySchemaExtended.parse(searchParams);

    const {
      page,
      pageSize,
      sortBy,
      sortOrder,
      search,
      searchMode,
      userId,
      includeAIReport,
      includeUser,
      includeDashboard,
      status,
      creators,
    } = params;

    // Get total count for pagination
    const total = await prisma.reflection.count({
      where: {
        workspaceId: workspace.id,
      },
    });

    const reflections = await prisma.reflection.findMany({
      where: {
        workspaceId: workspace.id,
        ...(userId && {
          userId,
        }),
        ...(search && [
          {
            ...(searchMode === "fuzzy" && {
              OR: [
                {
                  title: { contains: search },
                },
                {
                  content: { contains: search },
                },
              ],
            }),
            ...(searchMode === "exact" && {
              OR: [
                {
                  title: { equals: search },
                },
                {
                  content: { equals: search },
                },
              ],
            }),
          },
        ]),
        ...(creators &&
          creators.length > 0 && {
            userId: { in: creators },
          }),
        ...(status !== undefined && {
          ...(status === "has-ai-report" && {
            analysisReport: {
              isNot: null,
            },
          }),
          ...(status === "no-ai-report" && {
            analysisReport: null,
          }),
        }),
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        ...(includeAIReport && {
          analysisReport: true,
        }),
        ...(includeUser && {
          user: true,
        }),
        ...(includeDashboard && {
          Workspace: true,
        }),
      },
    });

    return NextResponse.json(
      {
        reflections,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
          hasNextPage: page * pageSize < total,
          hasPrevPage: page > 1,
        },
      },
      {
        headers,
      }
    );
  },
  {
    requiredPermissions: ["reflection.read"],
  }
);

/**
 * Create a new reflection entry. Requires the `reflection.write` permission.
 */
export const POST = withWorkspace(
  async ({ req, headers, workspace, session }) => {
    console.log({
      workspace,
      session,
    });
    if (workspace) {
      throwIfReflectionsUsageExceeded(workspace);
    }

    const { success, data } = await createReflectionSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format.",
      });
    }

    const { title, initialContent, content } = data;

    try {
      const response = await prisma.reflection.create({
        data: {
          title,
          initialContent,
          content,
          workspaceId: workspace.id,
          userId: session.user.id,
        },
      });

      waitUntil(
        updateReflectionsUsage({
          workspaceId: workspace.id,
          increment: 1,
        })
      );

      return NextResponse.json(response, {
        headers,
      });
    } catch {
      throw new PatternRevealApiError({
        code: "internal_server_error",
        message: "Failed to create reflection.",
      });
    }
  }
);

/**
 * Delete a reflection entry. Requires the `reflection.write` permission.
 *
 * @param reflectionId The ID of the reflection to delete.
 * @returns The deleted reflection.
 */
export const DELETE = withWorkspace(
  async ({ headers, workspace, searchParams }) => {
    const { success, data } = await deleteReflectionSchema.safeParse(
      searchParams
    );

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format.",
      });
    }

    const { reflectionId } = data;

    try {
      const response = await prisma.reflection.delete({
        where: {
          id: reflectionId,
          workspaceId: workspace.id,
        },
      });

      // Update the workspace total reflections count
      waitUntil(
        prisma.workspace.update({
          where: {
            id: workspace.id,
          },
          data: {
            totalReflections: {
              decrement: 1,
            },
          },
        })
      );

      return NextResponse.json(response, {
        headers,
      });
    } catch {
      throw new PatternRevealApiError({
        code: "internal_server_error",
        message: "Failed to delete reflection.",
      });
    }
  }
);

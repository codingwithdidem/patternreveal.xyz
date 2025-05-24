import { ManipulatedIOApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import {
  createReflectionSchema,
  deleteReflectionSchema
} from "@/lib/zod/schemas/reflection";
import { NextResponse } from "next/server";

/**
 * Get all reflection entries. Requires the `reflection.read` permission.
 */
export const GET = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const response = await prisma.reflection.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        analysisReport: true
      },
      orderBy: {
        createdAt: "desc" // Sort by createdAt in descending order (newest first)
      }
    });

    return NextResponse.json(response, {
      headers
    });
  },
  {
    requiredPermissions: ["reflection.read"]
  }
);

/**
 * Create a new reflection entry. Requires the `reflection.write` permission.
 */
export const POST = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const { success, data } = await createReflectionSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new ManipulatedIOApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { title, initialContent, content } = data;

    try {
      const response = await prisma.reflection.create({
        data: {
          title,
          initialContent,
          content,
          userId: session.user.id
        }
      });

      return NextResponse.json(response, {
        headers
      });
    } catch (err) {
      throw new ManipulatedIOApiError({
        code: "internal_server_error",
        message: "Failed to create reflection."
      });
    }
  },
  {
    requiredPermissions: ["reflection.write"]
  }
);

/**
 * Delete a reflection entry. Requires the `reflection.write` permission.
 *
 * @param reflectionId The ID of the reflection to delete.
 * @returns The deleted reflection.
 */
export const DELETE = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const { success, data } =
      await deleteReflectionSchema.safeParse(searchParams);

    if (!success) {
      throw new ManipulatedIOApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { reflectionId } = data;

    try {
      const response = await prisma.reflection.delete({
        where: {
          id: reflectionId
        }
      });

      return NextResponse.json(response, {
        headers
      });
    } catch {
      throw new ManipulatedIOApiError({
        code: "internal_server_error",
        message: "Failed to delete reflection."
      });
    }
  },
  {
    requiredPermissions: ["reflection.write"]
  }
);

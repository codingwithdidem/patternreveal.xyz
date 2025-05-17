import { ManipulatedIOApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { updateReflectionSchema } from "@/lib/zod/schemas/reflection";
import { NextResponse } from "next/server";

/**
 * Get reflection entry by ID. Requires the `reflection.read` permission.
 */
export const GET = withPermissions(
  async ({ headers, session, params }) => {
    const { reflectionId } = params;

    const reflection = await prisma.reflection.findUnique({
      where: {
        id: reflectionId,
        userId: session.user.id
      },
      include: {
        analysisReport: true
      }
    });

    if (!reflection) {
      return NextResponse.json(
        { error: "Reflection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reflection, {
      headers
    });
  },
  {
    requiredPermissions: ["reflection.read"]
  }
);

/**
 * Update reflection entry by ID. Requires the `reflection.write` permission.
 *
 */
export const PATCH = withPermissions(
  async ({ headers, session, params, req }) => {
    console.log("PATCHHHHHHHHH");
    const { reflectionId } = params;

    const { success, data } = await updateReflectionSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new ManipulatedIOApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { title, content } = data;

    console.log("content", content);

    try {
      const response = await prisma.reflection.update({
        where: {
          id: reflectionId
        },
        data: {
          title,
          content: JSON.stringify(content)
        }
      });

      console.log(response);

      return NextResponse.json(response, {
        headers
      });
    } catch {
      console.log("smth");
      throw new ManipulatedIOApiError({
        code: "internal_server_error",
        message: "Failed to update reflection."
      });
    }
  },
  {
    requiredPermissions: ["reflection.write"]
  }
);

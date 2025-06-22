import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { createMoodSchema } from "@/lib/zod/schemas/mood";
import { NextResponse } from "next/server";

/**
 * Get all mood entries. Requires the `mood.read` permission.
 */
export const GET = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const response = await prisma.mood.findMany({
      where: {
        userId: session.user.id
      }
    });

    return NextResponse.json(response, {
      headers
    });
  },
  {
    requiredPermissions: ["mood.read"]
  }
);

/**
 * Create a new mood entry. Requires the `mood.write` permission.
 */
export const POST = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const { success, data } = await createMoodSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { mood, note } = data;

    try {
      const response = await prisma.mood.create({
        data: {
          mood,
          note,
          userId: session.user.id
        }
      });

      return NextResponse.json(response, {
        headers
      });
    } catch {
      throw new PatternRevealApiError({
        code: "internal_server_error",
        message: "Failed to create mood."
      });
    }
  },
  {
    requiredPermissions: ["mood.write"]
  }
);

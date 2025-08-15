import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { createMoodSchema } from "@/lib/zod/schemas/mood";
import { NextResponse } from "next/server";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { throwIfProFeatureNotAvailable } from "@/lib/api/reflections";
import { z } from "zod";

/**
 * Get all mood entries. Requires the `mood.read` permission.
 */
export const GET = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const response = await prisma.mood.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(response, {
      headers,
    });
  },
  {
    requiredPermissions: ["mood.read"],
  }
);

const moodSchema = z.object({
  mood: z.string(),
  note: z.string().optional(),
});

/**
 * Create a new mood entry. Requires the `mood.write` permission.
 */
export const POST = withWorkspace(async ({ req, session, workspace }) => {
  // Check if mood tracker is available for this plan
  throwIfProFeatureNotAvailable(workspace, "mood-tracker");

  const { mood, note } = await moodSchema.parseAsync(
    await parseRequestBody(req)
  );

  const moodEntry = await prisma.mood.create({
    data: {
      mood,
      note,
      userId: session.user.id,
    },
  });

  return NextResponse.json(moodEntry);
}, {});

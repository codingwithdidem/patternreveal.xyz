import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { NextResponse } from "next/server";
import { analyzeReflectionSchema } from "@/lib/zod/schemas/reflection";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { type Analysis, analysisSchema } from "@/lib/zod/schemas/analysis";
import prisma from "@/lib/prisma";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import {
  ANALYSIS_SYSTEM_PROMPT,
  createAnalysisPrompt,
} from "@/lib/ai/prompts/analyze";
import { record_pattern_analytics } from "@/lib/tinybird/record_pattern_analytics";
import { throwIfAIUsageExceeded } from "@/lib/api/reflections";

export const POST = withWorkspace(
  async ({ req, headers, session, workspace }) => {
    const { success, data } = await analyzeReflectionSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format.",
      });
    }

    const { reflectionId, story } = data;

    try {
      // Check AI usage limits before proceeding
      throwIfAIUsageExceeded(workspace);

      // Get additional context about the reflection for better analysis
      const reflection = await prisma.reflection.findUnique({
        where: { id: reflectionId },
        include: {
          Workspace: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });

      if (!reflection) {
        throw new PatternRevealApiError({
          code: "not_found",
          message: "Reflection not found.",
        });
      }

      const startTime = Date.now();

      const { object, usage } = await generateObject({
        model: openai("gpt-4-turbo"),
        system: ANALYSIS_SYSTEM_PROMPT,
        prompt: createAnalysisPrompt(
          reflection.Workspace?.name || "Unknown",
          reflection.title,
          reflection.createdAt.toISOString(),
          story
        ),
        schema: analysisSchema,
        temperature: 0.3, // Lower temperature for more consistent analysis
      });

      const analysisDurationMs = Date.now() - startTime;

      if (!object) {
        throw new PatternRevealApiError({
          code: "internal_server_error",
          message: "Failed to generate analysis.",
        });
      }

      // Update AI usage after successful analysis
      await prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          aiUsage: {
            increment: 1,
          },
        },
      });

      // Save the comprehensive analysis to the database
      await prisma.reflection.update({
        where: {
          id: reflectionId,
        },
        data: {
          analysisReport: {
            upsert: {
              create: {
                report: object,
              },
              update: {
                report: object,
              },
            },
          },
        },
      });

      if (!session?.user?.id) {
        throw new PatternRevealApiError({
          code: "unauthorized",
          message: "User ID is required",
        });
      }

      // Record pattern analytics for insights
      if (session?.user?.id) {
        // Record analytics asynchronously without blocking the response
        record_pattern_analytics({
          userId: session.user.id,
          workspaceId: workspace.id,
          reflectionId: reflectionId,
          analysis: object as Analysis,
          analysisDurationMs,
          aiModelUsed: "gpt-4-turbo",
          userPlan: workspace.plan,
          reflectionCreatedAt: reflection.createdAt.toISOString(),
        }).catch((error) => {
          console.error("Failed to record pattern analytics:", error);
        });
      }

      return NextResponse.json(object, {
        headers,
      });
    } catch (error) {
      console.error("Analysis generation error:", error);
      throw new PatternRevealApiError({
        code: "internal_server_error",
        message: "Failed to generate comprehensive analysis.",
      });
    }
  }
);

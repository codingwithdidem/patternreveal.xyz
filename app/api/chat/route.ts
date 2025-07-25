import { findRelevantContent } from "@/lib/ai/embedding";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import {
  throwIfProFeatureNotAvailable,
  throwIfAIUsageExceeded,
} from "@/lib/reflections/usage-checks";
import prisma from "@/lib/prisma";
import { CHAT_SYSTEM_PROMPT } from "@/lib/ai/prompts/chat";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const POST = withWorkspace(
  async ({ req, workspace }) => {
    // Check if Ask AI is available for this plan
    throwIfProFeatureNotAvailable(workspace, "ask-ai");

    // Check AI usage limits
    throwIfAIUsageExceeded(workspace, "ask-ai");

    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-4o"),
      system: CHAT_SYSTEM_PROMPT,
      messages,
      tools: {
        getInformation: tool({
          description:
            "get information from your knowledge base to analyze reflections and answer questions",
          parameters: z.object({
            question: z
              .string()
              .describe("the user's reflection or question to analyze"),
          }),
          execute: async ({ question }) => {
            // First try to find exact matches
            let relevantContent = await findRelevantContent(question);

            // If no results, try breaking down the content into smaller chunks
            if (relevantContent.length === 0) {
              const sentences = question.split(/[.!?]+/).filter(Boolean);
              for (const sentence of sentences) {
                const results = await findRelevantContent(sentence);
                relevantContent = [...relevantContent, ...results];
              }
            }

            return relevantContent.map(({ content }) => ({
              content,
            }));
          },
        }),
      },
    });

    // Update AI usage after successful chat
    await prisma.workspace.update({
      where: { id: workspace.id },
      data: {
        aiUsage: {
          increment: 1,
        },
      },
    });

    return result.toDataStreamResponse();
  },
  {
    requiredPlan: ["pro"],
  }
);

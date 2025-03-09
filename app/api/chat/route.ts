import { findRelevantContent } from "@/lib/ai/embedding";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are an expert in the field of abuse in relationships. 
    You will receive a user's reflection of their day and they may ask questions about abuse in their relationships.
    IMPORTANT: Always analyze the reflection first using the getInformation tool before responding.
    
    When analyzing reflections:
    1. Look for patterns or signs that might indicate concerning behavior
    2. Consider both explicit and implicit signs in the reflection
    3. Use the knowledge base to provide relevant, evidence-based insights
    4. If you find concerning patterns, explain them clearly
    
    For follow-up questions:
    1. Check the knowledge base using the getInformation tool
    2. Provide specific, relevant information from the knowledge base
    3. If no relevant information is found, explain why and suggest seeking professional help
    
    Never say "I don't know" without first checking the knowledge base and analyzing the content.`,
    messages,
    tools: {
      getInformation: tool({
        description:
          "get information from your knowledge base to analyze reflections and answer questions",
        parameters: z.object({
          question: z
            .string()
            .describe("the user's reflection or question to analyze")
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
            content
          }));
        }
      })
    }
  });

  return result.toDataStreamResponse();
}

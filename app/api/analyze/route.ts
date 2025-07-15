import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import { NextResponse } from "next/server";
import { analyzeReflectionSchema } from "@/lib/zod/schemas/reflection";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { type Analysis, analysisSchema } from "@/lib/zod/schemas/analysis";
import prisma from "@/lib/prisma";
import { waitUntil } from "@vercel/functions";
import { record_reflection_report } from "@/lib/tinybird/record_reflection_report";

export const POST = withPermissions(
  async ({ req, headers, session }) => {
    const { success, data } = await analyzeReflectionSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { reflectionId, story } = data;

    try {
      // Get additional context about the reflection for better analysis
      const reflection = await prisma.reflection.findUnique({
        where: { id: reflectionId },
        include: {
          Workspace: {
            select: {
              name: true,
              id: true
            }
          }
        }
      });

      if (!reflection) {
        throw new PatternRevealApiError({
          code: "not_found",
          message: "Reflection not found."
        });
      }

      const { object, usage } = await generateObject({
        model: openai("gpt-4-turbo"),
        system: `You are an expert relationship psychologist specializing in pattern analysis and emotional intelligence. Your role is to provide comprehensive, nuanced analysis of interpersonal reflections to help users understand their relationship dynamics and personal growth opportunities.

ANALYSIS FRAMEWORK:
You will analyze reflections through multiple lenses:
1. Emotional patterns and triggers
2. Communication dynamics and effectiveness
3. Behavioral patterns and cycles
4. Relationship power dynamics and balance
5. Context factors affecting interactions
6. Progress tracking and growth opportunities
7. Actionable insights for improvement
8. Safety and abuse detection (critical priority)

APPROACH:
- Be empathetic yet objective
- Look for patterns, not just surface-level events
- Consider both conscious and unconscious dynamics
- Identify strengths alongside areas for growth
- Provide specific, actionable recommendations
- Always prioritize safety and well-being
- Be culturally sensitive and non-judgmental

CONTEXT CONSIDERATIONS:
- Relationship type affects dynamics (romantic, family, friendship, professional)
- Individual personalities and communication styles vary
- External stressors impact relationship interactions
- Growth is a process, not a destination
- Small positive changes compound over time

SAFETY PRIORITY:
Always assess for signs of abuse, manipulation, or immediate risk. If detected, provide appropriate resources and recommendations while maintaining sensitivity.`,
        prompt: `Please analyze this reflection with comprehensive relationship pattern analysis:

REFLECTION CONTEXT:
- Workspace: "${reflection.Workspace?.name || "Unknown"}"
- Title: "${reflection.title}"
- Created: ${reflection.createdAt.toISOString()}

REFLECTION CONTENT:
${story}

ANALYSIS INSTRUCTIONS:
1. Read the reflection carefully and identify all relevant patterns
2. Consider the emotional journey described
3. Analyze communication dynamics and effectiveness
4. Look for behavioral patterns and triggers
5. Assess relationship health and dynamics
6. Identify contextual factors affecting the interaction
7. Evaluate progress and growth opportunities
8. Provide specific, actionable insights
9. Most importantly, assess for any safety concerns or abusive patterns

CRITICAL TEXT EVIDENCE REQUIREMENTS:
- For patterns you identify, provide specific quotes from the reflection as supporting evidence
- In textEvidence arrays, include exact quotes and explain what each reveals
- Use the person's exact words - don't paraphrase or modify their text
- Focus on the most revealing quotes that support your analysis
- If you detect concerning behaviors, provide multiple quotes as evidence

IMPORTANT: You MUST populate ALL fields in the response schema. If certain information isn't available from the reflection, make reasonable inferences or use empty arrays where appropriate. Every field is required for proper analysis.

FIELD GUIDANCE:
- strengthsIdentified: Even in difficult relationships, look for any positive qualities or moments
- conversationStarters: Suggest topics that could help improve communication
- positiveHighlights: Find any silver linings or growth opportunities, even in challenging situations
- textEvidence: Always include relevant quotes with analysis of what they reveal
- If arrays should be empty based on the content, that's acceptable - but ensure all fields are present

Please provide a thorough analysis covering all aspects of the schema, being specific and helpful while maintaining appropriate professional boundaries.`,
        schema: analysisSchema,
        temperature: 0.3 // Lower temperature for more consistent analysis
      });

      console.log({ object });

      if (!object) {
        throw new PatternRevealApiError({
          code: "internal_server_error",
          message: "Failed to generate analysis."
        });
      }

      // Save the comprehensive analysis to the database
      const response = await prisma.reflection.update({
        where: {
          id: reflectionId
        },
        data: {
          analysisReport: {
            upsert: {
              create: {
                report: object
              },
              update: {
                report: object
              }
            }
          }
        }
      });

      console.log({
        reflectionId,
        analysisGenerated: true,
        healthScore: object.overallAssessment.healthScore,
        confidenceLevel: object.overallAssessment.confidenceLevel,
        isAbusive: object.abuseDetection.isAbusive,
        isAtRisk: object.abuseDetection.isAtImmediateRisk,
        usage
      });

      if (!session?.user?.id) {
        throw new PatternRevealApiError({
          code: "unauthorized",
          message: "User ID is required"
        });
      }

      // Record analytics (commented out but structure ready)
      // waitUntil(
      //   record_reflection_report({
      //     id: reflectionId,
      //     userId: session.user.id,
      //     report: object as Analysis,
      //     healthScore: object.overallAssessment.healthScore,
      //     riskLevel: object.abuseDetection.isAtImmediateRisk ? 'high' : 'low'
      //   })
      // );

      return NextResponse.json(object, {
        headers
      });
    } catch (error) {
      console.error("Analysis generation error:", error);
      throw new PatternRevealApiError({
        code: "internal_server_error",
        message: "Failed to generate comprehensive analysis."
      });
    }
  },
  {
    requiredPermissions: ["mood.write"]
  }
);

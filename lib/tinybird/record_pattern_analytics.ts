import { tb } from "./client";
import type { Analysis } from "@/lib/zod/schemas/analysis";
import { z } from "zod";

// Schema for pattern analytics data
export const patternAnalyticsSchema = z.object({
  // Core identifiers
  user_id: z.string(),
  workspace_id: z.string(),
  reflection_id: z.string(),

  // Emotional patterns (only fields that exist in Analysis schema)
  dominant_emotion: z.string(),
  emotional_triggers: z.array(z.string()),
  self_regulation: z.string(),

  // Communication patterns (only fields that exist in Analysis schema)
  communication_style: z.string(),
  conflict_resolution_style: z.string(),
  listening_effectiveness: z.string(),
  boundaries_maintained: z.boolean(),
  resolution_achieved: z.boolean(),

  // Relationship dynamics (only fields that exist in Analysis schema)
  intimacy_level: z.string(),
  trust_level: z.string(),
  effort_balance: z.string(),
  relationship_health: z.string(),
  relationship_satisfaction: z.union([z.number(), z.string()]),
  relationship_stability: z.string(),

  // Behavioral patterns
  behavioral_patterns_count: z.union([z.number(), z.string()]),
  behavioral_patterns_severity: z.string(),

  // Attachment patterns
  your_attachment_style: z.string(),
  their_attachment_style: z.string(),
  attachment_triggered: z.union([z.boolean(), z.string()]),

  // Trauma responses
  your_primary_trauma_response: z.string(),
  their_primary_trauma_response: z.string(),
  trauma_triggers_count: z.union([z.number(), z.string()]),

  // Cognitive patterns
  thinking_traps_count: z.string(),
  emotional_reasoning: z.string(),

  // Abuse detection
  is_abusive: z.string(),
  is_at_immediate_risk: z.string(),
  abusive_behaviors_count: z.string(),

  // Analysis metadata
  health_score: z.string(),
  confidence_level: z.string(),
  analysis_duration_ms: z.number(),
  ai_model_used: z.string(),

  // User metadata
  user_plan: z.string(),
  user_experience_level: z.string(), // new, experienced, etc.

  // Timestamps
  reflection_created_at: z.string(),
  analysis_created_at: z.string(),
  timestamp: z.string(),

  // Soft deletion fields (optional for backward compatibility)
  deleted: z.boolean().optional(),
  deleted_at: z.string().optional(),
});

export type PatternAnalyticsData = z.infer<typeof patternAnalyticsSchema>;

// Tinybird ingest endpoint for pattern analytics
export const recordPatternAnalyticsTB = tb.buildIngestEndpoint({
  datasource: "patterns",
  event: patternAnalyticsSchema,
  wait: true,
});

// Function to extract and record pattern analytics
export const record_pattern_analytics = async (payload: {
  userId: string;
  workspaceId: string;
  reflectionId: string;
  analysis: Analysis;
  analysisDurationMs: number;
  aiModelUsed: string;
  userPlan: string;
  reflectionCreatedAt: string;
}) => {
  const {
    userId,
    workspaceId,
    reflectionId,
    analysis,
    analysisDurationMs,
    aiModelUsed,
    userPlan,
    reflectionCreatedAt,
  } = payload;

  try {
    console.log(
      "Starting pattern analytics recording for reflection:",
      reflectionId
    );

    const token = process.env.TINYBIRD_API_KEY;
    const baseUrl = process.env.TINYBIRD_API_URL;

    if (!token || !baseUrl) {
      throw new Error("TINYBIRD_API_KEY or TINYBIRD_API_URL is not set");
    }

    console.log("Tinybird configuration:", {
      hasApiKey: !!token,
      apiKeyLength: token?.length,
      apiUrl: baseUrl,
      datasource: "patterns",
    });

    const patternData: PatternAnalyticsData = {
      // Core identifiers
      user_id: userId,
      workspace_id: workspaceId,
      reflection_id: reflectionId,

      // Emotional patterns
      dominant_emotion:
        analysis?.emotionalPatterns?.dominantEmotion || "unknown",
      emotional_triggers: analysis?.emotionalPatterns?.emotionalTriggers || [],
      self_regulation:
        analysis?.emotionalPatterns?.emotionalRegulation || "unknown",

      // Communication patterns
      communication_style:
        analysis?.communicationPatterns?.overallCommunicationStyle || "unknown",
      conflict_resolution_style:
        analysis?.communicationPatterns?.conflictResolutionStyle || "unknown",
      listening_effectiveness:
        analysis?.communicationPatterns?.listeningEffectiveness || "unknown",
      boundaries_maintained:
        analysis?.communicationPatterns?.boundariesMaintained || false,
      resolution_achieved:
        analysis?.communicationPatterns?.resolutionAchieved || false,

      // Relationship dynamics
      intimacy_level:
        analysis?.relationshipDynamics?.intimacyLevel || "unknown",
      trust_level: analysis?.relationshipDynamics?.trustLevel || "unknown",
      effort_balance:
        analysis?.relationshipDynamics?.effortBalance || "unknown",
      relationship_health:
        analysis?.relationshipDynamics?.relationshipHealth || "unknown",
      relationship_satisfaction:
        analysis?.relationshipDynamics?.relationshipSatisfaction || 0,
      relationship_stability:
        analysis?.relationshipDynamics?.relationshipStability || "unknown",

      // Behavioral patterns
      behavioral_patterns_count:
        analysis?.behaviorPatterns?.detectedPatterns?.length || 0,
      behavioral_patterns_severity:
        analysis?.behaviorPatterns?.detectedPatterns?.find((p) => p.severity)
          ?.severity || "unknown",

      // Attachment patterns
      your_attachment_style:
        analysis?.attachmentPatterns?.yourAttachmentStyle || "unknown",
      their_attachment_style:
        analysis?.attachmentPatterns?.theirAttachmentStyle || "unknown",
      attachment_triggered:
        analysis?.attachmentPatterns?.attachmentTriggered || false,

      // Trauma responses
      your_primary_trauma_response:
        analysis?.traumaResponses?.yourPrimaryResponse || "unknown",
      their_primary_trauma_response:
        analysis?.traumaResponses?.theirPrimaryResponse || "unknown",
      trauma_triggers_count:
        analysis?.traumaResponses?.traumaTriggers?.length || 0,

      // Cognitive patterns
      thinking_traps_count:
        analysis?.cognitivePatterns?.thinkingTraps?.length?.toString() ||
        "unknown",
      emotional_reasoning:
        analysis?.cognitivePatterns?.emotionalReasoning?.toString() ||
        "unknown",

      // Abuse detection
      is_abusive: analysis?.abuseDetection?.isAbusive?.toString() || "unknown",
      is_at_immediate_risk:
        analysis?.abuseDetection?.isAtImmediateRisk?.toString() || "unknown",
      abusive_behaviors_count:
        analysis?.abuseDetection?.detectedAbusiveBehaviors?.length?.toString() ||
        "unknown",

      // Analysis metadata
      health_score:
        analysis?.overallAssessment?.healthScore?.toString() || "unknown",
      confidence_level:
        analysis?.overallAssessment?.confidenceLevel || "unknown",
      analysis_duration_ms: analysisDurationMs,
      ai_model_used: aiModelUsed,

      // User metadata
      user_plan: userPlan,
      user_experience_level: "experienced", // This could be calculated based on user history

      // Timestamps
      reflection_created_at: reflectionCreatedAt,
      analysis_created_at: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    };

    console.log("Pattern data prepared:", {
      user_id: patternData.user_id,
      workspace_id: patternData.workspace_id,
      reflection_id: patternData.reflection_id,
      health_score: patternData.health_score,
      dominant_emotion: patternData.dominant_emotion,
    });

    console.log("Pattern data:", patternData);
    // Validate the data against the schema
    const validationResult = patternAnalyticsSchema.safeParse(patternData);
    if (!validationResult.success) {
      console.error("Schema validation failed:", validationResult.error);
      return null;
    }

    console.log("Schema validation passed, sending to Tinybird...");

    try {
      const result = await recordPatternAnalyticsTB(patternData);

      console.log("Pattern analytics recorded successfully:", {
        reflectionId,
        result: result ? "success" : "no result",
      });

      return result;
    } catch (tbError) {
      console.error("Tinybird API error:", {
        error: tbError instanceof Error ? tbError.message : String(tbError),
        stack: tbError instanceof Error ? tbError.stack : undefined,
        reflectionId,
      });

      // Try to get more details about the error
      if (
        tbError instanceof Error &&
        tbError.message.includes("Unexpected token")
      ) {
        console.error(
          "This looks like a JSON parsing error - Tinybird might be returning an HTML error page instead of JSON"
        );
        console.error(
          "Check your Tinybird API key, URL, and datasource configuration"
        );
      }

      return null;
    }
  } catch (error) {
    console.error("Failed to record pattern analytics:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      reflectionId,
      userId,
      workspaceId,
    });
    // Don't throw - analytics failures shouldn't break the main flow
    return null;
  }
};

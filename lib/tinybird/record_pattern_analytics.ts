import { tb } from "./client";
import type { Analysis } from "@/lib/zod/schemas/analysis";
import { z } from "zod";

// Schema for pattern analytics data
export const patternAnalyticsSchema = z.object({
  // Core identifiers
  user_id: z.string(),
  workspace_id: z.string(),
  reflection_id: z.string(),

  // Emotional patterns
  dominant_emotion: z.string(),
  emotional_intensity: z.number(),
  emotional_triggers: z.array(z.string()),
  emotional_recovery_time: z.string(),
  emotional_contagion: z.boolean(),
  self_regulation: z.string(),

  // Communication patterns
  communication_style: z.string(),
  conflict_resolution_style: z.string(),
  listening_effectiveness: z.string(),
  boundaries_maintained: z.boolean(),
  resolution_achieved: z.boolean(),

  // Relationship dynamics
  power_dynamics_initiator: z.string(),
  power_dynamics_controller: z.string(),
  decision_making_style: z.string(),
  intimacy_level: z.string(),
  trust_level: z.string(),
  effort_balance: z.string(),

  // Context factors
  interaction_type: z.string(),
  duration: z.string(),
  environment: z.string(),
  energy_level_yours: z.string(),
  energy_level_theirs: z.string(),
  time_of_day: z.string(),
  day_of_week: z.string(),

  // Analysis metadata
  health_score: z.number(),
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

    // Check if we're in development mode
    const isDevelopment =
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === undefined;

    // Validate required environment variables (only for production)
    if (!isDevelopment) {
      if (!process.env.TINYBIRD_API_KEY) {
        console.error("TINYBIRD_API_KEY is not set");
        return null;
      }

      if (!process.env.TINYBIRD_API_URL) {
        console.error("TINYBIRD_API_URL is not set");
        return null;
      }
    }

    console.log("Tinybird configuration:", {
      isDevelopment,
      hasApiKey: isDevelopment ? true : !!process.env.TINYBIRD_API_KEY,
      apiKeyLength: isDevelopment
        ? "local"
        : process.env.TINYBIRD_API_KEY?.length,
      apiUrl: isDevelopment
        ? "http://localhost:7181"
        : process.env.TINYBIRD_API_URL,
      datasource: "patterns",
    });

    const patternData: PatternAnalyticsData = {
      // Core identifiers
      user_id: userId,
      workspace_id: workspaceId,
      reflection_id: reflectionId,

      // Emotional patterns
      dominant_emotion: analysis.emotionalPatterns.dominantEmotion,
      emotional_intensity: analysis.emotionalPatterns.emotionalIntensity,
      emotional_triggers: analysis.emotionalPatterns.emotionalTriggers,
      emotional_recovery_time: analysis.emotionalPatterns.emotionalRecoveryTime,
      emotional_contagion: analysis.emotionalPatterns.emotionalContagion,
      self_regulation: analysis.emotionalPatterns.selfRegulation,

      // Communication patterns
      communication_style: analysis.communicationPatterns.communicationStyle,
      conflict_resolution_style:
        analysis.communicationPatterns.conflictResolutionStyle,
      listening_effectiveness:
        analysis.communicationPatterns.listeningEffectiveness,
      boundaries_maintained:
        analysis.communicationPatterns.boundariesMaintained,
      resolution_achieved: analysis.communicationPatterns.resolutionAchieved,

      // Relationship dynamics
      power_dynamics_initiator:
        analysis.relationshipDynamics.powerDynamics.whoInitiated,
      power_dynamics_controller:
        analysis.relationshipDynamics.powerDynamics.whoControlled,
      decision_making_style:
        analysis.relationshipDynamics.powerDynamics.decisionMaking,
      intimacy_level: analysis.relationshipDynamics.intimacyLevel,
      trust_level: analysis.relationshipDynamics.trustLevel,
      effort_balance: analysis.relationshipDynamics.effortBalance,

      // Context factors
      interaction_type: analysis.contextFactors.interactionType,
      duration: analysis.contextFactors.duration,
      environment: analysis.contextFactors.environment,
      energy_level_yours: analysis.contextFactors.energyLevels.yours,
      energy_level_theirs: analysis.contextFactors.energyLevels.theirs,
      time_of_day: analysis.contextFactors.timeContext.timeOfDay,
      day_of_week: analysis.contextFactors.timeContext.dayOfWeek,

      // Analysis metadata
      health_score: analysis.overallAssessment.healthScore,
      confidence_level: analysis.overallAssessment.confidenceLevel,
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

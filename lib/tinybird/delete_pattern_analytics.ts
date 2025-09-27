import { tb } from "./client";
import { patternAnalyticsSchema } from "./record_pattern_analytics";
import { z } from "zod";

// Schema for marking records as deleted in TinyBird
export const deletePatternAnalyticsSchema = patternAnalyticsSchema.extend({
  deleted: z.boolean().default(true),
  deleted_at: z.date(),
});

export type DeletePatternAnalyticsData = z.infer<
  typeof deletePatternAnalyticsSchema
>;

export const recordDeletePatternAnalyticsTB = tb.buildIngestEndpoint({
  datasource: "patterns",
  event: deletePatternAnalyticsSchema,
  wait: true,
});

/**
 * Soft delete pattern analytics record in TinyBird by marking it as deleted
 * Since TinyBird doesn't support direct deletion of records, we use soft deletion
 * by appending a record with deleted: true
 */
export const deletePatternAnalytics = async (reflectionId: string) => {
  try {
    console.log(
      "Starting pattern analytics soft deletion for reflection:",
      reflectionId
    );

    const token = process.env.TINYBIRD_API_KEY;
    const baseUrl = process.env.TINYBIRD_API_URL;

    if (!token || !baseUrl) {
      throw new Error("TINYBIRD_API_KEY or TINYBIRD_API_URL is not set");
    }

    // Create a deletion record with minimal required fields
    const deleteData: DeletePatternAnalyticsData = {
      // Core identifiers - only reflection_id is needed for deletion
      user_id: "deleted",
      workspace_id: "deleted",
      reflection_id: reflectionId,

      // Mark as deleted
      deleted: true,
      deleted_at: new Date(),

      // Minimal placeholder values for required fields
      dominant_emotion: "deleted",
      emotional_triggers: [],
      self_regulation: "deleted",
      communication_style: "deleted",
      conflict_resolution_style: "deleted",
      listening_effectiveness: "deleted",
      boundaries_maintained: false,
      resolution_achieved: false,
      intimacy_level: "deleted",
      trust_level: "deleted",
      effort_balance: "deleted",
      relationship_health: "deleted",
      relationship_satisfaction: "0",
      relationship_stability: "deleted",
      behavioral_patterns_count: "0",
      behavioral_patterns_severity: "deleted",
      your_attachment_style: "deleted",
      their_attachment_style: "deleted",
      attachment_triggered: "false",
      your_primary_trauma_response: "deleted",
      their_primary_trauma_response: "deleted",
      trauma_triggers_count: "0",
      thinking_traps_count: "0",
      emotional_reasoning: "false",
      is_abusive: "false",
      is_at_immediate_risk: "false",
      abusive_behaviors_count: "0",
      health_score: "0",
      confidence_level: "deleted",
      analysis_duration_ms: 0,
      ai_model_used: "deleted",
      user_plan: "deleted",
      user_experience_level: "deleted",
      reflection_created_at: new Date().toISOString(),
      analysis_created_at: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    };

    console.log("Sending deletion record to TinyBird...");

    const result = await recordDeletePatternAnalyticsTB(deleteData);

    console.log("Pattern analytics marked as deleted successfully:", {
      reflectionId,
      result: result ? "success" : "no result",
    });

    return result;
  } catch (error) {
    console.error("Failed to mark pattern analytics as deleted:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      reflectionId,
    });
    // Don't throw - analytics failures shouldn't break the main flow
    return null;
  }
};

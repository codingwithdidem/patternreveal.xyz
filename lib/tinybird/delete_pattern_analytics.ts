import { tb } from "./client";
import { patternAnalyticsSchema } from "./record_pattern_analytics";
import { z } from "zod";

// Schema for marking records as deleted in TinyBird
export const deletePatternAnalyticsSchema = patternAnalyticsSchema.extend({
  deleted: z.boolean().default(true),
  deleted_at: z.string(),
});

export type DeletePatternAnalyticsData = z.infer<
  typeof deletePatternAnalyticsSchema
>;

export const recordDeletePatternAnalyticsTB = tb.buildIngestEndpoint({
  datasource: "patterns_v2",
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
      deleted_at: new Date().toISOString(),

      // Timestamps
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

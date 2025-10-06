import { tb } from "./client";
import type { Analysis } from "@/lib/zod/schemas/analysis";
import { z } from "zod";

// Schema for pattern analytics data
// NOTE: Nested arrays are stored as JSON strings until Tinybird supports the JSON type
// When JSON type is available, update schema types and uncomment the array object mappings below
export const patternAnalyticsSchema = z.object({
  // Core identifiers
  user_id: z.string(),
  workspace_id: z.string(),
  reflection_id: z.string(),

  // Emotional patterns
  dominant_emotion: z.string().optional(),
  emotional_triggers: z.array(z.string()).optional(),
  self_regulation: z.string().optional(),
  emotional_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  emotional_patterns: z
    .array(
      z
        .object({
          pattern: z.string().optional(),
          quote: z.string().optional(),
          trigger: z.string().optional(),
          unsustainableBehavior: z.string().optional(),
          suggestedBehavior: z.string().optional(),
          impact: z.string().optional(),
          severity: z.string().optional(),
          who_exhibited: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */

  // Communication patterns
  communication_style: z.string().optional(),
  conflict_resolution_style: z.string().optional(),
  listening_effectiveness: z.string().optional(),
  boundaries_maintained: z.boolean().optional(),
  resolution_achieved: z.boolean().optional(),
  communication_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  communication_patterns: z
    .array(
      z
        .object({
          pattern: z.string().optional(),
          quote: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */
  unmet_needs: z.array(z.string()).optional(),
  escalation_triggers: z.array(z.string()).optional(),

  // Relationship dynamics
  intimacy_level: z.string().optional(),
  trust_level: z.string().optional(),
  effort_balance: z.string().optional(),
  conflict_frequency: z.string().optional(),
  conflict_resolution: z.string().optional(),
  relationship_growth: z.string().optional(),
  personal_growth_support: z.string().optional(),
  relationship_insights: z.array(z.string()).optional(),
  improvement_areas: z.array(z.string()).optional(),
  strengths_identified: z.array(z.string()).optional(),
  relationship_health: z.string().optional(),
  relationship_satisfaction: z.number().optional(),
  relationship_stability: z.string().optional(),
  relationship_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  relationship_patterns: z
    .array(
      z
        .object({
          pattern: z.string().optional(),
          quote: z.string().optional(),
          trigger: z.string().optional(),
          unsustainableBehavior: z.string().optional(),
          suggestedBehavior: z.string().optional(),
          impact: z.string().optional(),
          severity: z.string().optional(),
          who_exhibited: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */

  // Behavioral patterns
  behavioral_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  behavioral_patterns: z
    .array(
      z
        .object({
          pattern: z.string().optional(),
          quote: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */
  behavioral_cycles: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  behavioral_cycles: z
    .array(
      z
        .object({
          trigger: z.string().optional(),
          response: z.string().optional(),
          outcome: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */
  growth_opportunities: z.array(z.string()).optional(),

  // Attachment patterns
  your_attachment_style: z.string().optional(),
  their_attachment_style: z.string().optional(),
  attachment_triggered: z.boolean().optional(),
  attachment_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  attachment_patterns: z
    .array(
      z
        .object({
          pattern: z.string().optional(),
          quote: z.string().optional(),
          impact: z.string().optional(),
          severity: z.string().optional(),
          who_exhibited: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */

  // Trauma responses
  your_primary_trauma_response: z.string().optional(),
  their_primary_trauma_response: z.string().optional(),
  trauma_triggers: z.array(z.string()).optional(),
  trauma_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  trauma_patterns: z
    .array(
      z
        .object({
          pattern: z.string().optional(),
          quote: z.string().optional(),
          trigger: z.string().optional(),
          copingStrategy: z.string().optional(),
          suggestedHealing: z.string().optional(),
          impact: z.string().optional(),
          severity: z.string().optional(),
          who_exhibited: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */
  unhealthy_coping_used: z.array(z.string()).optional(),
  healthy_coping_used: z.array(z.string()).optional(),
  healing_recommendations: z.array(z.string()).optional(),

  // Cognitive patterns
  thinking_traps: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  thinking_traps: z
    .array(
      z
        .object({
          trap: z.string().optional(),
          quote: z.string().optional(),
          explanation: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */
  emotional_reasoning: z.boolean().optional(),
  perspective_taking: z.string().optional(),
  assumptions_made: z.array(z.string()).optional(),

  // Abuse detection
  is_abusive: z.boolean().optional(),
  is_at_immediate_risk: z.boolean().optional(),
  warning_signs: z.array(z.string()).optional(),
  suggested_actions_to_take: z.array(z.string()).optional(),
  abuse_triggers: z.array(z.string()).optional(),
  abusive_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  abusive_patterns: z
    .array(
      z
        .object({
          type: z.string().optional(),
          behavior: z.string().optional(),
          quote: z.string().optional(),
          impact: z.string().optional(),
          reasonings: z.array(z.string()).optional(),
        })
        .optional()
    )
    .optional(),
  */

  // Analysis metadata
  health_score: z.number().optional(),
  confidence_level: z.string().optional(),
  summary: z.string().optional(),
  key_insights: z.array(z.string()).optional(),
  warning_flags: z.array(z.string()).optional(),
  positive_highlights: z.array(z.string()).optional(),
  analysis_duration_ms: z.number().optional(),
  ai_model_used: z.string().optional(),

  // User metadata
  user_plan: z.string().optional(),

  // Connection patterns
  connection_patterns: z.string().optional(), // TODO: Change to z.array(z.object({...})) when JSON type is supported
  /* When JSON type is supported, use this instead:
  connection_patterns: z
    .array(
      z
        .object({
          pattern: z.string().optional(),
          quote: z.string().optional(),
          impact: z.string().optional(),
          severity: z.string().optional(),
          who_exhibited: z.string().optional(),
          effectiveness: z.string().optional(),
          improvement: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  */
  love_languages_expressed: z.array(z.string()).optional(),
  connection_attempts: z.array(z.string()).optional(),
  connection_barriers: z.array(z.string()).optional(),
  connection_insights: z.array(z.string()).optional(),
  connection_recommendations: z.array(z.string()).optional(),

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
  datasource: "patterns_v2",
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
    const token = process.env.TINYBIRD_API_KEY;
    const baseUrl = process.env.TINYBIRD_API_URL;

    if (!token || !baseUrl) {
      throw new Error("TINYBIRD_API_KEY or TINYBIRD_API_URL is not set");
    }

    const patternData: PatternAnalyticsData = {
      // Core identifiers
      user_id: userId,
      workspace_id: workspaceId,
      reflection_id: reflectionId,

      // Emotional patterns
      dominant_emotion: analysis?.emotionalPatterns?.dominantEmotion,
      emotional_triggers: analysis?.emotionalPatterns?.emotionalTriggers,
      self_regulation: analysis?.emotionalPatterns?.emotionalRegulation,
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      emotional_patterns: analysis?.emotionalPatterns?.detectedPatterns
        ? JSON.stringify(
            analysis.emotionalPatterns.detectedPatterns.map((p) => ({
              pattern: p.pattern,
              quote: p.quote,
              trigger: p.trigger,
              impact: p.impact,
              severity: p.severity,
              who_exhibited: p.who_exhibited,
              suggestedBehavior: p.suggestedBehavior,
              unsustainableBehavior: p.unsustainableBehavior,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      emotional_patterns: analysis?.emotionalPatterns?.detectedPatterns?.map(
        (p) => ({
          pattern: p.pattern,
          quote: p.quote,
          trigger: p.trigger,
          impact: p.impact,
          severity: p.severity,
          who_exhibited: p.who_exhibited,
          suggestedBehavior: p.suggestedBehavior,
          unsustainableBehavior: p.unsustainableBehavior,
        })
      ),
      */

      // Communication patterns
      communication_style:
        analysis?.communicationPatterns?.overallCommunicationStyle,
      conflict_resolution_style:
        analysis?.communicationPatterns?.conflictResolutionStyle,
      listening_effectiveness:
        analysis?.communicationPatterns?.listeningEffectiveness,
      boundaries_maintained:
        analysis?.communicationPatterns?.boundariesMaintained,
      resolution_achieved: analysis?.communicationPatterns?.resolutionAchieved,
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      communication_patterns: analysis?.communicationPatterns?.detectedPatterns
        ? JSON.stringify(
            analysis.communicationPatterns.detectedPatterns.map((p) => ({
              pattern: p.pattern,
              quote: p.quote,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      communication_patterns: analysis?.communicationPatterns?.detectedPatterns?.map((p) => ({
        pattern: p.pattern,
        quote: p.quote,
      })),
      */
      unmet_needs: analysis?.communicationPatterns?.unmetNeeds,
      escalation_triggers: analysis?.communicationPatterns?.escalationTriggers,

      // Relationship dynamics
      intimacy_level: analysis?.relationshipDynamics?.intimacyLevel,
      trust_level: analysis?.relationshipDynamics?.trustLevel,
      effort_balance: analysis?.relationshipDynamics?.effortBalance,
      relationship_health: analysis?.relationshipDynamics?.relationshipHealth,
      relationship_satisfaction:
        analysis?.relationshipDynamics?.relationshipSatisfaction,
      relationship_stability:
        analysis?.relationshipDynamics?.relationshipStability,
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      relationship_patterns: analysis?.relationshipDynamics?.detectedPatterns
        ? JSON.stringify(
            analysis.relationshipDynamics.detectedPatterns.map((p) => ({
              pattern: p.pattern,
              quote: p.quote,
              trigger: p.trigger,
              unsustainableBehavior: p.unsustainableBehavior,
              suggestedBehavior: p.suggestedBehavior,
              impact: p.impact,
              severity: p.severity,
              who_exhibited: p.who_exhibited,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      relationship_patterns: analysis?.relationshipDynamics?.detectedPatterns?.map((p) => ({
        pattern: p.pattern,
        quote: p.quote,
        trigger: p.trigger,
        unsustainableBehavior: p.unsustainableBehavior,
        suggestedBehavior: p.suggestedBehavior,
        impact: p.impact,
        severity: p.severity,
        who_exhibited: p.who_exhibited,
      })),
      */

      // Behavioral patterns
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      behavioral_patterns: analysis?.behaviorPatterns?.detectedPatterns
        ? JSON.stringify(
            analysis.behaviorPatterns.detectedPatterns.map((p) => ({
              pattern: p.pattern,
              quote: p.quote,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      behavioral_patterns: analysis?.behaviorPatterns?.detectedPatterns?.map((p) => ({
        pattern: p.pattern,
        quote: p.quote,
      })),
      */
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      behavioral_cycles: analysis?.behaviorPatterns?.behaviorCycles
        ? JSON.stringify(
            analysis.behaviorPatterns.behaviorCycles.map((p) => ({
              trigger: p.trigger,
              response: p.response,
              outcome: p.outcome,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      behavioral_cycles: analysis?.behaviorPatterns?.behaviorCycles?.map((p) => ({
        trigger: p.trigger,
        response: p.response,
        outcome: p.outcome,
      })),
      */
      growth_opportunities: analysis?.behaviorPatterns?.growthOpportunities,

      // Attachment patterns
      your_attachment_style: analysis?.attachmentPatterns?.yourAttachmentStyle,
      their_attachment_style:
        analysis?.attachmentPatterns?.theirAttachmentStyle,
      attachment_triggered: analysis?.attachmentPatterns?.attachmentTriggered,
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      attachment_patterns: analysis?.attachmentPatterns?.detectedPatterns
        ? JSON.stringify(
            analysis.attachmentPatterns.detectedPatterns.map((p) => ({
              pattern: p.pattern,
              quote: p.quote,
              impact: p.impact,
              severity: p.severity,
              who_exhibited: p.who_exhibited,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      attachment_patterns: analysis?.attachmentPatterns?.detectedPatterns?.map((p) => ({
        pattern: p.pattern,
        quote: p.quote,
        impact: p.impact,
        severity: p.severity,
        who_exhibited: p.who_exhibited,
      })),
      */

      // Trauma responses
      your_primary_trauma_response:
        analysis?.traumaResponses?.yourPrimaryResponse,
      their_primary_trauma_response:
        analysis?.traumaResponses?.theirPrimaryResponse,
      trauma_triggers: analysis?.traumaResponses?.traumaTriggers,
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      trauma_patterns: analysis?.traumaResponses?.detectedPatterns
        ? JSON.stringify(
            analysis.traumaResponses.detectedPatterns.map((p) => ({
              pattern: p.pattern,
              quote: p.quote,
              impact: p.impact,
              severity: p.severity,
              who_exhibited: p.who_exhibited,
              trigger: p.trigger,
              copingStrategy: p.copingStrategy,
              suggestedHealing: p.suggestedHealing,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      trauma_patterns: analysis?.traumaResponses?.detectedPatterns?.map((p) => ({
        pattern: p.pattern,
        quote: p.quote,
        impact: p.impact,
        severity: p.severity,
        who_exhibited: p.who_exhibited,
        trigger: p.trigger,
        copingStrategy: p.copingStrategy,
        suggestedHealing: p.suggestedHealing,
      })),
      */
      unhealthy_coping_used: analysis?.traumaResponses?.unhealthyCopingUsed,
      healthy_coping_used: analysis?.traumaResponses?.healthyCopingUsed,
      healing_recommendations:
        analysis?.traumaResponses?.healingRecommendations,

      // Cognitive patterns
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      thinking_traps: analysis?.cognitivePatterns?.thinkingTraps
        ? JSON.stringify(
            analysis.cognitivePatterns.thinkingTraps.map((t) => ({
              trap: t.trap,
              quote: t.quote,
              explanation: t.explanation,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      thinking_traps: analysis?.cognitivePatterns?.thinkingTraps?.map((t) => ({
        trap: t.trap,
        quote: t.quote,
        explanation: t.explanation,
      })),
      */
      emotional_reasoning: analysis?.cognitivePatterns?.emotionalReasoning,
      perspective_taking: analysis?.cognitivePatterns?.perspectiveTaking,
      assumptions_made: analysis?.cognitivePatterns?.assumptionsMade,

      // Abuse detection
      is_abusive: analysis?.abuseDetection?.isAbusive,
      is_at_immediate_risk: analysis?.abuseDetection?.isAtImmediateRisk,
      warning_signs: analysis?.abuseDetection?.warningSigns,
      suggested_actions_to_take:
        analysis?.abuseDetection?.suggestedActionsToTake,
      abuse_triggers: analysis?.abuseDetection?.abuseTriggers,
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      abusive_patterns: analysis?.abuseDetection?.detectedAbusiveBehaviors
        ? JSON.stringify(
            analysis.abuseDetection.detectedAbusiveBehaviors.map((b) => ({
              type: b.type,
              behavior: b.behavior,
              quote: b.quote,
              impact: b.impact,
              reasonings: b.reasonings,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      abusive_patterns: analysis?.abuseDetection?.detectedAbusiveBehaviors?.map((b) => ({
        type: b.type,
        behavior: b.behavior,
        quote: b.quote,
        impact: b.impact,
        reasonings: b.reasonings,
      })),
      */

      // Analysis metadata
      health_score: analysis?.overallAssessment?.healthScore,
      confidence_level: analysis?.overallAssessment?.confidenceLevel,
      summary: analysis?.overallAssessment?.summary,
      key_insights: analysis?.overallAssessment?.keyInsights,
      warning_flags: analysis?.overallAssessment?.warningFlags,
      positive_highlights: analysis?.overallAssessment?.positiveHighlights,
      analysis_duration_ms: analysisDurationMs,
      ai_model_used: aiModelUsed,

      // User metadata
      user_plan: userPlan,

      // Connection patterns
      // TODO: Switch back to array of objects when JSON type is supported in Tinybird
      connection_patterns: analysis?.connectionPatterns?.detectedPatterns
        ? JSON.stringify(
            analysis.connectionPatterns.detectedPatterns.map((p) => ({
              pattern: p.pattern,
              quote: p.quote,
              impact: p.impact,
              severity: p.severity,
              who_exhibited: p.who_exhibited,
              effectiveness: p.effectiveness,
              improvement: p.improvement,
            }))
          )
        : undefined,
      /* When JSON type is supported, use this instead:
      connection_patterns: analysis?.connectionPatterns?.detectedPatterns?.map((p) => ({
        pattern: p.pattern,
        quote: p.quote,
        impact: p.impact,
        severity: p.severity,
        who_exhibited: p.who_exhibited,
        effectiveness: p.effectiveness,
        improvement: p.improvement,
      })),
      */
      love_languages_expressed:
        analysis?.connectionPatterns?.loveLanguagesExpressed,
      connection_attempts: analysis?.connectionPatterns?.connectionAttempts,
      connection_barriers: analysis?.connectionPatterns?.connectionBarriers,
      connection_insights: analysis?.connectionPatterns?.connectionInsights,
      connection_recommendations:
        analysis?.connectionPatterns?.connectionRecommendations,

      // Timestamps
      reflection_created_at: reflectionCreatedAt,
      analysis_created_at: new Date().toISOString(),
      timestamp: new Date().toISOString(),

      // Soft deletion fields (optional for backward compatibility)
      deleted: false,
      deleted_at: undefined,
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

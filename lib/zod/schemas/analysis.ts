import { z } from "zod";

// Core emotional analysis
export const emotionalPatternSchema = z.object({
  dominantEmotion: z
    .enum([
      "joy",
      "sadness",
      "anger",
      "fear",
      "surprise",
      "disgust",
      "love",
      "anxiety",
      "frustration",
      "contentment",
      "guilt",
      "shame"
    ])
    .describe("The primary emotion experienced during this interaction"),
  emotionalIntensity: z
    .number()
    .min(1)
    .max(10)
    .describe("Emotional intensity scale 1-10"),
  emotionalTriggers: z
    .array(z.string())
    .describe("What triggered these emotions"),
  emotionalRecoveryTime: z
    .enum(["immediate", "hours", "days", "weeks"])
    .describe("How long negative emotions lasted"),
  moodBeforeInteraction: z.number().min(1).max(10).optional(),
  moodAfterInteraction: z.number().min(1).max(10).optional(),
  emotionalContagion: z
    .boolean()
    .describe("Did their mood affect yours or vice versa?"),
  selfRegulation: z
    .enum(["excellent", "good", "fair", "poor"])
    .describe("How well did you manage your emotions")
});

// Communication analysis
export const communicationPatternSchema = z.object({
  communicationStyle: z
    .enum([
      "assertive",
      "passive",
      "aggressive",
      "passive-aggressive",
      "avoidant",
      "dismissive"
    ])
    .describe("Primary communication approach used during this interaction"),
  conflictResolutionStyle: z
    .enum([
      "collaborative",
      "competitive",
      "accommodating",
      "avoiding",
      "compromising"
    ])
    .describe("How conflicts and disagreements were handled"),
  listeningEffectiveness: z
    .enum(["excellent", "good", "fair", "poor"])
    .describe("How well both parties listened and understood each other"),
  expressedNeeds: z.array(z.string()).describe("What needs were expressed"),
  unmetNeeds: z.array(z.string()).describe("What needs went unmet"),
  boundariesMaintained: z
    .boolean()
    .describe("Were healthy boundaries maintained?"),
  escalationTriggers: z
    .array(z.string())
    .describe("What escalated the situation"),
  resolutionAchieved: z.boolean().describe("Was the issue resolved?")
});

// Behavioral patterns
export const behaviorPatternSchema = z.object({
  recurringIssues: z.array(z.string()).describe("Issues that keep coming up"),
  behaviorCycles: z
    .array(
      z.object({
        trigger: z.string(),
        response: z.string(),
        outcome: z.string()
      })
    )
    .describe("Identified behavioral cycles"),
  yourBehaviorPatterns: z
    .array(z.string())
    .describe("Your behavior patterns in this interaction"),
  theirBehaviorPatterns: z
    .array(z.string())
    .describe("Their behavior patterns in this interaction"),
  positiveChanges: z.array(z.string()).describe("Positive changes noticed"),
  concerningPatterns: z
    .array(z.string())
    .describe("Concerning patterns to watch"),
  growthOpportunities: z.array(z.string()).describe("Areas for personal growth")
});

// Relationship dynamics
export const relationshipDynamicsSchema = z.object({
  powerDynamics: z.object({
    whoInitiated: z
      .enum(["you", "them", "mutual"])
      .describe("Who started this interaction or brought up the topic"),
    whoControlled: z
      .enum(["you", "them", "balanced"])
      .describe("Who had more control or influence during the interaction"),
    decisionMaking: z
      .enum(["collaborative", "dominated_by_you", "dominated_by_them"])
      .describe("How decisions were made during this interaction")
  }),
  supportPatterns: z.object({
    emotionalSupport: z
      .enum(["you_supported", "they_supported", "mutual", "none"])
      .describe("Who provided emotional comfort, empathy, or understanding"),
    practicalSupport: z
      .enum(["you_supported", "they_supported", "mutual", "none"])
      .describe("Who provided practical help, advice, or tangible assistance"),
    validationExchanged: z.boolean()
  }),
  intimacyLevel: z
    .enum(["very_close", "close", "moderate", "distant", "very_distant"])
    .describe("Level of emotional closeness and vulnerability shared"),
  trustLevel: z
    .enum(["high", "medium", "low", "broken"])
    .describe("Current level of trust between both parties"),
  effortBalance: z
    .enum(["balanced", "you_more", "them_more", "both_low"])
    .describe("Who is putting in more effort to maintain the relationship")
});

// Context factors
export const contextFactorsSchema = z.object({
  interactionType: z
    .enum([
      "casual_conversation",
      "serious_discussion",
      "conflict",
      "celebration",
      "support_session",
      "planning",
      "reminiscing",
      "problem_solving"
    ])
    .describe("The nature or type of this interaction"),
  duration: z
    .enum(["brief", "moderate", "extended", "marathon"])
    .describe("How long this interaction lasted"),
  environment: z
    .enum(["home", "work", "public", "online", "phone", "text"])
    .describe("Where or how this interaction took place"),
  externalStressors: z
    .array(z.string())
    .describe("External factors affecting the interaction"),
  energyLevels: z.object({
    yours: z
      .enum(["high", "medium", "low"])
      .describe("Your energy level during this interaction"),
    theirs: z
      .enum(["high", "medium", "low", "unknown"])
      .describe("Their apparent energy level during this interaction")
  }),
  timeContext: z.object({
    timeOfDay: z
      .enum(["morning", "afternoon", "evening", "night"])
      .describe("What time of day this interaction occurred"),
    dayOfWeek: z
      .enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ])
      .describe("What day of the week this interaction occurred"),
    specialCircumstances: z.array(z.string()).optional()
  })
});

// Progress tracking
export const progressTrackingSchema = z.object({
  relationshipTrend: z
    .enum(["improving", "stable", "declining", "uncertain"])
    .describe("Overall direction the relationship appears to be heading"),
  personalGrowthAreas: z.array(z.string()),
  relationshipGoals: z.array(z.string()),
  milestonesAchieved: z.array(z.string()),
  areasNeedingAttention: z.array(z.string()),
  strengthsIdentified: z.array(z.string()).optional().default([])
});

// Actionable insights
export const actionableInsightsSchema = z.object({
  immediateActions: z.array(z.string()).describe("Actions to take right away"),
  shortTermStrategies: z
    .array(z.string())
    .describe("Strategies for next few interactions"),
  longTermGoals: z.array(z.string()).describe("Long-term relationship goals"),
  conversationStarters: z
    .array(z.string())
    .describe("Suggested topics for future conversations"),
  boundaryAdjustments: z
    .array(z.string())
    .describe("Boundary adjustments to consider"),
  selfCareRecommendations: z
    .array(z.string())
    .describe("Self-care actions recommended")
});

// Keep existing abuse detection (important for safety)
export const abuseDetectionSchema = z.object({
  isAbusive: z
    .boolean()
    .describe("Whether the reflection indicates abusive behavior"),
  isAtImmediateRisk: z
    .boolean()
    .describe("Whether the user is at immediate risk"),
  abuseTriggers: z
    .array(z.string())
    .describe("The triggers of the abusive behavior"),
  detectedAbusiveBehaviors: z
    .array(
      z.object({
        type: z
          .enum([
            "physical",
            "emotional",
            "sexual",
            "financial",
            "mental",
            "digital",
            "social"
          ])
          .describe("Category of abusive behavior detected"),
        behavior: z.string(),
        reasonings: z.array(z.string())
      })
    )
    .describe("The detected abusive behaviors"),
  suggestedActionsToTake: z
    .array(z.string())
    .describe("The suggested actions to take"),
  suggestedResources: z
    .array(
      z.object({
        title: z.string(),
        link: z.string()
      })
    )
    .describe("The suggested resources")
});

// Attachment patterns analysis
export const attachmentPatternsSchema = z.object({
  yourAttachmentStyle: z
    .enum(["secure", "anxious", "avoidant", "disorganized"])
    .describe("Your attachment style evident in this interaction"),
  theirAttachmentStyle: z
    .enum(["secure", "anxious", "avoidant", "disorganized", "unknown"])
    .describe("Their apparent attachment style"),
  attachmentTriggered: z
    .boolean()
    .describe("Did attachment issues surface during this interaction?"),
  attachmentBehaviors: z
    .array(z.string())
    .describe("Specific attachment-related behaviors observed")
});

// Trauma responses analysis
export const traumaResponsesSchema = z.object({
  yourResponse: z
    .enum(["fight", "flight", "freeze", "fawn", "none"])
    .describe("Your trauma response pattern if triggered"),
  theirResponse: z
    .enum(["fight", "flight", "freeze", "fawn", "none", "unknown"])
    .describe("Their apparent trauma response pattern"),
  traumaTriggered: z
    .boolean()
    .describe("Were trauma responses activated during this interaction?"),
  copingStrategiesUsed: z
    .array(z.string())
    .describe("Healthy coping strategies that were employed")
});

// Love languages and connection patterns
export const connectionPatternsSchema = z.object({
  loveLanguagesExpressed: z
    .array(
      z.enum([
        "words_of_affirmation",
        "quality_time",
        "physical_touch",
        "acts_of_service",
        "gifts"
      ])
    )
    .describe("Love languages that were expressed or attempted"),
  connectionAttempts: z
    .array(z.string())
    .describe("Ways either person tried to connect"),
  connectionBarriers: z
    .array(z.string())
    .describe("What prevented or hindered connection"),
  intimacyTypes: z.object({
    emotional: z
      .enum(["high", "medium", "low", "blocked"])
      .describe("Level of emotional intimacy shared"),
    physical: z
      .enum(["high", "medium", "low", "blocked"])
      .describe("Level of physical intimacy or affection"),
    intellectual: z
      .enum(["high", "medium", "low", "blocked"])
      .describe("Level of intellectual connection and stimulation"),
    spiritual: z
      .enum(["high", "medium", "low", "blocked"])
      .describe("Level of spiritual or values-based connection")
  })
});

// Cognitive patterns analysis
export const cognitivePatternsSchema = z.object({
  thinkingTraps: z
    .array(
      z.enum([
        "catastrophizing",
        "black_and_white",
        "mind_reading",
        "personalization",
        "overgeneralization",
        "filtering"
      ])
    )
    .describe("Cognitive distortions or thinking traps identified"),
  assumptionsMade: z
    .array(z.string())
    .describe("Assumptions made by either party"),
  perspectiveTaking: z
    .enum(["excellent", "good", "limited", "poor"])
    .describe("Ability to see the other person's perspective"),
  emotionalReasoning: z
    .boolean()
    .describe(
      "Was decision-making overly influenced by emotions rather than facts?"
    )
});

// Enhanced comprehensive analysis schema
export const analysisSchema = z.object({
  // Core analysis components
  emotionalPatterns: emotionalPatternSchema,
  communicationPatterns: communicationPatternSchema,
  behaviorPatterns: behaviorPatternSchema,
  relationshipDynamics: relationshipDynamicsSchema,
  contextFactors: contextFactorsSchema,
  progressTracking: progressTrackingSchema,
  actionableInsights: actionableInsightsSchema,

  // Advanced psychological patterns
  attachmentPatterns: attachmentPatternsSchema,
  traumaResponses: traumaResponsesSchema,
  connectionPatterns: connectionPatternsSchema,
  cognitivePatterns: cognitivePatternsSchema,

  // Safety first - keep abuse detection
  abuseDetection: abuseDetectionSchema,

  // Meta analysis
  overallAssessment: z.object({
    healthScore: z
      .number()
      .min(1)
      .max(10)
      .describe("Overall relationship health score"),
    confidenceLevel: z
      .enum(["high", "medium", "low"])
      .describe("AI confidence in this analysis"),
    keyInsights: z
      .array(z.string())
      .describe("Top 3-5 key insights from this reflection"),
    warningFlags: z.array(z.string()).describe("Any warning flags to monitor"),
    positiveHighlights: z
      .array(z.string())
      .describe("Positive aspects to celebrate")
  })
});

export type Analysis = z.infer<typeof analysisSchema>;
export type EmotionalPattern = z.infer<typeof emotionalPatternSchema>;
export type CommunicationPattern = z.infer<typeof communicationPatternSchema>;
export type BehaviorPattern = z.infer<typeof behaviorPatternSchema>;
export type RelationshipDynamics = z.infer<typeof relationshipDynamicsSchema>;
export type ContextFactors = z.infer<typeof contextFactorsSchema>;
export type ProgressTracking = z.infer<typeof progressTrackingSchema>;
export type ActionableInsights = z.infer<typeof actionableInsightsSchema>;
export type AttachmentPatterns = z.infer<typeof attachmentPatternsSchema>;
export type TraumaResponses = z.infer<typeof traumaResponsesSchema>;
export type ConnectionPatterns = z.infer<typeof connectionPatternsSchema>;
export type CognitivePatterns = z.infer<typeof cognitivePatternsSchema>;
export type AbuseDetection = z.infer<typeof abuseDetectionSchema>;

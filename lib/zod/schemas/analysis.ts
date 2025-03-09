import { z } from "zod";

export const analysisSchema = z.object({
  isAbusive: z.boolean().describe("Whether the reflection is abusive or not."),
  isAtImmediateRisk: z
    .boolean()
    .describe("Whether the user is at immediate risk."),
  abuseTriggers: z
    .array(z.string())
    .describe("The triggers of the abusive behavior."),
  detectedAbusiveBehaviors: z
    .array(
      z.object({
        type: z.enum([
          "physical",
          "emotional",
          "sexual",
          "financial",
          "mental"
        ]),
        behavior: z.string(),
        reasonings: z.array(z.string())
      })
    )
    .describe("The detected abusive behaviors."),
  suggestedActionsToTake: z
    .array(z.string())
    .describe("The suggested actions to take."),
  suggestedResources: z
    .array(
      z.object({
        title: z.string(),
        link: z.string()
      })
    )
    .describe("The suggested resources.")
});

export type Analysis = z.infer<typeof analysisSchema>;

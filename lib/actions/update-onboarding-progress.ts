"use server";

import { z } from "zod";
import { authenticatedActionClient } from "./safe-action";
import { OnboardingSteps } from "../onboarding/useOnboardingFlow";
import { redis } from "../upstash/redis";

// Generate a new client secret for an integration
export const updateOnboardingProgress = authenticatedActionClient
  .schema(
    z.object({
      onboardingStep: z.nativeEnum(OnboardingSteps)
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    const { onboardingStep } = parsedInput;

    try {
      await redis.set(`onboarding-step:${ctx.user.id}`, onboardingStep);
    } catch (e) {
      console.error("Failed to update onboarding step", e);
      throw new Error("Failed to update onboarding step");
    }

    return { success: true };
  });

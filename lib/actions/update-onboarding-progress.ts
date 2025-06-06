"use server";

import { z } from "zod";
import { authenticatedActionClient } from "./safe-action";
import { redis } from "../upstash/redis";
import { ONBOARDING_STEPS } from "../onboarding/useOnboardingFlow";

// Generate a new client secret for an integration
export const updateOnboardingProgress = authenticatedActionClient
  .schema(
    z.object({
      onboardingStep: z.enum(ONBOARDING_STEPS).nullable()
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    const { onboardingStep } = parsedInput;

    console.log("onboardingStep", onboardingStep);

    try {
      await redis.set(`onboarding-step:${ctx.user.id}`, onboardingStep);
    } catch (e) {
      console.error("Failed to update onboarding step", e.stack);
      throw new Error("Failed to update onboarding step");
    }

    return { success: true };
  });

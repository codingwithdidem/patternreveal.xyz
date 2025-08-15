"use server";

import { z } from "zod";
import { authenticatedActionClient } from "./safe-action";
import { redis } from "../upstash/redis";

const ONBOARDING_STEPS = [
  "welcome",
  "workspace",
  "reflection",
  "invite",
  "plan",
  "complete",
] as const;

// Generate a new client secret for an integration
export const updateOnboardingProgress = authenticatedActionClient
  .schema(
    z.object({
      onboardingStep: z.enum(ONBOARDING_STEPS).nullable(),
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    const { onboardingStep } = parsedInput;

    try {
      await redis.set(`onboarding-step:${ctx.user.id}`, onboardingStep);
    } catch (e: unknown) {
      console.error(
        "Failed to update onboarding step",
        e instanceof Error ? e.stack : e
      );
      throw new Error("Failed to update onboarding step");
    }

    return { success: true };
  });

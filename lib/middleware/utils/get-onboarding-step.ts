import type { OnboardingStep } from "@/lib/onboarding/useOnboardingFlow";
import type { UserProps } from "@/lib/types";

export async function getOnboardingStep(user: UserProps) {
  try {
    // Dynamic import to avoid including redis in the main bundle
    const { redis } = await import("@/lib/upstash/redis");

    return (
      ((await redis.get(`onboarding:step:${user.id}`)) as OnboardingStep) ||
      undefined
    );
  } catch (error) {
    console.error("Failed to get onboarding step from Redis:", error);
    return undefined;
  }
}

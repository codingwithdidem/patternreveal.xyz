import type { OnboardingStep } from "@/lib/onboarding/useOnboardingFlow";
import type { UserProps } from "@/lib/types";

export async function getOnboardingStep(user: UserProps) {
  // Dynamic import to avoid including redis in the main bundle
  const { redis } = await import("@/lib/upstash/redis");

  return (
    ((await redis.get(`onboarding:step:${user.id}`)) as OnboardingStep) ||
    undefined
  );
}

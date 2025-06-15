import type { OnboardingStep } from "@/lib/onboarding/useOnboardingFlow";
import type { UserProps } from "@/lib/types";
import { redis } from "@/lib/upstash/redis";

export async function getOnboardingStep(user: UserProps) {
  return (
    ((await redis.get(`onboarding:step:${user.id}`)) as OnboardingStep) ||
    undefined
  );
}

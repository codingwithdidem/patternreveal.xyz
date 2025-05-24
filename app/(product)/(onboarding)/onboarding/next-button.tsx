"use client";

import { Button } from "@/components/ui/button";
import type { OnboardingSteps } from "@/lib/onboarding/useOnboardingFlow";
import { useOnboardingFlow } from "@/lib/onboarding/useOnboardingFlow";

export default function NextButton({
  step,
  text
}: {
  step: OnboardingSteps;
  text: string;
}) {
  const { moveToStep } = useOnboardingFlow();

  return <Button onClick={() => moveToStep(step)}>{text}</Button>;
}

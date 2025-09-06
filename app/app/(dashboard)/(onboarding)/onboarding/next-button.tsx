"use client";

import { Button } from "@/components/ui/button";
import {
  type OnboardingStep,
  useOnboardingFlow
} from "@/lib/onboarding/useOnboardingFlow";

export default function NextButton({
  step,
  text
}: {
  step: OnboardingStep;
  text: string;
}) {
  const { moveToStep } = useOnboardingFlow();

  return <Button onClick={() => moveToStep(step)}>{text}</Button>;
}

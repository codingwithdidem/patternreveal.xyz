"use client";

import { Button } from "@/components/ui/button";
import {
  type OnboardingStep,
  useOnboardingFlow
} from "@/lib/onboarding/useOnboardingFlow";

export default function LaterButton({
  next,
  text
}: {
  next: OnboardingStep;
  text?: string;
}) {
  const { moveToStep, finishOnboarding } = useOnboardingFlow();

  return (
    <Button
      variant="link"
      className="text-neutral-400 text-sm"
      onClick={() => {
        if (next === "complete") {
          finishOnboarding();
        } else {
          moveToStep(next);
        }
      }}
    >
      {text || "I'll do it later"}
    </Button>
  );
}

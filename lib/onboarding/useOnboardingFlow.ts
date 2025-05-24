"use client";

import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { updateOnboardingProgress } from "../actions/update-onboarding-progress";

export enum OnboardingSteps {
  WORKSPACE = "workspace",
  INVITE = "invite",
  COMPLETE = "complete"
}

export const useOnboardingFlow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slug: workspaceSlug } = { slug: null };
  const slug = workspaceSlug || searchParams.get("workspace");

  const { execute, executeAsync, isPending, hasSucceeded } = useAction(
    updateOnboardingProgress,
    {
      onSuccess: (data) => {
        console.log(
          "Successfully updated onboarding step to",
          data.input.onboardingStep
        );
      },
      onError: (error) => {
        console.error("Failed to update onboarding step", error);
      }
    }
  );

  const moveToStep = useCallback(
    async (step: OnboardingSteps, providedSlug?: string) => {
      execute({
        onboardingStep: step
      });

      const queryParams =
        step === OnboardingSteps.WORKSPACE
          ? ""
          : `?workspace=${providedSlug || slug}`;
      router.push(`/onboarding/${step}${queryParams}`);
    },
    [execute, router, slug]
  );

  const finishOnboarding = useCallback(async () => {
    await executeAsync({
      onboardingStep: OnboardingSteps.COMPLETE
    });
  }, [executeAsync]);

  return {
    moveToStep,
    finishOnboarding,
    isLoading: isPending,
    isSuccessful: hasSucceeded
  };
};

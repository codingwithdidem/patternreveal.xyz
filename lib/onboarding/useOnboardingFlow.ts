"use client";

import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { updateOnboardingProgress } from "../actions/update-onboarding-progress";
import useWorkspace from "../swr/use-workspace";

export const ONBOARDING_STEPS = [
  "welcome",
  "workspace",
  "reflection",
  "invite",
  "plan",
  "complete"
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export const useOnboardingFlow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slug: workspaceSlug } = useWorkspace();
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
    async (step: OnboardingStep, providedSlug?: string) => {
      execute({
        onboardingStep: step
      });

      console.log({
        step,
        providedSlug
      });

      const queryParams =
        step === "workspace" ? "" : `?workspace=${providedSlug || slug}`;
      router.push(`/onboarding/${step}${queryParams}`);
    },
    [execute, router, slug]
  );

  const finishOnboarding = useCallback(async () => {
    await executeAsync({
      onboardingStep: "complete"
    });

    router.push(slug ? `/${slug}` : "/");
  }, [executeAsync]);

  return {
    moveToStep,
    finishOnboarding,
    isLoading: isPending,
    isSuccessful: hasSucceeded
  };
};

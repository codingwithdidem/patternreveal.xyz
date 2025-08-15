"use client";

import { FREE_PLAN, getPlanDetails } from "@/lib/constants";
import useWorkspace from "@/lib/swr/use-workspace";

export type FeatureName =
  | "ask-ai"
  | "ai-analysis"
  | "reflections"
  | "users"
  | "retention";

export interface FeatureAccess {
  hasAccess: boolean;
  limit: number;
  plan: string;
  upgradeRequired: boolean;
}

/**
 * Hook to check if a feature is accessible for the current workspace plan
 * @param feature - The feature name to check access for
 * @returns FeatureAccess object with access status and limits
 */
export function useFeatureAccess(feature: FeatureName): FeatureAccess {
  const { plan } = useWorkspace();

  const currentPlan = getPlanDetails(plan || "free");
  const freePlan = FREE_PLAN;

  if (!currentPlan || !freePlan) {
    return {
      hasAccess: false,
      limit: 0,
      plan: plan || "free",
      upgradeRequired: true,
    };
  }

  const featureLimit = currentPlan.limits[feature];

  return {
    hasAccess: typeof featureLimit === "number" ? featureLimit > 0 : false,
    limit: typeof featureLimit === "number" ? featureLimit : 0,
    plan: plan || "free",
    upgradeRequired: !currentPlan || currentPlan.name === "Free",
  };
}

/**
 * Check if current plan has access to a specific feature
 * @param feature - The feature name to check
 * @returns boolean indicating if feature is accessible
 */
export function useHasFeatureAccess(feature: FeatureName): boolean {
  const { hasAccess } = useFeatureAccess(feature);
  return hasAccess;
}

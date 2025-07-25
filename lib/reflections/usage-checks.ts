import { exceededLimitError, PatternRevealApiError } from "../api/errors";
import type { WorkspaceWithUsers } from "../types";

// Workspace reflections usage overage checks
export const throwIfReflectionsUsageExceeded = (
  workspace: WorkspaceWithUsers
) => {
  if (
    workspace.reflectionsUsage >= workspace.reflectionsLimit &&
    (workspace.plan === "free" || workspace.plan === "pro")
  ) {
    throw new PatternRevealApiError({
      code: "forbidden",
      message: exceededLimitError({
        plan: workspace.plan,
        limit: workspace.reflectionsLimit,
        type: "reflections",
      }),
    });
  }
};

// AI usage overage checks
export const throwIfAIUsageExceeded = (
  workspace: WorkspaceWithUsers,
  feature: "ask-ai" | "ai-analysis"
) => {
  const limits = {
    "ask-ai": 0, // Free plan: 0 (pro-only)
    "ai-analysis": 1, // Free plan: 1
  };

  const currentLimit =
    workspace.plan === "pro"
      ? feature === "ask-ai"
        ? 50
        : 25
      : limits[feature];

  if (workspace.aiUsage >= currentLimit) {
    throw new PatternRevealApiError({
      code: "forbidden",
      message: exceededLimitError({
        plan: workspace.plan,
        limit: currentLimit,
        type: "AI",
      }),
    });
  }
};

// Pro-only feature checks
export const throwIfProFeatureNotAvailable = (
  workspace: WorkspaceWithUsers,
  feature: "ask-ai" | "mood-tracker" | "advanced-analytics" | "export-reports"
) => {
  if (workspace.plan !== "pro") {
    throw new PatternRevealApiError({
      code: "forbidden",
      message: `This feature requires a Pro plan. Please upgrade to access ${feature.replace(
        "-",
        " "
      )}.`,
    });
  }
};

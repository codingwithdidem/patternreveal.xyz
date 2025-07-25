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

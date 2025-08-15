import { exceededLimitError, PatternRevealApiError } from "../api/errors";
import type { WorkspaceWithUsers } from "../types";
import prisma from "../prisma";
import { log } from "@/utils/functions/slack-log";
import { sendLimitEmail } from "../cron/send-limit-email";

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
export const throwIfAIUsageExceeded = (workspace: WorkspaceWithUsers) => {
  if (workspace.aiUsage >= workspace.aiLimit) {
    throw new PatternRevealApiError({
      code: "exceeded_limit",
      message: exceededLimitError({
        plan: workspace.plan,
        limit: workspace.aiLimit,
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

// Update reflections usage and handle limit notifications
export async function updateReflectionsUsage({
  workspaceId,
  increment,
}: {
  workspaceId: string;
  increment: number;
}) {
  const workspace = await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      reflectionsUsage: {
        increment,
      },
      totalReflections: {
        increment,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      reflectionsUsage: true,
      reflectionsLimit: true,
      plan: true,
    },
  });

  const percentage = Math.round(
    (workspace.reflectionsUsage / workspace.reflectionsLimit) * 100
  );

  // Skip if the workspace is below 80% of the limit
  if (percentage < 80) {
    return workspace;
  }

  const sentEmails = await prisma.sentEmail.findMany({
    where: {
      workspaceId: workspaceId,
    },
    select: {
      type: true,
    },
  });

  const sentNotification = sentEmails.some(
    (email) =>
      email.type ===
      (percentage >= 80 && percentage < 100
        ? "firstReflectionsLimitEmail"
        : "secondReflectionsLimitEmail")
  );

  // // Skip if the email has already been sent
  if (sentNotification) {
    console.log(`${workspace.slug} has already been notified, skipping...`);
    return workspace;
  }

  const users = await prisma.user.findMany({
    where: {
      workspaces: {
        some: {
          workspaceId: workspaceId,
        },
      },
    },
    select: {
      email: true,
    },
  });

  const emails = users.map(({ email }) => email) as string[];

  return await Promise.allSettled([
    sendLimitEmail({
      emails,
      workspace: workspace as WorkspaceWithUsers,
      type:
        percentage >= 80 && percentage < 100
          ? "firstReflectionsLimitEmail"
          : "secondReflectionsLimitEmail",
    }),

    log({
      message: `*${
        workspace.slug
      }* has used ${percentage.toString()}% of its reflections limit for the month.`,
      type: workspace.plan === "free" ? "cron" : "alerts",
      mention: workspace.plan !== "free",
    }),
  ]);
}

import { PatternRevealApiError } from "@/lib/api/errors";
import { FREE_PLAN } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { log } from "@/utils/functions/slack-log";
import type { SubscriptionCanceledEvent } from "@paddle/paddle-node-sdk";

export async function handleSubscriptionCancelled(
  event: SubscriptionCanceledEvent
) {
  console.log("Subscription cancelled:", event);

  const paddleCustomerId = event.data.customerId;
  const workspaceId = (event.data.customData as { clientReferenceId?: string })
    ?.clientReferenceId;

  if (!workspaceId) {
    throw new PatternRevealApiError({
      message: "Workspace ID not found",
      code: "not_found",
    });
  }

  if (!paddleCustomerId) {
    throw new PatternRevealApiError({
      message: "Paddle customer ID not found",
      code: "not_found",
    });
  }

  const workspace = await prisma.workspace.findUnique({
    where: {
      paddleCustomerId,
      id: workspaceId,
    },
  });

  if (!workspace) {
    throw new PatternRevealApiError({
      message: "Workspace not found",
      code: "not_found",
    });
  }

  await Promise.allSettled([
    prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        plan: "free",
        usersLimit: FREE_PLAN?.limits.users,
        reflectionsLimit: FREE_PLAN?.limits.reflections,
        aiLimit:
          (FREE_PLAN?.limits["ask-ai"] ?? 0) +
          (FREE_PLAN?.limits["ai-analysis"] ?? 0),
        paymentFailedAt: null,
        cancellationEffectiveAt: event.data.scheduledChange?.effectiveAt
          ? new Date(event.data.scheduledChange?.effectiveAt)
          : null,
        subscriptionCancelledAt: event.data.canceledAt
          ? new Date(event.data.canceledAt)
          : null,
        subscriptionStatus: event.data.status ?? null,
      },
    }),

    log({
      message: `Workspace ${workspaceId} has cancelled their subscription`,
      type: "workspaces",
      mention: true,
    }),
  ]);
}

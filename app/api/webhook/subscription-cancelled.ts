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
        paddleCustomerId,
      },
      data: {
        plan: "free",
        usersLimit: FREE_PLAN?.limits.users,
        reflectionsLimit: FREE_PLAN?.limits.reflections,
        aiLimit:
          (FREE_PLAN?.limits["ask-ai"] ?? 0) +
          (FREE_PLAN?.limits["ai-analysis"] ?? 0),
        usageLimit: FREE_PLAN?.limits.reflections,
        paymentFailedAt: null,
      },
    }),

    log({
      message: `Workspace ${workspaceId} has been downgraded to free plan`,
      type: "workspaces",
      mention: true,
    }),
  ]);
}

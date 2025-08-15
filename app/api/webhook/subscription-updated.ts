import { PatternRevealApiError } from "@/lib/api/errors";
import prisma from "@/lib/prisma";
import { getPlanFromPriceId } from "@/utils/constants";
import { log } from "@/utils/functions/slack-log";
import type { SubscriptionUpdatedEvent } from "@paddle/paddle-node-sdk";

export async function handleSubscriptionUpdated(
  event: SubscriptionUpdatedEvent
) {
  console.log("Subscription updated:", event);

  const paddleCustomerId = event.data.customerId;
  const priceId = event.data.items[0].price?.id;
  const workspaceId = (event.data.customData as { clientReferenceId?: string })
    ?.clientReferenceId;

  if (!priceId) {
    throw new PatternRevealApiError({
      message: "Price ID not found",
      code: "not_found",
    });
  }

  const plan = getPlanFromPriceId(priceId);

  if (!plan) {
    throw new PatternRevealApiError({
      message: "Plan not found",
      code: "not_found",
    });
  }

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

  const newPlanName = plan.name.toLowerCase();

  if (workspace.plan === newPlanName) {
    return;
  }

  await Promise.allSettled([
    prisma.workspace.update({
      where: {
        paddleCustomerId,
      },
      data: {
        plan: newPlanName,
        reflectionsLimit: plan.limits.reflections,
        aiLimit: plan.limits["ask-ai"] + plan.limits["ai-analysis"],
        paymentFailedAt: null,
      },
    }),

    log({
      message: `Workspace ${workspaceId} has been upgraded to ${newPlanName} plan`,
      type: "workspaces",
      mention: true,
    }),
  ]);
}

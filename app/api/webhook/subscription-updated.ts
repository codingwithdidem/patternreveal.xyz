import { sendEmail } from "@/emails/send";
import SubscriptionCancelledEmail from "@/emails/subscription-cancelled";
import { PatternRevealApiError } from "@/lib/api/errors";
import prisma from "@/lib/prisma";
import { getPlanFromPriceId } from "@/utils/constants";
import { log } from "@/utils/functions/slack-log";
import type { SubscriptionUpdatedEvent } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";

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

  const workspace = await prisma.workspace.findFirst({
    where: {
      paddleCustomerId,
      id: workspaceId,
    },
    select: {
      plan: true,
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        where: {
          role: "OWNER",
        },
      },
    },
  });

  if (!workspace) {
    throw new PatternRevealApiError({
      message: "Workspace not found",
      code: "not_found",
    });
  }

  const newPlanName = plan.name.toLowerCase();

  if (workspace.plan !== newPlanName) {
    await Promise.allSettled([
      prisma.workspace.update({
        where: {
          id: workspaceId,
        },
        data: {
          plan: newPlanName,
          reflectionsLimit: plan.limits.reflections,
          aiLimit: plan.limits["ask-ai"] + plan.limits["ai-analysis"],
          usersLimit: plan.limits.users,
          paymentFailedAt: null,
          subscriptionStatus: event.data.status ?? null,
          cancellationEffectiveAt:
            event.data.scheduledChange?.action === "cancel"
              ? new Date(event.data.scheduledChange?.effectiveAt || new Date())
              : null,
          subscriptionCancelledAt:
            event.data.scheduledChange?.action === "cancel"
              ? new Date(event.data.canceledAt || new Date())
              : null,
        },
      }),
    ]);
  }

  const subscriptionCanceled =
    event.data.status === "active" &&
    event.data.scheduledChange?.action === "cancel";

  if (subscriptionCanceled) {
    // Update workspace cancellation related fields
    await prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        cancellationEffectiveAt: new Date(
          event.data.scheduledChange?.effectiveAt || new Date()
        ),
        subscriptionStatus: event.data.status ?? null,
      },
    });
    // Send a notification to the workspace users that their subscription has been cancelled
    const workspaceOwners = workspace.users.map(({ user }) => user);
    const cancelledAt = new Date(
      event.data.scheduledChange?.effectiveAt || new Date()
    );
    const daysUntilCancellation = Math.ceil(
      (cancelledAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    await Promise.all(
      workspaceOwners.map((user) => {
        return sendEmail({
          email: user.email as string,
          replyTo: "info@patternreveal.xyz",
          subject: `Your PatternReveal subscription will be cancelled in ${daysUntilCancellation} days`,
          react: SubscriptionCancelledEmail({
            name: user.name,
            email: user.email,
            plan: workspace.plan,
            cancellationEffectiveAt: cancelledAt.toISOString(),
          }),
        });
      })
    );
  }

  log({
    message: `Workspace ${workspaceId} has been ${
      subscriptionCanceled ? "cancelled" : "upgraded to"
    } ${newPlanName} plan`,
    type: "workspaces",
    mention: true,
  });

  return NextResponse.json({
    message: `Workspace ${workspaceId} has been ${
      subscriptionCanceled ? "cancelled" : "upgraded to"
    } ${newPlanName} plan`,
  });
}

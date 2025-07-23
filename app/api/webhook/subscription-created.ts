import { PatternRevealApiError } from "@/lib/api/errors";
import { PLANS } from "@/lib/constants";
import prisma from "@/lib/prisma";
import type { SubscriptionCreatedEvent } from "@paddle/paddle-node-sdk";
import { completeOnboarding } from "./complete-onboarding";
import { limiter } from "@/lib/cron/limiter";
import { sendEmail } from "@/emails/send";
import UpgradeEmail from "@/emails/upgrade-email";

export async function handleSubscriptionCreated(
  event: SubscriptionCreatedEvent
) {
  console.log("Subscription created:", event);
  const paddleCustomerId = event.data.customerId;
  const priceId = event.data.items[0].price?.id;
  const plan = PLANS.find((plan) =>
    [plan.price.monthlyId, plan.price.yearlyId].includes(priceId)
  );

  if (!paddleCustomerId) {
    throw new PatternRevealApiError({
      message: "Paddle customer ID not found",
      code: "not_found",
    });
  }

  if (!plan) {
    throw new PatternRevealApiError({
      message: "Plan not found",
      code: "not_found",
    });
  }

  const workspaceId = (event.data.customData as { clientReferenceId?: string })
    ?.clientReferenceId;

  if (!workspaceId) {
    throw new PatternRevealApiError({
      message: "Workspace ID not found",
      code: "not_found",
    });
  }

  // Update the workspace with the paddle customer ID, plan, and plan limits
  const workspace = await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      paddleCustomerId,
      billingCycleStart: new Date(
        event.data.currentBillingPeriod?.startsAt || new Date()
      ).getDate(),
      plan: plan.name.toLowerCase(),
      usageLimit: plan.limits.reflections,
      reflectionsLimit: plan.limits.reflections,
      aiLimit: plan.limits["ai-analysis"] + plan.limits["ask-ai"],
      usersLimit: plan.limits.users,
      paymentFailedAt: null,
    },
    select: {
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
      },
    },
  });

  const workspaceUsers = workspace.users.map(({ user }) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });

  // Complete the onboarding process for the workspace users and send them an upgrade email
  Promise.allSettled([
    completeOnboarding(workspaceUsers, workspaceId),
    workspaceUsers.map((user) => {
      limiter.schedule(() =>
        sendEmail({
          email: user.email as string,
          replyTo: "info@patternreveal.xyz",
          subject: `Thank you for upgrading to PatternReveal ${plan.name}!`,
          react: UpgradeEmail({
            name: user.name,
            email: user.email,
            plan: plan.name,
          }),
        })
      );
    }),
  ]);
}

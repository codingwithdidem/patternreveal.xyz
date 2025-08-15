import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { PLANS } from "@/lib/constants";
import { getPaddleClient } from "@/lib/paddle/client";
import { NextResponse } from "next/server";

export const POST = withWorkspace(async ({ req, workspace, session }) => {
  const { plan, period } = await parseRequestBody(req);

  if (!plan || !period) {
    throw new PatternRevealApiError({
      code: "unprocessable_entity",
      message: "Invalid plan or period.",
    });
  }

  // Find the selected plan
  const selectedPlan = PLANS.find(
    (p) => p.name.toLowerCase() === plan.toLowerCase()
  );
  if (!selectedPlan) {
    throw new PatternRevealApiError({
      code: "unprocessable_entity",
      message: "Invalid plan.",
    });
  }

  // Get the price ID based on period
  const priceId =
    period === "monthly"
      ? selectedPlan.price.monthlyId
      : selectedPlan.price.yearlyId;

  if (!priceId) {
    throw new PatternRevealApiError({
      code: "unprocessable_entity",
      message: "Price ID not found for the selected plan and period.",
    });
  }

  const paddle = getPaddleClient();
  // Check if workspace has an active subscription
  const activeSubscription = workspace.paddleCustomerId
    ? await paddle.subscriptions
        .list({
          customerId: [workspace.paddleCustomerId],
          status: ["active"],
        })
        .next()
        .then((subscriptions) => subscriptions[0])
    : null;

  if (activeSubscription && workspace.paddleCustomerId) {
    // If workspace has an active subscription, we need to create billing portal session
    const customerPortalSession = await paddle.customerPortalSessions.create(
      workspace.paddleCustomerId,
      [activeSubscription.id]
    );

    return NextResponse.json({
      action: "customer_portal",
      url: customerPortalSession.urls.general.overview,
    });
  }

  // User doesn't have an active subscription, so we will open checkout clientside
  return NextResponse.json({
    action: "checkout",
    priceId,
    customerEmail: session.user.email,
    clientReferenceId: workspace.id,
  });
});

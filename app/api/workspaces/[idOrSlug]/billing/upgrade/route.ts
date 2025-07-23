import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { PLANS } from "@/lib/constants";
import { NextResponse } from "next/server";

export const POST = withWorkspace(async ({ req, workspace, session }) => {
  const { plan, period, baseUrl, slug } = await parseRequestBody(req);

  if (!plan || !period) {
    throw new PatternRevealApiError({
      code: "unprocessable_entity",
      message: "Invalid plan or period."
    });
  }

  // Find the selected plan
  const selectedPlan = PLANS.find(
    (p) => p.name.toLowerCase() === plan.toLowerCase()
  );
  if (!selectedPlan) {
    throw new PatternRevealApiError({
      code: "unprocessable_entity",
      message: "Invalid plan."
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
      message: "Price ID not found for the selected plan and period."
    });
  }

  // Check if workspace has an active subscription
  // For now, we'll always use client-side checkout
  // TODO: Add paddleId field to workspace schema for server-side updates
  return NextResponse.json({
    success: true,
    action: "checkout",
    priceId,
    customerEmail: session.user.email,
    clientReferenceId: workspace.id,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${workspace.slug}?upgraded=true&plan=${plan}&period=${period}`,
    cancelUrl: baseUrl
  });
});

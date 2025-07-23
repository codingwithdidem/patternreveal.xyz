import { PatternRevealApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { getPaddleClient } from "@/lib/paddle/client";
import { NextResponse } from "next/server";

export const POST = withWorkspace(async ({ workspace }) => {
  if (!workspace.paddleCustomerId) {
    throw new PatternRevealApiError({
      code: "not_found",
      message: "No subscription found for this workspace."
    });
  }

  try {
    const paddle = getPaddleClient();

    const subscription = await paddle.subscriptions.list({
      customerId: [workspace.paddleCustomerId],
      status: ["active"]
    });

    const subscriptions = await subscription.next();
    const customerPortalSession = await paddle.customerPortalSessions.create(
      workspace.paddleCustomerId,
      [subscriptions[0].id]
    );

    console.log({
      customerPortalSession
    });

    return NextResponse.json({
      url: customerPortalSession.urls.subscriptions[0].cancelSubscription
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw new PatternRevealApiError({
      code: "internal_server_error",
      message: "Failed to cancel subscription. Please try again."
    });
  }
});

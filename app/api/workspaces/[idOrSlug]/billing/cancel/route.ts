import { PatternRevealApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { getPaddleClient } from "@/lib/paddle/client";
import { NextResponse } from "next/server";

/**
 * Cancel the subscription for the workspace
 * @param workspace - The workspace to cancel the subscription for
 * @returns The cancelled subscription object
 * @note Cancelling the subscription will not immediately cancel the subscription,
 * it will be cancelled at the end of the current billing period. Update subscription notification will be fired after the cancellation.
 */
export const POST = withWorkspace(async ({ workspace }) => {
  if (!workspace.paddleCustomerId) {
    throw new PatternRevealApiError({
      code: "not_found",
      message: "No subscription found for this workspace.",
    });
  }

  try {
    const paddle = getPaddleClient();

    const subscription = await paddle.subscriptions.list({
      customerId: [workspace.paddleCustomerId],
      status: ["active"],
    });
    const subscriptions = await subscription.next();

    if (!subscriptions[0]) {
      throw new PatternRevealApiError({
        code: "not_found",
        message: "No active subscription found for this workspace.",
      });
    }

    const cancelledSubscription = await paddle.subscriptions.cancel(
      subscriptions[0].id,
      {
        effectiveFrom: "immediately", // Cancel the subscription at the end of the current billing period
      }
    );

    console.log({ cancelledSubscription });

    return NextResponse.json(cancelledSubscription);
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw new PatternRevealApiError({
      code: "internal_server_error",
      message: "Failed to cancel subscription. Please try again.",
    });
  }
});

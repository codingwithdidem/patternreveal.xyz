import { getPaddleClient } from "./client";

export async function cancelSubscription(customerId: string) {
  try {
    const paddle = getPaddleClient();
    const subscriptions = await paddle.subscriptions.list({
      customerId: [customerId]
    });

    console.log(subscriptions);

    const response = await paddle.subscriptions.cancel(customerId, {
      effectiveFrom: "next_billing_period"
    });
    return response;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
}

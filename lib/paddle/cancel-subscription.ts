import { getPaddleClient } from "./client";

export async function cancelSubscription(customerId: string) {
  try {
    const paddle = getPaddleClient();
    const subscriptionsCollection = await paddle.subscriptions.list({
      customerId: [customerId],
    });

    const subscription = await subscriptionsCollection.next();
    const activePaddleSubscriptionId = subscription[0]?.id;

    if (!activePaddleSubscriptionId) {
      return;
    }

    return await paddle.subscriptions.cancel(activePaddleSubscriptionId, {
      effectiveFrom: "next_billing_period",
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return;
  }
}

import { getPaddleClient } from "./client";

export async function updateSubscription(
  subscriptionId: string,
  items: Array<{ priceId: string; quantity: number }>,
  prorationBillingMode:
    | "prorated_immediately"
    | "full_immediately"
    | "do_not_bill" = "prorated_immediately"
) {
  try {
    const paddle = getPaddleClient();
    const response = await paddle.subscriptions.update(subscriptionId, {
      items,
      prorationBillingMode
    });
    return response;
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
}

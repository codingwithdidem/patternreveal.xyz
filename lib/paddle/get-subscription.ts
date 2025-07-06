import { getPaddleClient } from "./client";

export async function getSubscription(subscriptionId: string) {
  try {
    const paddle = getPaddleClient();
    const response = await paddle.subscriptions.get(subscriptionId);
    return response;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw error;
  }
}

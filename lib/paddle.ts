import type { PaddleOptions } from "@paddle/paddle-node-sdk";
import { Paddle, Environment, LogLevel } from "@paddle/paddle-node-sdk";

export function getPaddleInstance() {
  const paddleOptions: PaddleOptions = {
    environment:
      (process.env.NEXT_PUBLIC_PADDLE_ENV as Environment) ??
      Environment.sandbox,
    logLevel: LogLevel.error
  };

  if (!process.env.PADDLE_API_KEY) {
    console.error("Paddle API key is missing");
    throw new Error("Paddle API key is required");
  }

  return new Paddle(process.env.PADDLE_API_KEY, paddleOptions);
}

export async function getSubscription(subscriptionId: string) {
  try {
    const paddle = getPaddleInstance();
    const response = await paddle.subscriptions.get(subscriptionId);
    return response;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw error;
  }
}

export async function updateSubscription(
  subscriptionId: string,
  items: Array<{ priceId: string; quantity: number }>,
  prorationBillingMode:
    | "prorated_immediately"
    | "full_immediately"
    | "do_not_bill" = "prorated_immediately"
) {
  try {
    const paddle = getPaddleInstance();
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

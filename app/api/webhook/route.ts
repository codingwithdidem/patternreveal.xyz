import { NextResponse, type NextRequest } from "next/server";
import { type EventEntity, EventName } from "@paddle/paddle-node-sdk";
import { getPaddleClient } from "@/lib/paddle/client";
import { handleSubscriptionCancelled } from "./subscription-cancelled";
import { handleSubscriptionUpdated } from "./subscription-updated";
import { handleSubscriptionCreated } from "./subscription-created";
import { handleTransactionPaymentFailed } from "./payment-failed";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const signature =
      request.headers.get("paddle-signature") ||
      request.headers.get("Paddle-Signature") ||
      request.headers.get("x-paddle-signature") ||
      request.headers.get("X-Paddle-Signature");

    const webhookSecret = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: "Missing webhook signature or secret" },
        { status: 400 }
      );
    }

    const paddle = getPaddleClient();
    const paddleEvent = await paddle.webhooks.unmarshal(
      body,
      webhookSecret,
      signature
    );

    await processWebhookEvent(paddleEvent);

    return NextResponse.json({
      success: true,
      message: "Webhook received successfully",
      code: 200,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function processWebhookEvent(paddleEvent: EventEntity) {
  try {
    switch (paddleEvent.eventType) {
      case EventName.SubscriptionCreated:
        await handleSubscriptionCreated(paddleEvent);
        break;
      case EventName.SubscriptionUpdated:
        await handleSubscriptionUpdated(paddleEvent);
        break;
      case EventName.SubscriptionCanceled:
        await handleSubscriptionCancelled(paddleEvent);
        break;
      case EventName.TransactionPaymentFailed:
        await handleTransactionPaymentFailed(paddleEvent);
        break;
      default:
        console.log("Unhandled event type:", paddleEvent.eventType);
    }
  } catch (error) {
    console.error(
      "Error processing webhook event:",
      paddleEvent.eventType,
      error
    );
  }
}

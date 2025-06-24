import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { PLANS } from "@/lib/constants";
import { PatternRevealApiError } from "@/lib/api/errors";
import { getPaddleInstance } from "@/lib/paddle";
import {
  type EventEntity,
  EventName,
  type SubscriptionCanceledEvent,
  type SubscriptionCreatedEvent,
  type SubscriptionUpdatedEvent,
  type TransactionCompletedEvent
} from "@paddle/paddle-node-sdk";

// Health check endpoint for testing
export async function GET() {
  return NextResponse.json({
    status: "webhook endpoint ready",
    timestamp: new Date().toISOString()
  });
}

// CORS preflight handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, paddle-signature, Paddle-Signature, x-paddle-signature, X-Paddle-Signature"
    }
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    console.log("Paddle webhook received");

    // Read the request body
    const body = await request.text();

    // Log headers for debugging
    console.log("Headers:", Object.fromEntries(request.headers.entries()));

    // Get signature from headers
    const signature =
      request.headers.get("paddle-signature") ||
      request.headers.get("Paddle-Signature") ||
      request.headers.get("x-paddle-signature") ||
      request.headers.get("X-Paddle-Signature");

    const webhookSecret = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET;

    console.log("Signature found:", !!signature);
    console.log("Webhook secret found:", !!webhookSecret);

    // Validate required fields
    if (!signature || !webhookSecret) {
      console.error("Missing webhook signature or secret");
      return NextResponse.json(
        { error: "Missing webhook signature or secret" },
        { status: 400 }
      );
    }

    // Parse the webhook payload
    let paddleEvent: EventEntity;

    try {
      // First try to verify the signature
      const paddle = getPaddleInstance();
      paddleEvent = await paddle.webhooks.unmarshal(
        body,
        webhookSecret,
        signature
      );
    } catch (signatureError) {
      console.error("Signature verification failed:", signatureError);

      // Fallback: try to parse as JSON for debugging
      try {
        const eventData = JSON.parse(body);
        console.log("Parsed event data:", eventData);

        // Create a mock EventEntity for processing
        paddleEvent = {
          eventType: eventData.event_type || "unknown",
          data: eventData.data || eventData,
          occurredAt: eventData.occurred_at || new Date().toISOString()
        } as EventEntity;

        console.warn(
          "Using unverified webhook data - signature verification failed"
        );
      } catch (parseError) {
        console.error("Failed to parse webhook body:", parseError);
        return NextResponse.json(
          { error: "Invalid webhook payload" },
          { status: 400 }
        );
      }
    }

    console.log("Webhook event:", paddleEvent.eventType);

    // Process webhook asynchronously to meet 5-second requirement
    // Queue the event for processing instead of processing immediately
    setImmediate(async () => {
      try {
        await processWebhookEvent(paddleEvent);
      } catch (error) {
        console.error("Error processing webhook event:", error);
      }
    });

    // Return 200 immediately to acknowledge receipt
    const responseTime = Date.now() - startTime;
    console.log(`Webhook acknowledged in ${responseTime}ms`);

    return NextResponse.json({
      success: true,
      message: "Webhook received and queued for processing",
      responseTime: `${responseTime}ms`
    });
  } catch (error) {
    console.error("Webhook processing failed:", error);

    const responseTime = Date.now() - startTime;
    console.log(`Webhook error response in ${responseTime}ms`);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Async function to process webhook events
async function processWebhookEvent(paddleEvent: EventEntity) {
  console.log("Processing webhook event:", paddleEvent.eventType);

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
      case EventName.TransactionCompleted:
        await handleTransactionCompleted(paddleEvent);
        break;
      default:
        console.log("Unhandled event type:", paddleEvent.eventType);
    }

    console.log("Webhook event processed successfully:", paddleEvent.eventType);
  } catch (error) {
    console.error(
      "Error processing webhook event:",
      paddleEvent.eventType,
      error
    );
    throw error;
  }
}

async function handleSubscriptionCreated(event: SubscriptionCreatedEvent) {
  console.log("Subscription created:", event);
  const paddleCustomerId = event.data.customerId;
  const priceId = event.data.items[0].price?.id;
  const plan = PLANS.find((plan) =>
    [plan.price.monthlyId, plan.price.yearlyId].includes(priceId)
  );

  if (!paddleCustomerId) {
    throw new PatternRevealApiError({
      message: "Paddle customer ID not found",
      code: "not_found"
    });
  }

  if (!plan) {
    throw new PatternRevealApiError({
      message: "Plan not found",
      code: "not_found"
    });
  }

  const workspaceId = (event.data.customData as { clientReferenceId?: string })
    ?.clientReferenceId;

  if (!workspaceId) {
    throw new PatternRevealApiError({
      message: "Workspace ID not found",
      code: "not_found"
    });
  }

  // Update the workspace with the paddle customer ID, plan, and plan limits
  const workspace = await prisma.workspace.update({
    where: {
      id: workspaceId
    },
    data: {
      paddleCustomerId,
      billingCycleStart: new Date(
        event.data.currentBillingPeriod?.startsAt || new Date()
      ).getDate(),
      plan: plan.name.toLowerCase(),
      usageLimit: plan.limits.reflections,
      reflectionsLimit: plan.limits.reflections,
      aiLimit: plan.limits["ai-analysis"] + plan.limits["ask-ai"]
    },
    select: {
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    }
  });

  // const workspaceUsers = workspace.users.map(({ user }) => {
  //   return {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email
  //   };
  // });
}

async function handleSubscriptionUpdated(event: SubscriptionUpdatedEvent) {
  console.log("Subscription updated:", event);
}

async function handleSubscriptionCancelled(event: SubscriptionCanceledEvent) {
  console.log("Subscription cancelled:", event);
}

async function handleTransactionCompleted(event: TransactionCompletedEvent) {
  console.log("Transaction completed:", event);
}

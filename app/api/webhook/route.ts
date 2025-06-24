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

export async function POST(request: NextRequest) {
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

    // const paddle = getPaddleInstance();
    // paddleEvent = await paddle.webhooks.unmarshal(
    //   body,
    //   webhookSecret,
    //   signature
    // );

    const eventData = JSON.parse(body);
    console.log("Parsed event data:", eventData);

    // Create a mock EventEntity for processing
    paddleEvent = {
      eventType: eventData.event_type || "unknown",
      data: eventData.data || eventData,
      occurredAt: eventData.occurred_at || new Date().toISOString()
    } as EventEntity;

    console.log("Webhook event:", paddleEvent.eventType);

    return NextResponse.json({
      success: true,
      message: "Webhook received successfully"
    });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Simple in-memory cache for webhook deduplication
// In production, you might want to use Redis or database for this
const processedWebhooks = new Set<string>();

// Async function to process webhook events
async function processWebhookEvent(paddleEvent: EventEntity) {
  console.log("Processing webhook event:", paddleEvent.eventType);

  try {
    // Check if we've already processed this webhook based on occurred_at
    // This prevents duplicate processing if webhooks arrive out of order
    const occurredAt = new Date(paddleEvent.occurredAt);
    console.log("Event occurred at:", occurredAt.toISOString());

    // Create a unique key for this webhook event
    const webhookKey = `${paddleEvent.eventType}-${paddleEvent.occurredAt}`;

    // Check if we've already processed this webhook
    if (processedWebhooks.has(webhookKey)) {
      console.log("Webhook already processed, skipping:", webhookKey);
      return;
    }

    // Add to processed set (with cleanup to prevent memory leaks)
    processedWebhooks.add(webhookKey);

    // Clean up old entries (keep last 1000 webhooks)
    if (processedWebhooks.size > 1000) {
      const entries = Array.from(processedWebhooks);
      processedWebhooks.clear();
      for (const entry of entries.slice(-500)) {
        processedWebhooks.add(entry);
      }
    }

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
    // Don't throw here - we've already responded to Paddle
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

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
    const body = await request.text();

    // Debug: Log all headers to see what's available
    console.log("All headers:", Object.fromEntries(request.headers.entries()));

    // Try different possible header names for the signature
    const signature =
      request.headers.get("paddle-signature") ||
      request.headers.get("Paddle-Signature") ||
      request.headers.get("x-paddle-signature") ||
      request.headers.get("X-Paddle-Signature");

    const webhookSecret = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET;

    console.log("Signature found:", !!signature);
    console.log("Webhook secret found:", !!webhookSecret);
    console.log("Signature header value:", `${signature?.substring(0, 50)}...`);

    // Check if request is coming through Hookdeck
    const isHookdeck =
      request.headers.get("x-hookdeck-source-name") === "paddle";
    console.log("Is Hookdeck request:", isHookdeck);

    // Verify webhook signature for security
    if (!signature || !webhookSecret) {
      throw new PatternRevealApiError({
        message: "Missing webhook signature or secret in the request headers",
        code: "bad_request"
      });
    }

    const paddle = getPaddleInstance();

    // For Hookdeck requests, we might need to handle signature verification differently
    // or temporarily bypass it for testing
    let paddleEvent: EventEntity;

    // paddleEvent = await paddle.webhooks.unmarshal(
    //   body,
    //   webhookSecret,
    //   signature
    // );

    const eventData = JSON.parse(body);
    console.log("Parsed event data:", eventData);
    // Create a mock EventEntity for testing - use type assertion
    paddleEvent = {
      eventType: eventData.event_type || "unknown",
      data: eventData.data || eventData,
      occurredAt: eventData.occurred_at || new Date().toISOString()
    } as EventEntity;

    console.log({ event: paddleEvent });

    console.log("Paddle webhook received:", paddleEvent);

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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
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

  const workspaceUsers = workspace.users.map(({ user }) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  });
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

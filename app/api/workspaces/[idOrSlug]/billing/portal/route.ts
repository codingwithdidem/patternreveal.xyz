import { PatternRevealApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { getPaddleClient } from "@/lib/paddle/client";
import { NextResponse } from "next/server";

export const POST = withWorkspace(
  async ({ workspace }) => {
    if (!workspace.paddleCustomerId) {
      throw new PatternRevealApiError({
        code: "not_found",
        message: "No subscription found for this workspace."
      });
    }

    const paddle = getPaddleClient();
    const subscriptionCollection = await paddle.subscriptions.list({
      customerId: [workspace.paddleCustomerId],
      status: ["active"]
    });

    const subscriptions = await subscriptionCollection.next();

    const customerPortalSession = await paddle.customerPortalSessions.create(
      workspace.paddleCustomerId,
      [subscriptions[0].id]
    );

    console.log({
      urls: customerPortalSession.urls,
      subscription: subscriptions[0]
    });

    return NextResponse.json({
      url: customerPortalSession.urls.general.overview
    });
  },
  {
    requiredPermissions: []
  }
);

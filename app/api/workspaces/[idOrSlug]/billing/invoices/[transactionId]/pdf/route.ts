import { PatternRevealApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { getPaddleClient } from "@/lib/paddle/client";
import { NextResponse } from "next/server";

export const GET = withWorkspace(
  async ({ workspace, params }) => {
    const { transactionId } = params;

    if (!transactionId || typeof transactionId !== "string") {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid transaction ID."
      });
    }

    if (!workspace.paddleCustomerId) {
      throw new PatternRevealApiError({
        code: "not_found",
        message: "No subscription found for this workspace."
      });
    }

    try {
      const paddle = getPaddleClient();

      const invoicePDF = await paddle.transactions.getInvoicePDF(
        transactionId,
        {
          disposition: "inline"
        }
      );

      return NextResponse.json({
        url: invoicePDF.url
      });
    } catch (error) {
      console.error("Error handling invoice PDF request:", error);

      return NextResponse.json(
        {
          error: "PDF not available",
          message:
            "Invoice PDF is not available for download. Please visit your customer portal to download invoices.",
          customerPortalUrl: `https://vendors.paddle.com/customer/${workspace.paddleCustomerId}`
        },
        { status: 404 }
      );
    }
  },
  {
    requiredPermissions: []
  }
);

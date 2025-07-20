import { PatternRevealApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { getPaddleClient } from "@/lib/paddle/client";
import { NextResponse } from "next/server";
import { invoicesResponseSchema } from "@/lib/zod/schemas/invoice";

// Type for the actual Paddle API response structure
interface PaddleTransaction {
  id: string;
  status: string;
  currencyCode: string;
  createdAt: string;
  details?: {
    payoutTotals?: { total: string };
    totals?: { total: string };
    adjustedTotals?: { total: string };
  };
  billingDetails?: {
    name?: string;
    email?: string;
  };
  items?: Array<{
    price?: {
      id?: string;
      description?: string;
    };
    description?: string;
    quantity?: number;
    total?: string;
    unitTotal?: string;
  }>;
}

export const GET = withWorkspace(async ({ workspace }) => {
  if (!workspace.paddleCustomerId) {
    return NextResponse.json({
      invoices: []
    });
  }

  try {
    const paddle = getPaddleClient();

    const invoicesCollection = await paddle.transactions.list({
      customerId: [workspace.paddleCustomerId],
      status: ["paid", "completed", "billed"],
      orderBy: "created_at[DESC]",
      perPage: 30
    });

    const invoices = await invoicesCollection.next();

    console.log("First invoice details:", invoices[0].details);
    console.log(
      "First invoice adjustedTotals:",
      invoices[0].details?.adjustedTotals
    );

    const transformedInvoices = invoices.map((invoice) => {
      // Paddle returns amounts in cents, so we need to convert to actual currency
      const amountInCents = invoice.details?.adjustedTotals?.total || "0";
      const amount = (Number.parseFloat(amountInCents) / 100).toString();

      return {
        id: invoice.id,
        status: invoice.status,
        currencyCode: invoice.currencyCode,
        amount: amount,
        createdAt: invoice.createdAt
      };
    });

    const validatedResponse = invoicesResponseSchema.parse({
      invoices: transformedInvoices
    });

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error("Error fetching invoices:", error);

    return NextResponse.json({
      invoices: []
    });
  }
});

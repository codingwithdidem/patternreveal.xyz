import { withWorkspace } from "@/lib/auth/withWorkspace";
import { getPaddleClient } from "@/lib/paddle/client";
import { NextResponse } from "next/server";
import { invoicesResponseSchema } from "@/lib/zod/schemas/invoice";

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
      return {
        id: invoice.id,
        status: invoice.status,
        currencyCode: invoice.currencyCode,
        amount: invoice.details?.adjustedTotals?.total,
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

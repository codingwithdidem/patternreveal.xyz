import { PatternRevealApiError } from "@/lib/api/errors";
import prisma from "@/lib/prisma";
import { log } from "@/utils/functions/slack-log";
import type { TransactionPaymentFailedEvent } from "@paddle/paddle-node-sdk";

export async function handleTransactionPaymentFailed(
  event: TransactionPaymentFailedEvent
) {
  console.log("Transaction payment failed:", event);

  const paddleCustomerId = event.data.customerId;
  const workspaceId = (event.data.customData as { clientReferenceId?: string })
    ?.clientReferenceId;

  if (!workspaceId) {
    throw new PatternRevealApiError({
      message: "Workspace ID not found",
      code: "not_found",
    });
  }

  if (!paddleCustomerId) {
    throw new PatternRevealApiError({
      message: "Paddle customer ID not found",
      code: "not_found",
    });
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      paddleCustomerId,
      id: workspaceId,
    },
  });

  if (!workspace) {
    throw new PatternRevealApiError({
      message: "Workspace not found",
      code: "not_found",
    });
  }

  await Promise.allSettled([
    prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        paymentFailedAt: new Date(),
      },
    }),

    log({
      message: `Workspace ${workspaceId} has failed to pay for their subscription`,
      type: "workspaces",
      mention: true,
    }),
  ]);
}

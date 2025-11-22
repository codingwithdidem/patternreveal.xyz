import { sendEmail } from "@/emails/send";
import SubscriptionPaymentFailedEmail from "@/emails/subscription-payment-failed";
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

  const workspace = await prisma.workspace.findUnique({
    where: {
      paddleCustomerId,
      id: workspaceId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      plan: true,
      users: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        where: {
          role: "OWNER",
        },
      },
    },
  });

  if (!workspace) {
    throw new PatternRevealApiError({
      message: "Workspace not found",
      code: "not_found",
    });
  }

  const totals = event.data.details?.totals as
    | {
        total?: string;
        currency_code?: string;
      }
    | undefined;

  const payment = event.data.payments?.[0] as
    | {
        amount?: string;
        currency_code?: string;
      }
    | undefined;

  const amountMinorUnits = Number(payment?.amount ?? totals?.total ?? 0);

  const currencyFromEvent =
    (
      event.data as {
        currency_code?: string;
        currencyCode?: string;
      }
    ).currency_code ?? (event.data as { currencyCode?: string }).currencyCode;

  const currencyCode =
    totals?.currency_code ??
    payment?.currency_code ??
    currencyFromEvent ??
    "USD";

  const formattedAmount = amountMinorUnits
    ? new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amountMinorUnits / 100)
    : undefined;

  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const baseAppUrl = appDomain
    ? appDomain.startsWith("http")
      ? appDomain
      : `https://${appDomain}`
    : process.env.NEXTAUTH_URL;

  const billingPortalUrl = workspace.slug
    ? baseAppUrl
      ? `${baseAppUrl.replace(/\/$/, "")}/app/${
          workspace.slug
        }/settings/workspace/billing`
      : `/app/${workspace.slug}/settings/workspace/billing`
    : baseAppUrl
    ? `${baseAppUrl.replace(/\/$/, "")}/app/settings/workspace/billing`
    : "/app/settings/workspace/billing";

  await Promise.allSettled([
    prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        paymentFailedAt: new Date(),
      },
    }),
    ...workspace.users
      .map(({ user }) => {
        if (!user.email) {
          return null;
        }

        return sendEmail({
          email: user.email,
          subject: `We couldn't process your PatternReveal ${workspace.plan} payment`,
          react: SubscriptionPaymentFailedEmail({
            name: user.name,
            plan: workspace.plan,
            amount: formattedAmount,
            currency: currencyCode,
            billingPortalUrl,
          }),
        });
      })
      .filter(Boolean),
    log({
      message: `Workspace ${workspaceId} has a failed subscription payment`,
      type: "workspaces",
      mention: true,
    }),
  ]);
}

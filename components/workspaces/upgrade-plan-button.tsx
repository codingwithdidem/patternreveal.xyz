"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import { Button } from "../ui/button";
import type { periodSchema } from "@/lib/zod/schemas/plan";
import { PLANS } from "@/lib/constants";
import type { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import {
  initializePaddle,
  type Environments,
  type Paddle,
} from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function UpgradePlanButton({
  plan,
  period,
  className,
}: {
  plan: string;
  period: z.infer<typeof periodSchema>;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  const [paddle, setPaddle] = useState<Paddle | null>(null);

  const {
    slug: workspaceSlug,
    plan: workspacePlan,
    id: workspaceId,
  } = useWorkspace();

  const currentPlan = PLANS.find(
    (p) => p.name.toLowerCase() === workspacePlan?.toLowerCase()
  );

  const isCurrentPlan = currentPlan?.name.toLowerCase() === plan.toLowerCase();
  const isFreePlan = plan.toLowerCase() === "free";
  const queryString = searchParams.toString();

  // Initialize Paddle
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN &&
      process.env.NEXT_PUBLIC_PADDLE_ENV
    ) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
      }).then((paddle) => {
        if (paddle) {
          setPaddle(paddle);
        }
      });
    }
  }, []);

  console.log({
    currentPlan,
    isCurrentPlan,
    isFreePlan,
    workspacePlan,
    workspaceSlug,
    plan,
    period,
  });

  const onUpgrade = async () => {
    try {
      const res = await fetch(
        `/api/workspaces/${workspaceSlug}/billing/upgrade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan,
            period,
            baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}${pathname}${
              queryString.length > 0 ? `?${queryString}` : ""
            }`,
            slug: searchParams.get("slug"),
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();

        if (data.success && data.action === "checkout" && paddle) {
          // Open Paddle checkout client-side
          paddle.Checkout.open({
            items: [{ priceId: data.priceId, quantity: 1 }],
            customer: {
              email: data.customerEmail,
            },
            settings: {
              allowLogout: !data.customerEmail,
              displayMode: "overlay",
              theme: "light",
              variant: "one-page",
            },
            customData: {
              clientReferenceId: workspaceId,
            },
          });

          posthog.capture("checkout_initiated", {
            currentPlan: currentPlan?.name,
            selectedPlan: plan,
            period,
            workspace: workspaceSlug,
          });
        } else {
          throw new Error("Failed to initiate checkout");
        }
      } else {
        throw new Error("Failed to upgrade plan");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      className={className}
      disabled={isCurrentPlan || !workspaceSlug || !paddle}
      onClick={onUpgrade}
    >
      {isCurrentPlan
        ? "You're on this plan"
        : isFreePlan
        ? "Get Started"
        : "Upgrade to Pro"}
    </Button>
  );
}

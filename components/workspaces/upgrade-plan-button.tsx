"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import { Button } from "../ui/button";
import type { periodSchema } from "@/lib/zod/schemas/plan";
import { PLANS } from "@/lib/constants";
import type { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";

export default function UpgradePlanButton({
  plan,
  period,
  className
}: {
  plan: string;
  period: z.infer<typeof periodSchema>;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  const { slug: workspaceSlug, plan: workspacePlan } = useWorkspace();

  const currentPlan = PLANS.find(
    (p) => p.name.toLowerCase() === workspacePlan?.toLowerCase()
  );

  const isCurrentPlan = currentPlan?.name.toLowerCase() === plan.toLowerCase();
  const isFreePlan = plan.toLowerCase() === "free";
  const queryString = searchParams.toString();

  const onUpgrade = async () => {
    try {
      const res = await fetch(
        `/api/workspaces/${workspaceSlug}/billing/upgrade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            plan,
            period,
            baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}${pathname}${queryString.length > 0 ? `?${queryString}` : ""}`,
            slug: searchParams.get("slug")
          })
        }
      );

      if (res.ok) {
        posthog.capture("checkout_initiated", {
          currentPlan: currentPlan?.name,
          selectedPlan: plan,
          period,
          workspace: workspaceSlug
        });

        if (currentPlan?.name === "free") {
          const data = await res.json();
          const { id: sessionId } = data;
          const stripe = await getStripe();
          stripe?.redirectToCheckout({ sessionId });
        } else {
          const { url } = await res.json();
          router.push(url);
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
      disabled={isCurrentPlan || !workspaceSlug}
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

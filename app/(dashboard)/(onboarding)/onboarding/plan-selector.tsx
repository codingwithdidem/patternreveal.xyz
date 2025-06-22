"use client";

import { useEffect, useState } from "react";
import { periods, type periodSchema } from "@/lib/zod/schemas/plan";
import type { z } from "zod";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/animated-tabs";
import { PLANS, PRO_PLAN } from "@/lib/constants";
import { FREE_PLAN } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import NumberFlow from "@number-flow/react";
import UpgradePlanButton from "@/components/workspaces/upgrade-plan-button";
import PlanFeatures from "@/components/workspaces/plan-features";
import {
  initializePaddle,
  type Environments,
  type Paddle
} from "@paddle/paddle-js";

const plans = [FREE_PLAN, PRO_PLAN];

export default function PlanSelector() {
  const [period, setPeriod] = useState<z.infer<typeof periodSchema>>("monthly");
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [currency, setCurrency] = useState<string>("USD");

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN &&
      process.env.NEXT_PUBLIC_PADDLE_ENV
    ) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments
      }).then((paddle) => {
        if (paddle) {
          setPaddle(paddle);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (paddle) {
      const priceIds = [PRO_PLAN].map((plan) => [
        plan?.price.monthlyId,
        plan?.price.yearlyId
      ]);

      paddle
        .PricePreview({
          items: priceIds.flat().map((priceId) => ({
            priceId: priceId ?? "",
            quantity: 1
          }))
        })
        .then((prices) => {
          const lineItems = prices.data.details.lineItems;
          const currency = prices.data.currencyCode;

          setCurrency(currency);
          const result = lineItems.reduce(
            (acc: Record<string, string>, item) => {
              acc[item.price.id] = item.formattedTotals.total;
              return acc;
            },
            {}
          );
          setPrices(result);
        });
    }
  }, [paddle]);

  return (
    <div>
      <Tabs
        value={period}
        onValueChange={(value) =>
          setPeriod(value as z.infer<typeof periodSchema>)
        }
      >
        <TabsList className="w-[150px] mx-auto justify-center items-center flex">
          {periods.map((period) => (
            <TabsTrigger key={period} value={period}>
              {period}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
          {plans.map((plan) => {
            const priceId =
              period === "monthly"
                ? plan?.price.monthlyId
                : plan?.price.yearlyId;
            const price = plan?.name === "Pro" ? prices[priceId ?? ""] : "0";
            const priceNumber = Number(price?.replace(/[^0-9.]/g, "")) ?? 0;

            return (
              <TabsContent
                value={period}
                key={plan?.name}
                className="flex flex-col rounded-lg border border-neutral-100 bg-black p-6 pb-8"
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-neutral-800">
                    {plan?.name}
                  </h2>
                  {plan?.name === "Pro" && (
                    <Badge variant="secondary">Best value</Badge>
                  )}
                </div>
                <div className="mt-1 text-base font-medium text-neutral-400">
                  <NumberFlow
                    value={price ? priceNumber : 0}
                    className="tabular-nums text-neutral-700"
                    format={{
                      style: "currency",
                      currency,
                      maximumFractionDigits: 0
                    }}
                  />
                  <span className="ml-1 font-medium">
                    per month
                    {period === "yearly" && ", billed yearly"}
                  </span>
                </div>
                <div className="my-6 flex gap-2">
                  <UpgradePlanButton
                    plan={plan?.name?.toLowerCase() ?? ""}
                    period={period}
                    className="h-10 rounded-lg shadow-sm"
                  />
                </div>
                <PlanFeatures className="mt-2" plan={plan?.name ?? ""} />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}

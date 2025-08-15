"use client";

import { getNextPlan } from "@/lib/constants";
import useWorkspace from "@/lib/swr/use-workspace";
import { cn } from "@/lib/utils";
import { getFirstAndLastDay } from "@/utils/functions/datetime/get-first-and-last-day";
import {
  ChevronRight,
  SparklesIcon,
  WandSparklesIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { forwardRef, useMemo, useState, type CSSProperties } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { nFormatter } from "@/utils/functions/nformatter";
import UpgradeToProButton from "../UpgradeToProButton";

export const INFINITY_NUMBER = 1000000000;

export default function WorkspaceUsage() {
  const {
    slug,
    aiUsage,
    aiLimit,
    reflectionsUsage,
    reflectionsLimit,
    billingCycleStart,
    plan,
    loading,
    paymentFailedAt,
  } = useWorkspace({
    swrOpts: { keepPreviousData: true },
  });

  const [billingEnd] = useMemo(() => {
    if (billingCycleStart) {
      const { lastDay } = getFirstAndLastDay(billingCycleStart);
      const end = lastDay.toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return [end];
    }
    return [];
  }, [billingCycleStart]);

  const [hovered, setHovered] = useState(false);

  const nextPlan = getNextPlan(plan);

  // Warn the user if they're >= 90% of any limit
  const warnings = useMemo(
    () =>
      [
        [reflectionsUsage, reflectionsLimit],
        [aiUsage, aiLimit],
      ].map(
        ([usage, limit]) =>
          usage !== undefined &&
          limit !== undefined &&
          usage / Math.max(0, usage, limit) >= 0.9
      ),
    [aiUsage, aiLimit, reflectionsUsage, reflectionsLimit]
  );

  const warning = warnings.some((w) => w);

  return (
    <div className="border-t border-neutral-300/50 p-3">
      <Link
        className="group flex items-center gap-0.5 text-sm font-normal text-neutral-500 transition-colors hover:text-neutral-700"
        href={`/${slug}/settings/workspace/billing`}
      >
        Usage
        <ChevronRight className="size-3 text-neutral-400 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-neutral-500" />
      </Link>

      <div className="mt-4 flex flex-col gap-4">
        <UsageRow
          icon={WandSparklesIcon}
          label="Reflections"
          usage={reflectionsUsage ?? 0}
          limit={reflectionsLimit ?? 0}
          showNextPlan={hovered}
          nextPlanLimit={nextPlan?.limits.reflections ?? 0}
          warning={warnings[0]}
        />
        <UsageRow
          icon={SparklesIcon}
          label="AI"
          usage={aiUsage ?? 0}
          limit={aiLimit ?? 0}
          showNextPlan={hovered}
          nextPlanLimit={
            (nextPlan?.limits["ask-ai"] ?? 0) +
            (nextPlan?.limits["ai-analysis"] ?? 0)
          }
          warning={warnings[1]}
        />
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-neutral-500/10" />
        ) : (
          <p
            className={cn(
              "text-xs text-neutral-900/40",
              paymentFailedAt && "text-red-600"
            )}
          >
            {paymentFailedAt
              ? "Your last payment failed. Please update your payment method to continue using PatternReveal."
              : `Usage will reset ${billingEnd}`}
          </p>
        )}
      </div>

      {paymentFailedAt ? (
        <div>hello</div>
      ) : // <ManageSubscriptionButton
      //   text="Update Payment Method"
      //   variant="primary"
      //   className="mt-4 w-full"
      //   onMouseEnter={() => {
      //     setHovered(true);
      //   }}
      //   onMouseLeave={() => {
      //     setHovered(false);
      //   }}
      // />
      warning || plan === "free" ? (
        <UpgradeToProButton
          className="mt-4 w-full"
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
        >
          {plan === "free" ? "Get PatternReveal Pro" : "Upgrade plan"}
        </UpgradeToProButton>
      ) : null}
    </div>
  );
}

type UsageRowProps = {
  icon: LucideIcon;
  label: string;
  usage?: number;
  limit?: number;
  showNextPlan: boolean;
  nextPlanLimit?: number;
  warning: boolean;
};

const UsageRow = forwardRef<
  HTMLDivElement,
  {
    icon: LucideIcon;
    label: string;
    usage: number;
    limit: number;
    showNextPlan: boolean;
    nextPlanLimit: number;
    warning: boolean;
  }
>(
  (
    {
      icon: Icon,
      label,
      usage,
      limit,
      showNextPlan,
      nextPlanLimit,
      warning,
    }: UsageRowProps,
    ref
  ) => {
    const loading = usage === undefined || limit === undefined;
    const unlimited = limit !== undefined && limit >= INFINITY_NUMBER;

    return (
      <div ref={ref}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="size-3.5 text-neutral-600" />
            <span className="text-xs font-medium text-neutral-700">
              {label}
            </span>
          </div>
          {!loading ? (
            <div className="flex items-center">
              <span className="text-xs font-medium text-neutral-600">
                <NumberFlow value={usage} /> of{" "}
                <motion.span
                  className={cn(
                    "relative transition-colors duration-150",
                    showNextPlan && nextPlanLimit
                      ? "text-neutral-400"
                      : "text-neutral-600"
                  )}
                >
                  {formatNumber(limit)}
                  {showNextPlan && nextPlanLimit && (
                    <motion.span
                      className="absolute bottom-[45%] left-0 h-[1px] bg-neutral-400"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.span>
              </span>
              <AnimatePresence>
                {showNextPlan && nextPlanLimit && (
                  <motion.div
                    className="flex items-center"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth movement
                    }}
                  >
                    <motion.span className="ml-1 whitespace-nowrap text-xs font-medium text-blue-600">
                      {formatNumber(nextPlanLimit)}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="h-4 w-16 animate-pulse rounded-md bg-neutral-500/10" />
          )}
        </div>
        {!unlimited && (
          <div className="mt-1.5">
            <div
              className={cn(
                "h-0.5 w-full overflow-hidden rounded-full bg-neutral-900/10 transition-colors",
                loading && "bg-neutral-900/5"
              )}
            >
              {!loading && (
                <div
                  className="animate-slide-right-fade size-full"
                  style={{ "--offset": "-100%" } as CSSProperties}
                >
                  <div
                    className={cn(
                      "size-full rounded-full bg-gradient-to-r from-transparent to-blue-600",
                      warning && "to-rose-500"
                    )}
                    style={{
                      transform: `translateX(-${
                        100 -
                        Math.max(
                          Math.floor((usage / Math.max(0, usage, limit)) * 100),
                          usage === 0 ? 0 : 1
                        )
                      }%)`,
                      transition: "transform 0.25s ease-in-out",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

UsageRow.displayName = "UsageRow";

const formatNumber = (value: number) =>
  value >= INFINITY_NUMBER
    ? "∞"
    : nFormatter(value, {
        full: value !== undefined && value < 999,
        digits: 1,
      });

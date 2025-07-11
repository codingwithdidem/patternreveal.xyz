"use client";

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Crown, CrownIcon, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PremiumFeatureBadgeProps {
  variant?: "default" | "crown" | "sparkles" | "zap";
  size?: "sm" | "md" | "lg";
  text?: string;
  showIcon?: boolean;
  className?: string;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  tooltip?: ReactNode | string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}

const iconMap: Record<"crown" | "sparkles" | "zap", LucideIcon> = {
  crown: Crown,
  sparkles: Sparkles,
  zap: Zap
};

const sizeVariants = {
  sm: "text-xs px-2 py-1 gap-1",
  md: "text-sm px-2.5 py-1.5 gap-1.5",
  lg: "text-base px-3 py-2 gap-2"
};

export function PremiumFeatureBadge({
  variant = "default",
  size = "sm",
  text = "Pro",
  showIcon = true,
  className,
  speed = 1,
  colorFrom = "#f59e0b",
  colorTo = "#ec4899",
  tooltip,
  tooltipSide = "top"
}: PremiumFeatureBadgeProps) {
  const Icon = variant !== "default" ? iconMap[variant] : Crown;
  const iconSize = size === "sm" ? 12 : size === "md" ? 14 : 16;

  const badge = (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-950/40 dark:to-orange-950/40 border border-pink-200 dark:border-pink-800 hover:cursor-help",
        sizeVariants[size],
        className
      )}
    >
      {showIcon && (
        <Icon
          size={iconSize}
          className="text-orange-500 dark:text-orange-400"
        />
      )}
      <AnimatedGradientText
        speed={speed}
        colorFrom={colorFrom}
        colorTo={colorTo}
        className="font-bold"
      >
        {text}
      </AnimatedGradientText>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} side={tooltipSide}>
        {badge}
      </Tooltip>
    );
  }

  return badge;
}

// Alternative compact version for inline use
export function PremiumFeaturePill({
  text = "Pro Feature",
  className,
  speed = 1.5,
  tooltip,
  tooltipSide = "top"
}: {
  text?: string;
  className?: string;
  speed?: number;
  tooltip?: ReactNode | string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}) {
  const pill = (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-800",
        className
      )}
    >
      <CrownIcon size={12} className="text-orange-500 dark:text-orange-400" />
      <AnimatedGradientText
        speed={speed}
        colorFrom="#f59e0b"
        colorTo="#ec4899"
        className="text-xs font-medium"
      >
        {text}
      </AnimatedGradientText>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} side={tooltipSide}>
        {pill}
      </Tooltip>
    );
  }

  return pill;
}

// Minimalist version for subtle premium indicators
export function PremiumIndicator({
  className,
  tooltip,
  tooltipSide = "top"
}: {
  className?: string;
  tooltip?: ReactNode | string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}) {
  const indicator = (
    <div className={cn("inline-flex items-center", className)}>
      <AnimatedGradientText
        speed={1.5}
        colorFrom="#f59e0b"
        colorTo="#ec4899"
        className="text-xs font-semibold"
      >
        ✨ Pro
      </AnimatedGradientText>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} side={tooltipSide}>
        {indicator}
      </Tooltip>
    );
  }

  return indicator;
}

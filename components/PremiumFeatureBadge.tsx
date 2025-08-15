"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import useWorkspace from "@/lib/swr/use-workspace";
import UpgradePlanButton from "@/components/workspaces/upgrade-plan-button";

interface PremiumFeatureBadgeProps {
  feature: string;
  className?: string;
  showUpgradeButton?: boolean;
}

export default function PremiumFeatureBadge({
  feature,
  className = "",
  showUpgradeButton = false,
}: PremiumFeatureBadgeProps) {
  const workspace = useWorkspace();
  const isPro = workspace?.plan?.toLowerCase() === "pro";

  if (isPro) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge
        variant="secondary"
        className="flex items-center gap-1 select-none"
      >
        <Sparkles className="w-3 h-3" />
        Pro
      </Badge>
      {showUpgradeButton && (
        <UpgradePlanButton
          plan="pro"
          period="monthly"
          className="h-6 text-xs px-2"
        />
      )}
    </div>
  );
}

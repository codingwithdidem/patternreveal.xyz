"use client";

import { TrendingUp } from "lucide-react";
import UpgradeToProButton from "@/components/UpgradeToProButton";

interface AnalyticsUpgradeOverlayProps {
  className?: string;
}

export default function AnalyticsUpgradeOverlay({
  className = "",
}: AnalyticsUpgradeOverlayProps) {
  return (
    <div className={`text-center max-w-lg mx-auto px-6 py-4 ${className}`}>
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4 border border-gray-200">
          <TrendingUp className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Real-time Analytics Stream
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Want more data on your behavioral patterns & emotional insights?
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Upgrade to our Pro Plan to get detailed, real-time analytics and
          advanced pattern recognition in your workspace.{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Learn more ↗
          </span>
        </p>
      </div>

      <UpgradeToProButton variant="gradient" size="lg" className="mx-auto" />
    </div>
  );
}

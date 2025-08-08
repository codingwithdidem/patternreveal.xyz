"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Heart,
  Target,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import type { EmotionalIntelligenceData } from "./EmotionalIntelligenceInsights";

interface EmotionalIntelligenceTabProps {
  workspaceId?: string;
  daysFilter: string;
  selectedUserId?: string;
}

export default function EmotionalIntelligenceTab({
  workspaceId,
  daysFilter,
  selectedUserId,
}: EmotionalIntelligenceTabProps) {
  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    workspaceId
      ? `/api/analytics/patterns?type=emotional_intelligence&days_filter=${daysFilter}&workspaceId=${workspaceId}${
          selectedUserId ? `&user_id=${selectedUserId}` : ""
        }`
      : null,
    fetcher
  );

  const data = result?.data as EmotionalIntelligenceData[];
  const hasError = !!error;
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Emotional Intelligence</CardTitle>
            <CardDescription>
              Loading emotional intelligence insights...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (hasError || !data || data.length === 0) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Emotional Intelligence</CardTitle>
            <CardDescription>
              Unable to load emotional intelligence data.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const insights = data[0];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600";
      case "declining":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getRiskLevel = (rate: number) => {
    if (rate >= 70) return { level: "High", color: "bg-red-100 text-red-800" };
    if (rate >= 40)
      return { level: "Medium", color: "bg-yellow-100 text-yellow-800" };
    return { level: "Low", color: "bg-green-100 text-green-800" };
  };

  const formatTime = (hours: number) => {
    if (hours < 1) return "under 1 hour";
    if (hours < 4) return `${Math.round(hours * 10) / 10} hours`;
    if (hours < 24) return `${Math.round(hours)} hours`;
    return `${Math.round((hours / 24) * 10) / 10} days`;
  };

  const getRecoveryExplanation = (
    avgHours: number,
    earlyHours: number,
    recentHours: number,
    trend: string
  ) => {
    const currentTime = formatTime(avgHours);
    const earlyTime = formatTime(earlyHours);
    const recentTime = formatTime(recentHours);

    // Convert recovery time to effectiveness percentage
    // Formula: Better recovery (less time) = higher percentage
    // 0 hours = 100%, 1 hour = 90%, 2 hours = 80%, etc.
    // Cap at 24 hours = 0%
    const getRecoveryPercentage = (hours: number) => {
      if (hours <= 0) return 100;
      if (hours >= 24) return 0;
      return Math.max(0, Math.round(100 - (hours / 24) * 100));
    };

    const currentPercentage = getRecoveryPercentage(avgHours);
    const earlyPercentage = getRecoveryPercentage(earlyHours);
    const recentPercentage = getRecoveryPercentage(recentHours);

    let trendExplanation = "";
    let changeDescription = "";

    switch (trend) {
      case "improving":
        changeDescription = `improved from ${earlyTime} (${earlyPercentage}%) to ${recentTime} (${recentPercentage}%)`;
        trendExplanation =
          "You're getting better at bouncing back from emotional situations. Keep up the good work!";
        break;
      case "declining":
        changeDescription = `declined from ${earlyTime} (${earlyPercentage}%) to ${recentTime} (${recentPercentage}%)`;
        trendExplanation =
          "Your recovery time has increased recently. Consider practicing more emotional regulation techniques.";
        break;
      default:
        changeDescription = `remained stable around ${currentTime} (${currentPercentage}%)`;
        trendExplanation =
          "Your recovery pattern has been consistent over time.";
    }

    return {
      currentTime,
      earlyTime,
      recentTime,
      currentPercentage,
      earlyPercentage,
      recentPercentage,
      changeDescription,
      trendExplanation,
      fullExplanation: `Your emotional recovery effectiveness ${changeDescription}. ${trendExplanation}`,
      detailedBreakdown: `Earlier period: ${earlyTime} (${earlyPercentage}%) • Recent period: ${recentTime} (${recentPercentage}%) • Current: ${currentTime} (${currentPercentage}%)`,
    };
  };

  const getContagionExplanation = (rate: number, trend: string) => {
    const controlRate = 100 - rate;
    let levelDescription = "";
    if (controlRate >= 70) levelDescription = "excellent";
    else if (controlRate >= 50) levelDescription = "good";
    else if (controlRate >= 30) levelDescription = "moderate";
    else levelDescription = "needs improvement";

    let trendExplanation = "";
    let changeDescription = "";

    switch (trend) {
      case "improving":
        changeDescription = "improving";
        trendExplanation =
          "You're getting better at maintaining emotional boundaries.";
        break;
      case "declining":
        changeDescription = "declining";
        trendExplanation =
          "You've been absorbing others' emotions more frequently lately.";
        break;
      default:
        changeDescription = "stable";
        trendExplanation =
          "Your emotional boundary maintenance has been consistent.";
    }

    return {
      levelDescription,
      controlRate,
      contagionRate: rate,
      changeDescription,
      trendExplanation,
      fullExplanation: `You maintain emotional boundaries in ${controlRate.toFixed(
        1
      )}% of situations (${levelDescription}). Your control is ${changeDescription}. ${trendExplanation}`,
      detailedBreakdown: `Emotional boundaries maintained: ${controlRate.toFixed(
        1
      )}% • Emotional contagion rate: ${rate.toFixed(1)}%`,
    };
  };

  const recoveryExplanation = getRecoveryExplanation(
    insights.avg_recovery_hours,
    insights.early_avg_recovery_hours,
    insights.recent_avg_recovery_hours,
    insights.recovery_trend
  );
  const contagionExplanation = getContagionExplanation(
    insights.emotional_contagion_rate,
    insights.contagion_trend
  );

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Key Metrics Overview
            </CardTitle>
            <CardDescription>
              Your emotional intelligence performance over the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">
                    Emotional Recovery
                  </span>
                  <Tooltip
                    content={
                      <div className="max-w-sm p-2">
                        <p className="font-semibold mb-2">
                          Emotional Recovery Effectiveness
                        </p>
                        <p className="text-sm mb-2">
                          {recoveryExplanation.fullExplanation}
                        </p>
                        <div className="text-xs bg-purple-100 p-2 rounded mb-2">
                          <p className="font-medium">Detailed Breakdown:</p>
                          <p>{recoveryExplanation.detailedBreakdown}</p>
                        </div>
                        <div className="text-xs text-gray-600">
                          <strong>How it&apos;s calculated:</strong> Based on
                          your recovery times converted to effectiveness
                          percentages. Faster recovery (0-1 hours) = 96-100%,
                          slower recovery (6+ hours) = 75% or less.
                        </div>
                      </div>
                    }
                  >
                    <HelpCircle className="h-4 w-4 text-purple-500 cursor-help" />
                  </Tooltip>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {recoveryExplanation.currentPercentage}%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(insights.recovery_trend)}
                  <span
                    className={cn(
                      "text-sm",
                      getTrendColor(insights.recovery_trend)
                    )}
                  >
                    {insights.recovery_trend}
                  </span>
                </div>
                <p className="text-xs text-purple-600 mt-1">
                  {recoveryExplanation.changeDescription}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Contagion Control
                  </span>
                  <Tooltip
                    content={
                      <div className="max-w-sm p-2">
                        <p className="font-semibold mb-2">
                          Emotional Contagion Control
                        </p>
                        <p className="text-sm mb-2">
                          {contagionExplanation.fullExplanation}
                        </p>
                        <div className="text-xs bg-blue-100 p-2 rounded mb-2">
                          <p className="font-medium">Detailed Breakdown:</p>
                          <p>{contagionExplanation.detailedBreakdown}</p>
                        </div>
                        <div className="text-xs text-gray-600">
                          <strong>What this means:</strong> Emotional contagion
                          is when you unconsciously absorb others&apos;
                          emotions. Higher control means you maintain your
                          emotional state despite others&apos; emotions
                          affecting you.
                        </div>
                      </div>
                    }
                  >
                    <HelpCircle className="h-4 w-4 text-blue-500 cursor-help" />
                  </Tooltip>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {contagionExplanation.controlRate.toFixed(1)}%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(insights.contagion_trend)}
                  <span
                    className={cn(
                      "text-sm",
                      getTrendColor(insights.contagion_trend)
                    )}
                  >
                    {insights.contagion_trend}
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {contagionExplanation.levelDescription} control (
                  {contagionExplanation.changeDescription})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Growth Trends
            </CardTitle>
            <CardDescription>
              How your emotional intelligence has evolved over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium">Emotional Recovery</h4>
                    <p className="text-sm text-gray-600">
                      {recoveryExplanation.changeDescription}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {recoveryExplanation.currentPercentage}%
                  </p>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(insights.recovery_trend)}
                    <span
                      className={cn(
                        "text-sm",
                        getTrendColor(insights.recovery_trend)
                      )}
                    >
                      {insights.recovery_trend}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {recoveryExplanation.earlyPercentage}% →{" "}
                    {recoveryExplanation.recentPercentage}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Contagion Control</h4>
                    <p className="text-sm text-gray-600">
                      {contagionExplanation.trendExplanation}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {contagionExplanation.controlRate.toFixed(1)}%
                  </p>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(insights.contagion_trend)}
                    <span
                      className={cn(
                        "text-sm",
                        getTrendColor(insights.contagion_trend)
                      )}
                    >
                      {insights.contagion_trend}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {contagionExplanation.levelDescription} emotional boundaries
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Risk Patterns
            </CardTitle>
            <CardDescription>
              Areas where emotional contagion and recovery challenges occur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-red-800">
                    High Intensity Contagion Risk
                  </h4>
                  <Badge
                    className={
                      getRiskLevel(insights.high_intensity_contagion_risk).color
                    }
                  >
                    {getRiskLevel(insights.high_intensity_contagion_risk).level}{" "}
                    Risk
                  </Badge>
                </div>
                <p className="text-sm text-red-700 mb-3">
                  {insights.high_intensity_contagion_risk}% of high-intensity
                  interactions lead to emotional contagion
                </p>
                <Progress
                  value={insights.high_intensity_contagion_risk}
                  className="h-2"
                />
              </div>

              <div className="p-4 border rounded-lg bg-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-orange-800">
                    Slow Recovery in High Intensity
                  </h4>
                  <Badge
                    className={
                      getRiskLevel(insights.slow_recovery_high_intensity_rate)
                        .color
                    }
                  >
                    {
                      getRiskLevel(insights.slow_recovery_high_intensity_rate)
                        .level
                    }{" "}
                    Risk
                  </Badge>
                </div>
                <p className="text-sm text-orange-700 mb-3">
                  {insights.slow_recovery_high_intensity_rate}% of
                  high-intensity situations result in slow emotional recovery
                </p>
                <Progress
                  value={insights.slow_recovery_high_intensity_rate}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actionable Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Actionable Insights
            </CardTitle>
            <CardDescription>
              Specific recommendations to improve your emotional intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-2">
                  🎯 Primary Improvement Area
                </h4>
                <p className="text-sm text-blue-700 mb-2">
                  <strong>{insights.primary_improvement_area}</strong>
                </p>
                <p className="text-sm text-blue-700">
                  Focus your efforts on this area for the most significant
                  improvement in your emotional intelligence.
                </p>
              </div>

              {insights.high_intensity_contagion_risk > 50 && (
                <div className="p-4 border rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-800 mb-2">
                    ⚠️ High Intensity Management
                  </h4>
                  <p className="text-sm text-red-700">
                    You&apos;re particularly vulnerable to emotional contagion
                    in high-intensity situations. Practice grounding techniques
                    and emotional boundaries before entering potentially intense
                    conversations.
                  </p>
                </div>
              )}

              {insights.slow_recovery_high_intensity_rate > 40 && (
                <div className="p-4 border rounded-lg bg-orange-50">
                  <h4 className="font-medium text-orange-800 mb-2">
                    🔄 Recovery Enhancement
                  </h4>
                  <p className="text-sm text-orange-700">
                    Your emotional recovery is slower after high-intensity
                    interactions. Consider implementing a post-interaction
                    recovery routine with breathing exercises or brief
                    meditation.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}

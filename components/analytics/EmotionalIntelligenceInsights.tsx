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
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Clock,
  Zap,
  Heart,
  Target,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmotionalIntelligenceData {
  user_id: string;
  emotional_contagion_rate: number;
  high_intensity_contagion_rate: number;
  avg_recovery_hours: number;
  early_avg_recovery_hours: number;
  recent_avg_recovery_hours: number;
  early_common_emotions: string[];
  recent_common_emotions: string[];
  work_contagion_rate: number;
  home_contagion_rate: number;
  public_contagion_rate: number;
  morning_contagion_rate: number;
  afternoon_contagion_rate: number;
  evening_contagion_rate: number;
  monday_contagion_rate: number;
  friday_contagion_rate: number;
  low_energy_contagion_rate: number;
  medium_energy_contagion_rate: number;
  high_energy_contagion_rate: number;
  most_effective_regulation_methods: string[];
  avg_emotional_intensity: number;
  contagious_emotional_intensity: number;
  non_contagious_emotional_intensity: number;
  high_intensity_contagion_risk: number;
  slow_recovery_high_intensity_rate: number;
  breathing_regulation_effectiveness: number;
  meditation_recovery_effectiveness: number;
  recovery_trend: string;
  contagion_trend: string;
  primary_improvement_area: string;
}

interface EmotionalIntelligenceInsightsProps {
  data: EmotionalIntelligenceData[];
  isLoading: boolean;
}

export default function EmotionalIntelligenceInsights({
  data,
  isLoading,
}: EmotionalIntelligenceInsightsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Emotional Intelligence Insights</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Emotional Intelligence Insights</CardTitle>
            <CardDescription>No data available</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const userData = data[0];

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

  const getImprovementAreaColor = (area: string) => {
    switch (area) {
      case "needs_recovery_improvement":
        return "text-orange-600 bg-orange-50";
      case "high_contagion_risk":
        return "text-red-600 bg-red-50";
      case "intensity_management_needed":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-green-600 bg-green-50";
    }
  };

  const getImprovementAreaLabel = (area: string) => {
    switch (area) {
      case "needs_recovery_improvement":
        return "Recovery Skills";
      case "high_contagion_risk":
        return "Emotional Boundaries";
      case "intensity_management_needed":
        return "Intensity Control";
      default:
        return "Good Control";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Emotional Intelligence Dashboard
          </CardTitle>
          <CardDescription>
            Advanced analysis of emotional patterns, recovery times, and
            contagion effects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {userData.emotional_contagion_rate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                Emotional Contagion Rate
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {userData.avg_recovery_hours.toFixed(1)}h
              </p>
              <p className="text-sm text-muted-foreground">Avg Recovery Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {userData.avg_emotional_intensity.toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">
                Avg Emotional Intensity
              </p>
            </div>
            <div className="text-center">
              <Badge
                className={cn(
                  "text-sm",
                  getImprovementAreaColor(userData.primary_improvement_area)
                )}
              >
                {getImprovementAreaLabel(userData.primary_improvement_area)}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">Focus Area</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Trends */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recovery Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {getTrendIcon(userData.recovery_trend)}
              <span
                className={cn(
                  "font-medium",
                  getTrendColor(userData.recovery_trend)
                )}
              >
                {userData.recovery_trend.charAt(0).toUpperCase() +
                  userData.recovery_trend.slice(1)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Early Period: {userData.early_avg_recovery_hours.toFixed(1)}h
                </span>
                <span>
                  Recent Period: {userData.recent_avg_recovery_hours.toFixed(1)}
                  h
                </span>
              </div>
              <Progress
                value={Math.min(
                  100,
                  (userData.recent_avg_recovery_hours / 6) * 100
                )}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Contagion Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {getTrendIcon(userData.contagion_trend)}
              <span
                className={cn(
                  "font-medium",
                  getTrendColor(userData.contagion_trend)
                )}
              >
                {userData.contagion_trend.charAt(0).toUpperCase() +
                  userData.contagion_trend.slice(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {userData.contagion_trend === "improving"
                ? "You&apos;re becoming less emotionally contagious"
                : userData.contagion_trend === "declining"
                ? "You&apos;re becoming more emotionally contagious"
                : "Your emotional contagion is stable"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            Risk Patterns
          </CardTitle>
          <CardDescription>
            High-risk emotional patterns that need attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="font-medium">High Intensity Contagion</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {userData.high_intensity_contagion_risk.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                When intensity ≥7 and contagious
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Slow Recovery</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {userData.slow_recovery_high_intensity_rate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                High intensity + slow recovery
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Regulation Effectiveness</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {userData.breathing_regulation_effectiveness.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                Deep breathing success rate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context-Specific Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Environment Impact</CardTitle>
            <CardDescription>Emotional contagion by setting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Work</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.work_contagion_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.work_contagion_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Home</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.home_contagion_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.home_contagion_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Public</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.public_contagion_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.public_contagion_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Patterns</CardTitle>
            <CardDescription>Emotional vulnerability by time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Morning</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.morning_contagion_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.morning_contagion_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Afternoon</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.afternoon_contagion_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.afternoon_contagion_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Evening</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.evening_contagion_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.evening_contagion_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            Actionable Insights
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.primary_improvement_area ===
              "needs_recovery_improvement" && (
              <div className="p-3 border rounded-lg bg-orange-50">
                <h4 className="font-medium text-orange-800 mb-2">
                  Focus on Recovery Skills
                </h4>
                <p className="text-sm text-orange-700">
                  Your average recovery time is{" "}
                  {userData.avg_recovery_hours.toFixed(1)} hours. Consider
                  practicing{" "}
                  {userData.most_effective_regulation_methods.join(", ")} more
                  frequently.
                </p>
              </div>
            )}

            {userData.primary_improvement_area === "high_contagion_risk" && (
              <div className="p-3 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">
                  Strengthen Emotional Boundaries
                </h4>
                <p className="text-sm text-red-700">
                  You&apos;re emotionally contagious{" "}
                  {userData.emotional_contagion_rate.toFixed(1)}% of the time.
                  Focus on maintaining emotional distance during high-intensity
                  situations.
                </p>
              </div>
            )}

            {userData.primary_improvement_area ===
              "intensity_management_needed" && (
              <div className="p-3 border rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-800 mb-2">
                  Manage Emotional Intensity
                </h4>
                <p className="text-sm text-yellow-700">
                  Your high-intensity contagion rate is{" "}
                  {userData.high_intensity_contagion_rate.toFixed(1)}%. Practice
                  intensity regulation techniques before important interactions.
                </p>
              </div>
            )}

            {userData.primary_improvement_area === "good_emotional_control" && (
              <div className="p-3 border rounded-lg bg-green-50">
                <h4 className="font-medium text-green-800 mb-2">
                  Excellent Emotional Control
                </h4>
                <p className="text-sm text-green-700">
                  You&apos;re demonstrating strong emotional intelligence. Keep
                  practicing your effective regulation methods:{" "}
                  {userData.most_effective_regulation_methods.join(", ")}.
                </p>
              </div>
            )}

            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Most Effective Methods
                </h4>
                <div className="flex flex-wrap gap-1">
                  {userData.most_effective_regulation_methods.map((method) => (
                    <Badge key={method} variant="secondary">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Emotional Evolution
                </h4>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Early Period: {userData.early_common_emotions.join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Recent Period: {userData.recent_common_emotions.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

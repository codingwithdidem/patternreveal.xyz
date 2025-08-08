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
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Heart,
  Target,
  Users,
  Lightbulb,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RelationshipHealthData {
  user_id: string;
  overall_boundary_success_rate: number;
  work_boundary_success_rate: number;
  home_boundary_success_rate: number;
  public_boundary_success_rate: number;
  assertive_boundary_success_rate: number;
  empathetic_boundary_success_rate: number;
  passive_boundary_success_rate: number;
  overall_resolution_rate: number;
  collaborative_resolution_rate: number;
  compromising_resolution_rate: number;
  avoidant_resolution_rate: number;
  accommodating_resolution_rate: number;
  most_common_trust_levels: string[];
  avg_trust_score: number;
  work_high_trust_rate: number;
  home_high_trust_rate: number;
  public_high_trust_rate: number;
  most_common_intimacy_levels: string[];
  avg_intimacy_score: number;
  most_common_initiators: string[];
  most_common_controllers: string[];
  shared_power_rate: number;
  my_control_rate: number;
  their_control_rate: number;
  most_common_decision_styles: string[];
  consensus_resolution_rate: number;
  consultative_resolution_rate: number;
  delegated_resolution_rate: number;
  imposed_resolution_rate: number;
  most_common_listening_styles: string[];
  deep_listening_resolution_rate: number;
  active_listening_resolution_rate: number;
  empathetic_listening_resolution_rate: number;
  poor_listening_resolution_rate: number;
  most_common_effort_balances: string[];
  balanced_effort_resolution_rate: number;
  unbalanced_effort_resolution_rate: number;
  high_health_resolution_rate: number;
  high_health_boundary_rate: number;
  most_common_confidence_levels: string[];
  high_confidence_resolution_rate: number;
  medium_confidence_resolution_rate: number;
  low_confidence_resolution_rate: number;
  boundary_violation_power_imbalance_rate: number;
  poor_listening_failure_rate: number;
  low_trust_superficial_intimacy_rate: number;
  unbalanced_effort_failure_rate: number;
  boundary_trend: string;
  resolution_trend: string;
  primary_improvement_area: string;
  relationship_health_score: number;
}

interface RelationshipHealthInsightsProps {
  data: RelationshipHealthData[];
  isLoading: boolean;
}

export default function RelationshipHealthInsights({
  data,
  isLoading,
}: RelationshipHealthInsightsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Relationship Health Insights</CardTitle>
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
            <CardTitle>Relationship Health Insights</CardTitle>
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

  const getHealthLevel = (score: number) => {
    if (score >= 80)
      return { level: "Excellent", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 60)
      return { level: "Good", color: "text-blue-600", bg: "bg-blue-50" };
    if (score >= 40)
      return { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { level: "Poor", color: "text-red-600", bg: "bg-red-50" };
  };

  const getImprovementAreaColor = (area: string) => {
    switch (area) {
      case "boundary_work_needed":
        return "text-orange-600 bg-orange-50";
      case "resolution_skills_needed":
        return "text-red-600 bg-red-50";
      case "trust_building_needed":
        return "text-yellow-600 bg-yellow-50";
      case "power_balance_improvement":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-green-600 bg-green-50";
    }
  };

  const getImprovementAreaLabel = (area: string) => {
    switch (area) {
      case "boundary_work_needed":
        return "Boundary Skills";
      case "resolution_skills_needed":
        return "Resolution Skills";
      case "trust_building_needed":
        return "Trust Building";
      case "power_balance_improvement":
        return "Power Balance";
      default:
        return "Healthy Patterns";
    }
  };

  const healthLevel = getHealthLevel(userData.relationship_health_score);

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Relationship Health Dashboard
          </CardTitle>
          <CardDescription>
            Advanced analysis of boundary success, trust dynamics, and
            communication effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {userData.overall_boundary_success_rate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                Boundary Success Rate
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {userData.overall_resolution_rate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                Resolution Success Rate
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {userData.avg_trust_score.toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Trust Score</p>
            </div>
            <div className="text-center">
              <Badge
                className={cn("text-sm", healthLevel.bg, healthLevel.color)}
              >
                {healthLevel.level}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Health Score: {userData.relationship_health_score.toFixed(1)}
              </p>
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
              Boundary Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {getTrendIcon(userData.boundary_trend)}
              <span
                className={cn(
                  "font-medium",
                  getTrendColor(userData.boundary_trend)
                )}
              >
                {userData.boundary_trend.charAt(0).toUpperCase() +
                  userData.boundary_trend.slice(1)}
              </span>
            </div>
            <Progress
              value={userData.overall_boundary_success_rate}
              className="h-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {userData.boundary_trend === "improving"
                ? "Your boundary maintenance is improving"
                : userData.boundary_trend === "declining"
                ? "Your boundary maintenance needs attention"
                : "Your boundary maintenance is stable"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Resolution Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {getTrendIcon(userData.resolution_trend)}
              <span
                className={cn(
                  "font-medium",
                  getTrendColor(userData.resolution_trend)
                )}
              >
                {userData.resolution_trend.charAt(0).toUpperCase() +
                  userData.resolution_trend.slice(1)}
              </span>
            </div>
            <Progress
              value={userData.overall_resolution_rate}
              className="h-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {userData.resolution_trend === "improving"
                ? "Your conflict resolution is improving"
                : userData.resolution_trend === "declining"
                ? "Your conflict resolution needs work"
                : "Your conflict resolution is stable"}
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
            High-risk relationship patterns that need attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="font-medium">Boundary Violations</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {userData.boundary_violation_power_imbalance_rate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                When boundaries fail + power imbalance
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Poor Listening</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {userData.poor_listening_failure_rate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                Poor listening + failed resolutions
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Trust Issues</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {userData.low_trust_superficial_intimacy_rate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                Low trust + superficial intimacy
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Effort Imbalance</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {userData.unbalanced_effort_failure_rate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                Unbalanced effort + failed resolutions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power Dynamics & Trust */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Power Dynamics</CardTitle>
            <CardDescription>
              Control and decision-making patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Shared Power</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.shared_power_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.shared_power_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">My Control</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.my_control_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.my_control_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Their Control</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.their_control_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.their_control_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Most Common Decision Styles
              </h4>
              <div className="flex flex-wrap gap-1">
                {userData.most_common_decision_styles.map((style) => (
                  <Badge key={style} variant="secondary">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trust & Intimacy</CardTitle>
            <CardDescription>
              Relationship depth and trust levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Work High Trust</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.work_high_trust_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.work_high_trust_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Home High Trust</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.home_high_trust_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.home_high_trust_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Public High Trust</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={userData.public_high_trust_rate}
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium">
                    {userData.public_high_trust_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Most Common Intimacy Levels
              </h4>
              <div className="flex flex-wrap gap-1">
                {userData.most_common_intimacy_levels.map((level) => (
                  <Badge key={level} variant="secondary">
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communication Effectiveness */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Effectiveness</CardTitle>
          <CardDescription>
            Listening styles and their impact on resolution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">
                {userData.deep_listening_resolution_rate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Deep Listening</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">
                {userData.active_listening_resolution_rate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Active Listening</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-600">
                {userData.empathetic_listening_resolution_rate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                Empathetic Listening
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-red-600">
                {userData.poor_listening_resolution_rate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Poor Listening</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">
              Most Common Listening Styles
            </h4>
            <div className="flex flex-wrap gap-1">
              {userData.most_common_listening_styles.map((style) => (
                <Badge key={style} variant="secondary">
                  {style}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            Actionable Insights
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your relationship patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.primary_improvement_area === "boundary_work_needed" && (
              <div className="p-3 border rounded-lg bg-orange-50">
                <h4 className="font-medium text-orange-800 mb-2">
                  Focus on Boundary Skills
                </h4>
                <p className="text-sm text-orange-700">
                  Your boundary success rate is{" "}
                  {userData.overall_boundary_success_rate.toFixed(1)}%. Practice
                  assertive communication and maintain clear boundaries,
                  especially in{" "}
                  {userData.work_boundary_success_rate <
                  userData.home_boundary_success_rate
                    ? "work"
                    : "home"}{" "}
                  settings.
                </p>
              </div>
            )}

            {userData.primary_improvement_area ===
              "resolution_skills_needed" && (
              <div className="p-3 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">
                  Improve Resolution Skills
                </h4>
                <p className="text-sm text-red-700">
                  Your resolution success rate is{" "}
                  {userData.overall_resolution_rate.toFixed(1)}%. Focus on
                  collaborative approaches and improve your listening skills,
                  particularly {userData.most_common_listening_styles[0]}.
                </p>
              </div>
            )}

            {userData.primary_improvement_area === "trust_building_needed" && (
              <div className="p-3 border rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-800 mb-2">
                  Build Trust
                </h4>
                <p className="text-sm text-yellow-700">
                  Your average trust score is{" "}
                  {userData.avg_trust_score.toFixed(1)}. Work on building deeper
                  connections and maintaining consistency in your interactions.
                </p>
              </div>
            )}

            {userData.primary_improvement_area ===
              "power_balance_improvement" && (
              <div className="p-3 border rounded-lg bg-purple-50">
                <h4 className="font-medium text-purple-800 mb-2">
                  Balance Power Dynamics
                </h4>
                <p className="text-sm text-purple-700">
                  Your shared power rate is{" "}
                  {userData.shared_power_rate.toFixed(1)}%. Work toward more
                  balanced decision-making and shared control in your
                  relationships.
                </p>
              </div>
            )}

            {userData.primary_improvement_area ===
              "healthy_relationship_patterns" && (
              <div className="p-3 border rounded-lg bg-green-50">
                <h4 className="font-medium text-green-800 mb-2">
                  Excellent Relationship Health
                </h4>
                <p className="text-sm text-green-700">
                  You&apos;re demonstrating healthy relationship patterns with a
                  score of {userData.relationship_health_score.toFixed(1)}. Keep
                  practicing your effective communication and boundary
                  maintenance.
                </p>
              </div>
            )}

            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Most Common Trust Levels
                </h4>
                <div className="flex flex-wrap gap-1">
                  {userData.most_common_trust_levels.map((level) => (
                    <Badge key={level} variant="secondary">
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Most Common Effort Balances
                </h4>
                <div className="flex flex-wrap gap-1">
                  {userData.most_common_effort_balances.map((balance) => (
                    <Badge key={balance} variant="secondary">
                      {balance}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Users,
  Zap,
  Target,
  Activity,
  Shield,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import type { RelationshipHealthData } from "./RelationshipHealthInsights";

interface RelationshipHealthTabProps {
  workspaceId?: string;
  daysFilter: string;
  selectedUserId?: string;
}

export default function RelationshipHealthTab({
  workspaceId,
  daysFilter,
  selectedUserId,
}: RelationshipHealthTabProps) {
  // Fetch relationship health data
  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    workspaceId
      ? `/api/analytics/patterns?type=relationship_health&days_filter=${daysFilter}&workspaceId=${workspaceId}${
          selectedUserId ? `&user_id=${selectedUserId}` : ""
        }`
      : null,
    fetcher
  );

  const data = result?.data as RelationshipHealthData[];
  const hasError = !!error;
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Relationship Health</CardTitle>
            <CardDescription>
              Loading relationship health insights...
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
            <CardTitle>Relationship Health</CardTitle>
            <CardDescription>
              Unable to load relationship health data.
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

  const getHealthScore = (score: number) => {
    if (score >= 80)
      return { level: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 60)
      return { level: "Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 40)
      return { level: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { level: "Poor", color: "bg-red-100 text-red-800" };
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" />
            Key Metrics Overview
          </CardTitle>
          <CardDescription>
            Your relationship health performance over the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg bg-pink-50">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-pink-600" />
                <span className="font-medium text-pink-800">
                  Overall Health Score
                </span>
              </div>
              <p className="text-2xl font-bold text-pink-600">
                {insights.relationship_health_score}%
              </p>
              <Badge
                className={
                  getHealthScore(insights.relationship_health_score).color
                }
              >
                {getHealthScore(insights.relationship_health_score).level}
              </Badge>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">
                  Boundary Management
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {100 - insights.boundary_violation_power_imbalance_rate}%
              </p>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(insights.boundary_trend)}
                <span
                  className={cn(
                    "text-sm",
                    getTrendColor(insights.boundary_trend)
                  )}
                >
                  {insights.boundary_trend}
                </span>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">
                  Communication Quality
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {100 - insights.poor_listening_failure_rate}%
              </p>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(insights.resolution_trend)}
                <span
                  className={cn(
                    "text-sm",
                    getTrendColor(insights.resolution_trend)
                  )}
                >
                  {insights.resolution_trend}
                </span>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">
                  Trust & Intimacy
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {100 - insights.low_trust_superficial_intimacy_rate}%
              </p>
              <p className="text-sm text-purple-700">Trust building</p>
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
            How your relationship health has evolved over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Boundary Management</h4>
                  <p className="text-sm text-gray-600">
                    Your ability to maintain healthy boundaries
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {100 - insights.boundary_violation_power_imbalance_rate}%
                </p>
                <div className="flex items-center gap-1">
                  {getTrendIcon(insights.boundary_trend)}
                  <span
                    className={cn(
                      "text-sm",
                      getTrendColor(insights.boundary_trend)
                    )}
                  >
                    {insights.boundary_trend}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">Conflict Resolution</h4>
                  <p className="text-sm text-gray-600">
                    Your ability to resolve conflicts effectively
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {100 - insights.poor_listening_failure_rate}%
                </p>
                <div className="flex items-center gap-1">
                  {getTrendIcon(insights.resolution_trend)}
                  <span
                    className={cn(
                      "text-sm",
                      getTrendColor(insights.resolution_trend)
                    )}
                  >
                    {insights.resolution_trend}
                  </span>
                </div>
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
            Areas where relationship health challenges occur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-red-800">
                  Boundary Violations & Power Imbalance
                </h4>
                <Badge variant="destructive">High Risk</Badge>
              </div>
              <p className="text-sm text-red-700 mb-3">
                {insights.boundary_violation_power_imbalance_rate}% of
                interactions involve boundary violations or power imbalances
              </p>
              <Progress
                value={insights.boundary_violation_power_imbalance_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-orange-800">
                  Poor Listening & Communication
                </h4>
                <Badge className="bg-orange-100 text-orange-800">
                  Medium Risk
                </Badge>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                {insights.poor_listening_failure_rate}% of interactions suffer
                from poor listening or communication
              </p>
              <Progress
                value={insights.poor_listening_failure_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-yellow-800">
                  Low Trust & Superficial Intimacy
                </h4>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Medium Risk
                </Badge>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                {insights.low_trust_superficial_intimacy_rate}% of interactions
                lack trust or involve superficial intimacy
              </p>
              <Progress
                value={insights.low_trust_superficial_intimacy_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-800">Unbalanced Effort</h4>
                <Badge className="bg-blue-100 text-blue-800">Low Risk</Badge>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                {insights.unbalanced_effort_failure_rate}% of interactions
                involve unbalanced effort between parties
              </p>
              <Progress
                value={insights.unbalanced_effort_failure_rate}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power Dynamics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Power Dynamics
          </CardTitle>
          <CardDescription>
            Analysis of power distribution in your relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                Boundary Violations
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Frequency of boundary violations in power dynamics
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={insights.boundary_violation_power_imbalance_rate}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {insights.boundary_violation_power_imbalance_rate}%
                </span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-600" />
                Communication Quality
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Effectiveness of listening and communication
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={insights.poor_listening_failure_rate}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {insights.poor_listening_failure_rate}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust & Intimacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" />
            Trust & Intimacy
          </CardTitle>
          <CardDescription>
            Analysis of trust building and intimacy levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Trust Building
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Level of trust and depth of intimacy in relationships
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={insights.low_trust_superficial_intimacy_rate}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {insights.low_trust_superficial_intimacy_rate}%
                </span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-600" />
                Effort Balance
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Balance of effort between relationship partners
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={insights.unbalanced_effort_failure_rate}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {insights.unbalanced_effort_failure_rate}%
                </span>
              </div>
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
            Specific recommendations to improve your relationship health
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
                improvement in your relationship health.
              </p>
            </div>

            {insights.boundary_violation_power_imbalance_rate > 30 && (
              <div className="p-4 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">
                  🛡️ Strengthen Boundaries
                </h4>
                <p className="text-sm text-red-700">
                  You&apos;re experiencing boundary violations in{" "}
                  {insights.boundary_violation_power_imbalance_rate}% of
                  interactions. Practice setting clear boundaries and
                  maintaining them consistently. Consider what you&apos;re
                  willing to accept and what you&apos;re not, then communicate
                  these clearly.
                </p>
              </div>
            )}

            {insights.poor_listening_failure_rate > 25 && (
              <div className="p-4 border rounded-lg bg-orange-50">
                <h4 className="font-medium text-orange-800 mb-2">
                  👂 Improve Active Listening
                </h4>
                <p className="text-sm text-orange-700">
                  Communication issues are affecting{" "}
                  {insights.poor_listening_failure_rate}% of your interactions.
                  Practice active listening techniques: maintain eye contact,
                  ask clarifying questions, and reflect back what you&apos;ve
                  heard before responding.
                </p>
              </div>
            )}

            {insights.low_trust_superficial_intimacy_rate > 40 && (
              <div className="p-4 border rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-800 mb-2">
                  💝 Build Deeper Trust
                </h4>
                <p className="text-sm text-yellow-700">
                  Trust and intimacy issues are present in{" "}
                  {insights.low_trust_superficial_intimacy_rate}% of
                  interactions. Work on vulnerability and authenticity. Share
                  your thoughts and feelings more openly, and create safe spaces
                  for others to do the same.
                </p>
              </div>
            )}

            {insights.unbalanced_effort_failure_rate > 35 && (
              <div className="p-4 border rounded-lg bg-purple-50">
                <h4 className="font-medium text-purple-800 mb-2">
                  ⚖️ Balance Relationship Effort
                </h4>
                <p className="text-sm text-purple-700">
                  Effort imbalance is affecting{" "}
                  {insights.unbalanced_effort_failure_rate}% of your
                  relationships. Evaluate whether you&apos;re giving too much or
                  too little. Healthy relationships require mutual effort and
                  reciprocity.
                </p>
              </div>
            )}

            {insights.relationship_health_score < 60 && (
              <div className="p-4 border rounded-lg bg-indigo-50">
                <h4 className="font-medium text-indigo-800 mb-2">
                  🔧 Overall Relationship Health
                </h4>
                <p className="text-sm text-indigo-700">
                  Your overall relationship health score is{" "}
                  {insights.relationship_health_score}%. Consider working with a
                  relationship coach or therapist to develop healthier patterns
                  and improve your relationship skills.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

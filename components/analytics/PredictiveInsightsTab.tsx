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
  CheckCircle,
  Target,
  Zap,
  Clock,
  Calendar,
  Activity,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import type { PredictiveData } from "./PredictiveInsights";

interface PredictiveInsightsTabProps {
  workspaceId?: string;
  daysFilter: string;
  selectedUserId?: string;
}

export default function PredictiveInsightsTab({
  workspaceId,
  daysFilter,
  selectedUserId,
}: PredictiveInsightsTabProps) {
  // Fetch predictive insights data
  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    workspaceId
      ? `/api/analytics/patterns?type=predictive&days_filter=${daysFilter}&workspaceId=${workspaceId}${
          selectedUserId ? `&user_id=${selectedUserId}` : ""
        }`
      : null,
    fetcher
  );

  const data = result?.data as PredictiveData[];
  const hasError = !!error;
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Predictive Insights</CardTitle>
            <CardDescription>Loading predictive insights...</CardDescription>
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
            <CardTitle>Predictive Insights</CardTitle>
            <CardDescription>
              Unable to load predictive insights data.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const insights = data[0];

  const getSuccessLevel = (rate: number) => {
    if (rate >= 80)
      return { level: "Excellent", color: "bg-green-100 text-green-800" };
    if (rate >= 60)
      return { level: "Good", color: "bg-blue-100 text-blue-800" };
    if (rate >= 40)
      return { level: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { level: "Poor", color: "bg-red-100 text-red-800" };
  };

  const getRiskLevel = (rate: number) => {
    if (rate >= 70) return { level: "High", color: "bg-red-100 text-red-800" };
    if (rate >= 40)
      return { level: "Medium", color: "bg-yellow-100 text-yellow-800" };
    return { level: "Low", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="space-y-6">
      {/* Success Predictors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Success Predictors
          </CardTitle>
          <CardDescription>
            Conditions that lead to successful relationship outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-800">
                  Consensus Decision Making
                </h4>
                <Badge
                  className={
                    getSuccessLevel(insights.consensus_success_rate).color
                  }
                >
                  {getSuccessLevel(insights.consensus_success_rate).level}
                </Badge>
              </div>
              <p className="text-sm text-green-700 mb-3">
                {insights.consensus_success_rate}% success rate when using
                consensus decision-making
              </p>
              <Progress
                value={insights.consensus_success_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-800">
                  Assertive Approach
                </h4>
                <Badge
                  className={
                    getSuccessLevel(insights.assertive_success_rate).color
                  }
                >
                  {getSuccessLevel(insights.assertive_success_rate).level}
                </Badge>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                {insights.assertive_success_rate}% success rate when being
                assertive
              </p>
              <Progress
                value={insights.assertive_success_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-purple-800">
                  Empathetic Approach
                </h4>
                <Badge
                  className={
                    getSuccessLevel(insights.empathetic_success_rate).color
                  }
                >
                  {getSuccessLevel(insights.empathetic_success_rate).level}
                </Badge>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                {insights.empathetic_success_rate}% success rate when being
                empathetic
              </p>
              <Progress
                value={insights.empathetic_success_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-orange-800">
                  High Confidence + Assertiveness
                </h4>
                <Badge
                  className={
                    getSuccessLevel(
                      insights.high_confidence_assertive_success_rate
                    ).color
                  }
                >
                  {
                    getSuccessLevel(
                      insights.high_confidence_assertive_success_rate
                    ).level
                  }
                </Badge>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                {insights.high_confidence_assertive_success_rate}% success rate
                when you&apos;re confident and assertive
              </p>
              <Progress
                value={insights.high_confidence_assertive_success_rate}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Red Flag Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Red Flag Detection
          </CardTitle>
          <CardDescription>
            High-risk conditions that often lead to relationship failures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-red-800">
                  High Risk: Low Energy + High Intensity
                </h4>
                <Badge variant="destructive">High Risk</Badge>
              </div>
              <p className="text-sm text-red-700 mb-3">
                {insights.high_risk_low_energy_high_intensity_rate}% failure
                rate when you have low energy but the situation is high
                intensity
              </p>
              <Progress
                value={insights.high_risk_low_energy_high_intensity_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-orange-800">
                  High Risk: No Boundaries + Their Control
                </h4>
                <Badge className="bg-orange-100 text-orange-800">
                  High Risk
                </Badge>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                {insights.high_risk_no_boundaries_their_control_rate}% failure
                rate when you have no boundaries and they control the situation
              </p>
              <Progress
                value={insights.high_risk_no_boundaries_their_control_rate}
                className="h-2"
              />
            </div>

            <div className="p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-yellow-800">
                  High Risk: Poor Listening + Passive
                </h4>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Medium Risk
                </Badge>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                {insights.high_risk_poor_listening_passive_rate}% failure rate
                when you&apos;re not listening well and being passive
              </p>
              <Progress
                value={insights.high_risk_poor_listening_passive_rate}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimal Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Optimal Conditions
          </CardTitle>
          <CardDescription>
            The best conditions for successful relationship interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                Optimal Timing
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Success rate based on timing conditions
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={insights.optimal_timing_success_rate}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {insights.optimal_timing_success_rate}%
                </span>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600" />
                Optimal Duration
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Success rate based on interaction duration
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={insights.optimal_home_duration_success_rate}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {insights.optimal_home_duration_success_rate}%
                </span>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                Balanced Conditions
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Success rate when all conditions are balanced
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={insights.optimal_balanced_conditions_success_rate}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {insights.optimal_balanced_conditions_success_rate}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Probability Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-600" />
            Success Probability Calculator
          </CardTitle>
          <CardDescription>
            Based on current conditions, here&apos;s your predicted success
            probability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-6 border rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-indigo-800 mb-2">
                  {insights.predicted_success_probability}%
                </h3>
                <p className="text-indigo-700 font-medium">
                  Predicted Success Probability
                </p>
                <p className="text-sm text-indigo-600 mt-2">
                  Based on your current patterns and conditions
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-800 mb-2">
                🎯 Recommended Approach
              </h4>
              <p className="text-sm text-blue-700 mb-2">
                <strong>{insights.recommended_approach}</strong>
              </p>
              <p className="text-sm text-blue-700">
                This approach has the highest probability of success based on
                your patterns.
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <h4 className="font-medium text-orange-800 mb-2">
                ⚠️ Primary Risk Mitigation
              </h4>
              <p className="text-sm text-orange-700 mb-2">
                <strong>{insights.primary_risk_mitigation}</strong>
              </p>
              <p className="text-sm text-orange-700">
                Focus on this area to reduce the risk of negative outcomes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Actionable Insights
          </CardTitle>
          <CardDescription>
            Specific recommendations to improve your success probability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.low_intensity_good_listening_success_rate > 70 && (
              <div className="p-4 border rounded-lg bg-green-50">
                <h4 className="font-medium text-green-800 mb-2">
                  ✅ Your Strength: Low Intensity + Listening
                </h4>
                <p className="text-sm text-green-700">
                  You excel when situations are calm and you practice active
                  listening. Leverage this strength by choosing the right timing
                  for important conversations.
                </p>
              </div>
            )}

            {insights.balanced_power_boundaries_success_rate > 65 && (
              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-2">
                  ✅ Your Strength: Balanced Power Dynamics
                </h4>
                <p className="text-sm text-blue-700">
                  You succeed when power is balanced and boundaries are clear.
                  Continue to advocate for equal footing in your relationships.
                </p>
              </div>
            )}

            {insights.high_risk_low_energy_high_intensity_rate > 50 && (
              <div className="p-4 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">
                  ⚠️ High Risk: Low Energy + High Intensity
                </h4>
                <p className="text-sm text-red-700">
                  You&apos;re vulnerable when tired and situations are intense.
                  Postpone important conversations when you&apos;re low on
                  energy, or take time to recharge before engaging.
                </p>
              </div>
            )}

            {insights.high_risk_no_boundaries_their_control_rate > 40 && (
              <div className="p-4 border rounded-lg bg-orange-50">
                <h4 className="font-medium text-orange-800 mb-2">
                  ⚠️ High Risk: No Boundaries + Their Control
                </h4>
                <p className="text-sm text-orange-700">
                  You struggle when boundaries are unclear and others control
                  the situation. Practice setting clear boundaries and
                  maintaining your autonomy.
                </p>
              </div>
            )}

            {insights.predicted_success_probability < 60 && (
              <div className="p-4 border rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-800 mb-2">
                  📈 Improve Success Probability
                </h4>
                <p className="text-sm text-yellow-700">
                  Your current success probability is{" "}
                  {insights.predicted_success_probability}%. Focus on the
                  recommended approach and risk mitigation strategies to improve
                  your outcomes.
                </p>
              </div>
            )}

            {insights.predicted_success_probability >= 80 && (
              <div className="p-4 border rounded-lg bg-green-50">
                <h4 className="font-medium text-green-800 mb-2">
                  🎉 Excellent Success Probability
                </h4>
                <p className="text-sm text-green-700">
                  Your success probability is{" "}
                  {insights.predicted_success_probability}%! You&apos;re in a
                  great position. Continue with your current approach and
                  patterns.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

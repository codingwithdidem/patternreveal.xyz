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
  Lightbulb,
  AlertTriangle,
  Clock,
  Calendar,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PredictiveData {
  user_id: string;
  consensus_success_rate: number;
  imposed_success_rate: number;
  delegated_success_rate: number;
  consultative_success_rate: number;
  red_flag_high_intensity_mismatched_energy_rate: number;
  red_flag_high_intensity_poor_listening_rate: number;
  red_flag_low_confidence_avoidant_rate: number;
  red_flag_no_boundaries_their_control_rate: number;
  monday_success_rate: number;
  tuesday_success_rate: number;
  wednesday_success_rate: number;
  thursday_success_rate: number;
  friday_success_rate: number;
  saturday_success_rate: number;
  sunday_success_rate: number;
  morning_success_rate: number;
  afternoon_success_rate: number;
  evening_success_rate: number;
  high_high_energy_success_rate: number;
  medium_medium_energy_success_rate: number;
  low_low_energy_success_rate: number;
  high_low_energy_success_rate: number;
  low_high_energy_success_rate: number;
  work_success_rate: number;
  home_success_rate: number;
  public_success_rate: number;
  virtual_success_rate: number;
  restaurant_success_rate: number;
  outdoors_success_rate: number;
  assertive_success_rate: number;
  empathetic_success_rate: number;
  passive_success_rate: number;
  enthusiastic_success_rate: number;
  supportive_success_rate: number;
  questioning_success_rate: number;
  withdrawn_success_rate: number;
  short_duration_success_rate: number;
  medium_duration_success_rate: number;
  long_duration_success_rate: number;
  excellent_health_success_rate: number;
  good_health_success_rate: number;
  moderate_health_success_rate: number;
  poor_health_success_rate: number;
  high_confidence_success_rate: number;
  medium_confidence_success_rate: number;
  low_confidence_success_rate: number;
  very_high_trust_success_rate: number;
  high_trust_success_rate: number;
  medium_trust_success_rate: number;
  low_trust_success_rate: number;
}

interface Props {
  data: PredictiveData[];
  isLoading?: boolean;
}

export default function PredictiveInsights({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Predictive Insights
          </CardTitle>
          <CardDescription>
            Success predictors, red flags, and optimal timing patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No predictive data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const userData = data[0]; // For now, show first user's data

  const getSuccessLevel = (rate: number) => {
    if (rate >= 80)
      return { level: "Excellent", color: "text-green-600", bg: "bg-green-50" };
    if (rate >= 60)
      return { level: "Good", color: "text-blue-600", bg: "bg-blue-50" };
    if (rate >= 40)
      return { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { level: "Poor", color: "text-red-600", bg: "bg-red-50" };
  };

  const getRedFlagLevel = (rate: number) => {
    if (rate >= 50)
      return { level: "High Risk", color: "text-red-600", bg: "bg-red-50" };
    if (rate >= 25)
      return {
        level: "Medium Risk",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    return { level: "Low Risk", color: "text-green-600", bg: "bg-green-50" };
  };

  // Find best and worst performing patterns
  const decisionStyles = [
    { name: "Consensus", rate: userData.consensus_success_rate },
    { name: "Imposed", rate: userData.imposed_success_rate },
    { name: "Delegated", rate: userData.delegated_success_rate },
    { name: "Consultative", rate: userData.consultative_success_rate },
  ];

  const bestDecisionStyle = decisionStyles.reduce((best, current) =>
    current.rate > best.rate ? current : best
  );

  const worstDecisionStyle = decisionStyles.reduce((worst, current) =>
    current.rate < worst.rate ? current : worst
  );

  const daySuccessRates = [
    { name: "Monday", rate: userData.monday_success_rate },
    { name: "Tuesday", rate: userData.tuesday_success_rate },
    { name: "Wednesday", rate: userData.wednesday_success_rate },
    { name: "Thursday", rate: userData.thursday_success_rate },
    { name: "Friday", rate: userData.friday_success_rate },
    { name: "Saturday", rate: userData.saturday_success_rate },
    { name: "Sunday", rate: userData.sunday_success_rate },
  ];

  const bestDay = daySuccessRates.reduce((best, current) =>
    current.rate > best.rate ? current : best
  );

  const worstDay = daySuccessRates.reduce((worst, current) =>
    current.rate < worst.rate ? current : worst
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Predictive Insights
          </CardTitle>
          <CardDescription>
            Success predictors, red flags, and optimal timing patterns for
            better outcomes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Success Predictors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Success Predictors
              </CardTitle>
              <CardDescription>
                Patterns that lead to the highest success rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800">
                      Best Decision Style
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {bestDecisionStyle.name}
                  </p>
                  <p className="text-sm text-green-700">
                    {bestDecisionStyle.rate.toFixed(1)}% success rate
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-red-50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-800">
                      Avoid This Style
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    {worstDecisionStyle.name}
                  </p>
                  <p className="text-sm text-red-700">
                    {worstDecisionStyle.rate.toFixed(1)}% success rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Red Flag Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Red Flag Patterns
              </CardTitle>
              <CardDescription>
                Combinations that predict failure - avoid these patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "High Intensity + Mismatched Energy",
                    rate: userData.red_flag_high_intensity_mismatched_energy_rate,
                    description:
                      "When emotional intensity > 7 and energy levels don't match",
                  },
                  {
                    name: "High Intensity + Poor Listening",
                    rate: userData.red_flag_high_intensity_poor_listening_rate,
                    description:
                      "When emotional intensity > 7 and listening is poor",
                  },
                  {
                    name: "Low Confidence + Avoidant",
                    rate: userData.red_flag_low_confidence_avoidant_rate,
                    description:
                      "When confidence is low and using avoidant style",
                  },
                  {
                    name: "No Boundaries + Their Control",
                    rate: userData.red_flag_no_boundaries_their_control_rate,
                    description:
                      "When boundaries aren't maintained and they control",
                  },
                ].map((flag) => {
                  const risk = getRedFlagLevel(flag.rate);
                  return (
                    <div
                      key={flag.name}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="font-medium">{flag.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {flag.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={cn("text-lg font-bold", risk.color)}>
                          {flag.rate.toFixed(1)}%
                        </p>
                        <Badge
                          variant="outline"
                          className={cn("mt-1", risk.bg, risk.color)}
                        >
                          {risk.level}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Optimal Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Optimal Timing Analysis
              </CardTitle>
              <CardDescription>
                Best days and times for successful interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Best/Worst Days */}
                <div>
                  <h4 className="text-sm font-medium mb-3">
                    Day of Week Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-green-50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Best Day</span>
                        <span className="text-sm font-bold text-green-600">
                          {bestDay.name}
                        </span>
                      </div>
                      <p className="text-xs text-green-700">
                        {bestDay.rate.toFixed(1)}% success rate
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-red-50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Worst Day</span>
                        <span className="text-sm font-bold text-red-600">
                          {worstDay.name}
                        </span>
                      </div>
                      <p className="text-xs text-red-700">
                        {worstDay.rate.toFixed(1)}% success rate
                      </p>
                    </div>
                  </div>
                </div>

                {/* Time of Day */}
                <div>
                  <h4 className="text-sm font-medium mb-3">
                    Time of Day Performance
                  </h4>
                  <div className="space-y-2">
                    {[
                      { name: "Morning", rate: userData.morning_success_rate },
                      {
                        name: "Afternoon",
                        rate: userData.afternoon_success_rate,
                      },
                      { name: "Evening", rate: userData.evening_success_rate },
                    ].map((time) => (
                      <div
                        key={time.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{time.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={time.rate} className="w-20 h-2" />
                          <span className="text-sm font-medium">
                            {time.rate.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Combinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Optimal Energy Combinations
              </CardTitle>
              <CardDescription>
                Which energy level pairings lead to the best outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "High + High",
                    rate: userData.high_high_energy_success_rate,
                    color: "text-green-600",
                  },
                  {
                    name: "Medium + Medium",
                    rate: userData.medium_medium_energy_success_rate,
                    color: "text-blue-600",
                  },
                  {
                    name: "Low + Low",
                    rate: userData.low_low_energy_success_rate,
                    color: "text-yellow-600",
                  },
                  {
                    name: "High + Low",
                    rate: userData.high_low_energy_success_rate,
                    color: "text-orange-600",
                  },
                  {
                    name: "Low + High",
                    rate: userData.low_high_energy_success_rate,
                    color: "text-red-600",
                  },
                ].map((energy) => (
                  <div
                    key={energy.name}
                    className="text-center p-3 border rounded-lg"
                  >
                    <p className="text-sm font-medium">{energy.name}</p>
                    <p className={cn("text-xl font-bold", energy.color)}>
                      {energy.rate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Success rate
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environment Success */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Success Patterns</CardTitle>
              <CardDescription>
                Where you&apos;re most likely to achieve successful outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Work",
                    rate: userData.work_success_rate,
                    icon: "💼",
                  },
                  {
                    name: "Home",
                    rate: userData.home_success_rate,
                    icon: "🏠",
                  },
                  {
                    name: "Public",
                    rate: userData.public_success_rate,
                    icon: "🌍",
                  },
                  {
                    name: "Virtual",
                    rate: userData.virtual_success_rate,
                    icon: "💻",
                  },
                  {
                    name: "Restaurant",
                    rate: userData.restaurant_success_rate,
                    icon: "🍽️",
                  },
                  {
                    name: "Outdoors",
                    rate: userData.outdoors_success_rate,
                    icon: "🌳",
                  },
                ].map((env) => {
                  const success = getSuccessLevel(env.rate);
                  return (
                    <div
                      key={env.name}
                      className="text-center p-3 border rounded-lg"
                    >
                      <div className="text-2xl mb-2">{env.icon}</div>
                      <p className="text-sm font-medium">{env.name}</p>
                      <p className={cn("text-lg font-bold", success.color)}>
                        {env.rate.toFixed(1)}%
                      </p>
                      <Badge
                        variant="outline"
                        className={cn("mt-1", success.bg, success.color)}
                      >
                        {success.level}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Communication Style Success */}
          <Card>
            <CardHeader>
              <CardTitle>Communication Style Success Patterns</CardTitle>
              <CardDescription>
                Which communication approaches work best for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Assertive",
                    rate: userData.assertive_success_rate,
                    color: "text-green-600",
                  },
                  {
                    name: "Empathetic",
                    rate: userData.empathetic_success_rate,
                    color: "text-blue-600",
                  },
                  {
                    name: "Passive",
                    rate: userData.passive_success_rate,
                    color: "text-yellow-600",
                  },
                  {
                    name: "Enthusiastic",
                    rate: userData.enthusiastic_success_rate,
                    color: "text-purple-600",
                  },
                  {
                    name: "Supportive",
                    rate: userData.supportive_success_rate,
                    color: "text-indigo-600",
                  },
                  {
                    name: "Questioning",
                    rate: userData.questioning_success_rate,
                    color: "text-orange-600",
                  },
                  {
                    name: "Withdrawn",
                    rate: userData.withdrawn_success_rate,
                    color: "text-red-600",
                  },
                ].map((style) => (
                  <div
                    key={style.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{style.name}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={style.rate} className="w-32 h-2" />
                      <span className={cn("text-sm font-medium", style.color)}>
                        {style.rate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duration Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Duration Impact on Success</CardTitle>
              <CardDescription>
                How conversation length affects your success rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    name: "Short (30 min)",
                    rate: userData.short_duration_success_rate,
                    color: "text-green-600",
                  },
                  {
                    name: "Medium (1 hour)",
                    rate: userData.medium_duration_success_rate,
                    color: "text-blue-600",
                  },
                  {
                    name: "Long (2+ hours)",
                    rate: userData.long_duration_success_rate,
                    color: "text-yellow-600",
                  },
                ].map((duration) => (
                  <div key={duration.name} className="text-center">
                    <p className="text-sm font-medium">{duration.name}</p>
                    <p className={cn("text-2xl font-bold", duration.color)}>
                      {duration.rate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Success rate
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Score Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle>Health Score Success Thresholds</CardTitle>
              <CardDescription>
                How relationship health scores correlate with success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "Excellent (8-10)",
                    rate: userData.excellent_health_success_rate,
                    color: "text-green-600",
                  },
                  {
                    name: "Good (6-7)",
                    rate: userData.good_health_success_rate,
                    color: "text-blue-600",
                  },
                  {
                    name: "Moderate (4-5)",
                    rate: userData.moderate_health_success_rate,
                    color: "text-yellow-600",
                  },
                  {
                    name: "Poor (0-3)",
                    rate: userData.poor_health_success_rate,
                    color: "text-red-600",
                  },
                ].map((health) => (
                  <div key={health.name} className="text-center">
                    <p className="text-sm font-medium">{health.name}</p>
                    <p className={cn("text-xl font-bold", health.color)}>
                      {health.rate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Success rate
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trust Level Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Trust Level Impact on Success</CardTitle>
              <CardDescription>
                How trust levels affect your interaction outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "Very High Trust",
                    rate: userData.very_high_trust_success_rate,
                    color: "text-green-600",
                  },
                  {
                    name: "High Trust",
                    rate: userData.high_trust_success_rate,
                    color: "text-blue-600",
                  },
                  {
                    name: "Medium Trust",
                    rate: userData.medium_trust_success_rate,
                    color: "text-yellow-600",
                  },
                  {
                    name: "Low Trust",
                    rate: userData.low_trust_success_rate,
                    color: "text-red-600",
                  },
                ].map((trust) => (
                  <div key={trust.name} className="text-center">
                    <p className="text-sm font-medium">{trust.name}</p>
                    <p className={cn("text-xl font-bold", trust.color)}>
                      {trust.rate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Success rate
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

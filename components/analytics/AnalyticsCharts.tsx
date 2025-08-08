"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
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
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Heart,
  Users,
  Calendar,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

interface PredictiveData {
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
  high_high_energy_success_rate: number;
  medium_medium_energy_success_rate: number;
  low_low_energy_success_rate: number;
  high_low_energy_success_rate: number;
  low_high_energy_success_rate: number;
  predicted_success_probability: number;
}

interface EmotionalIntelligenceData {
  early_avg_recovery_hours: number;
  recent_avg_recovery_hours: number;
}

interface RelationshipHealthData {
  overall_boundary_success_rate: number;
  overall_resolution_rate: number;
  avg_trust_score: number;
  shared_power_rate: number;
  deep_listening_resolution_rate: number;
  active_listening_resolution_rate: number;
  relationship_health_score: number;
}

interface AnalyticsChartsProps {
  emotionalIntelligenceData: EmotionalIntelligenceData[];
  relationshipHealthData: RelationshipHealthData[];
  predictiveData: PredictiveData[];
}

export default function AnalyticsCharts({
  emotionalIntelligenceData,
  relationshipHealthData,
  predictiveData,
}: AnalyticsChartsProps) {
  if (
    !emotionalIntelligenceData ||
    !relationshipHealthData ||
    !predictiveData
  ) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Loading charts...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const eiData = emotionalIntelligenceData[0];
  const rhData = relationshipHealthData[0];
  const predData = predictiveData[0];

  // Success Predictors Chart
  const successPredictorsData = {
    labels: ["Consensus", "Imposed", "Delegated", "Consultative"],
    datasets: [
      {
        label: "Success Rate (%)",
        data: [
          predData.consensus_success_rate,
          predData.imposed_success_rate,
          predData.delegated_success_rate,
          predData.consultative_success_rate,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(239, 68, 68)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Red Flag Detection Chart
  const redFlagData = {
    labels: [
      "High Intensity + Mismatched Energy",
      "High Intensity + Poor Listening",
      "Low Confidence + Avoidant",
      "No Boundaries + Their Control",
    ],
    datasets: [
      {
        label: "Failure Rate (%)",
        data: [
          predData.red_flag_high_intensity_mismatched_energy_rate,
          predData.red_flag_high_intensity_poor_listening_rate,
          predData.red_flag_low_confidence_avoidant_rate,
          predData.red_flag_no_boundaries_their_control_rate,
        ],
        backgroundColor: "rgba(239, 68, 68, 0.6)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 2,
      },
    ],
  };

  // Optimal Timing Chart
  const optimalTimingData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Success Rate (%)",
        data: [
          predData.monday_success_rate,
          predData.tuesday_success_rate,
          predData.wednesday_success_rate,
          predData.thursday_success_rate,
          predData.friday_success_rate,
          predData.saturday_success_rate,
          predData.sunday_success_rate,
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Energy Combination Analysis
  const energyCombinationData = {
    labels: ["High+High", "Medium+Medium", "Low+Low", "High+Low", "Low+High"],
    datasets: [
      {
        label: "Success Rate (%)",
        data: [
          predData.high_high_energy_success_rate,
          predData.medium_medium_energy_success_rate,
          predData.low_low_energy_success_rate,
          predData.high_low_energy_success_rate,
          predData.low_high_energy_success_rate,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Emotional Recovery Trend
  const recoveryTrendData = {
    labels: ["Early Period", "Recent Period"],
    datasets: [
      {
        label: "Avg Recovery Time (hours)",
        data: [
          eiData.early_avg_recovery_hours,
          eiData.recent_avg_recovery_hours,
        ],
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Relationship Health Radar Chart
  const relationshipHealthRadarData = {
    labels: [
      "Boundary Success",
      "Resolution Rate",
      "Trust Score",
      "Power Balance",
      "Communication",
    ],
    datasets: [
      {
        label: "Current Score",
        data: [
          rhData.overall_boundary_success_rate,
          rhData.overall_resolution_rate,
          rhData.avg_trust_score * 25, // Scale to 0-100
          rhData.shared_power_rate,
          (rhData.deep_listening_resolution_rate +
            rhData.active_listening_resolution_rate) /
            2,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(59, 130, 246)",
      },
    ],
  };

  const getBestDecisionStyle = () => {
    const styles = [
      { name: "Consensus", rate: predData.consensus_success_rate },
      { name: "Imposed", rate: predData.imposed_success_rate },
      { name: "Delegated", rate: predData.delegated_success_rate },
      { name: "Consultative", rate: predData.consultative_success_rate },
    ];
    return styles.reduce((best, current) =>
      current.rate > best.rate ? current : best
    );
  };

  const getBestDay = () => {
    const days = [
      { name: "Monday", rate: predData.monday_success_rate },
      { name: "Tuesday", rate: predData.tuesday_success_rate },
      { name: "Wednesday", rate: predData.wednesday_success_rate },
      { name: "Thursday", rate: predData.thursday_success_rate },
      { name: "Friday", rate: predData.friday_success_rate },
      { name: "Saturday", rate: predData.saturday_success_rate },
      { name: "Sunday", rate: predData.sunday_success_rate },
    ];
    return days.reduce((best, current) =>
      current.rate > best.rate ? current : best
    );
  };

  const getBestEnergyCombination = () => {
    const combinations = [
      { name: "High + High", rate: predData.high_high_energy_success_rate },
      {
        name: "Medium + Medium",
        rate: predData.medium_medium_energy_success_rate,
      },
      { name: "Low + Low", rate: predData.low_low_energy_success_rate },
      { name: "High + Low", rate: predData.high_low_energy_success_rate },
      { name: "Low + High", rate: predData.low_high_energy_success_rate },
    ];
    return combinations.reduce((best, current) =>
      current.rate > best.rate ? current : best
    );
  };

  const bestDecisionStyle = getBestDecisionStyle();
  const bestDay = getBestDay();
  const bestEnergy = getBestEnergyCombination();

  return (
    <div className="space-y-6">
      {/* Key Insights Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Your Key Insights
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">
                  Best Decision Style
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {bestDecisionStyle.name}
              </p>
              <p className="text-sm text-green-700">
                {bestDecisionStyle.rate.toFixed(1)}% success rate
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">
                  Optimal Timing
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{bestDay.name}</p>
              <p className="text-sm text-blue-700">
                {bestDay.rate.toFixed(1)}% success rate
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">
                  Best Energy Match
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {bestEnergy.name}
              </p>
              <p className="text-sm text-purple-700">
                {bestEnergy.rate.toFixed(1)}% success rate
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">
                  Success Probability
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {predData.predicted_success_probability.toFixed(1)}%
              </p>
              <p className="text-sm text-orange-700">
                Based on current patterns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Predictors */}
      <Card>
        <CardHeader>
          <CardTitle>Success Predictors</CardTitle>
          <CardDescription>
            Which decision-making styles work best for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar
              data={successPredictorsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `Success Rate: ${context.parsed.y.toFixed(1)}%`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>💡 Insight:</strong> When you use{" "}
              <strong>{bestDecisionStyle.name}</strong> decision-making, you
              have a{" "}
              <strong>{bestDecisionStyle.rate.toFixed(1)}% success rate</strong>
              . Focus on this approach for important decisions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Red Flag Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Red Flag Detection
          </CardTitle>
          <CardDescription>
            High-risk patterns that lead to relationship failures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar
              data={redFlagData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `Failure Rate: ${context.parsed.y.toFixed(1)}%`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>⚠️ Warning:</strong> The highest risk pattern is{" "}
              <strong>No Boundaries + Their Control</strong>
              with a{" "}
              <strong>
                {predData.red_flag_no_boundaries_their_control_rate.toFixed(1)}%
                failure rate
              </strong>
              . Avoid situations where you don&apos;t maintain boundaries and
              they control the interaction.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Optimal Timing */}
      <Card>
        <CardHeader>
          <CardTitle>Optimal Timing</CardTitle>
          <CardDescription>
            Your success rates by day of the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line
              data={optimalTimingData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `Success Rate: ${context.parsed.y.toFixed(1)}%`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📅 Timing Tip:</strong> Your best conversations happen on{" "}
              <strong>{bestDay.name}</strong>
              with a <strong>{bestDay.rate.toFixed(1)}% success rate</strong>.
              Schedule important discussions for this day when possible.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Energy Combination Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Combination Analysis</CardTitle>
          <CardDescription>
            How different energy level combinations affect your success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar
              data={energyCombinationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `Success Rate: ${context.parsed.y.toFixed(1)}%`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>⚡ Energy Insight:</strong>{" "}
              <strong>{bestEnergy.name}</strong> energy pairs work best for you
              with a <strong>{bestEnergy.rate.toFixed(1)}% success rate</strong>
              . Try to match energy levels with your conversation partner.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emotional Recovery Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Emotional Recovery Trend</CardTitle>
          <CardDescription>
            How your emotional recovery speed has changed over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line
              data={recoveryTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `Recovery Time: ${context.parsed.y.toFixed(1)} hours`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${value}h`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>🔄 Recovery Status:</strong> Your recovery time has
              changed from
              <strong>
                {" "}
                {eiData.early_avg_recovery_hours.toFixed(1)} hours
              </strong>{" "}
              to
              <strong>
                {" "}
                {eiData.recent_avg_recovery_hours.toFixed(1)} hours
              </strong>
              .
              {eiData.recent_avg_recovery_hours <
              eiData.early_avg_recovery_hours
                ? " You&apos;re getting faster at emotional recovery! 🎉"
                : " Consider practicing your regulation techniques more frequently."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Relationship Health Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Relationship Health Overview</CardTitle>
          <CardDescription>
            Your current relationship health across key dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Radar
              data={relationshipHealthRadarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.label}: ${context.parsed.r.toFixed(1)}%`,
                    },
                  },
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📊 Health Score:</strong> Your overall relationship health
              score is
              <strong> {rhData.relationship_health_score.toFixed(1)}</strong>.
              Focus on improving the areas with lower scores for better
              relationship outcomes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

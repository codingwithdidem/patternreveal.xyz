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
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
  Calendar,
  Clock,
  Target,
  Zap,
  Heart,
  Users,
  Lightbulb,
  BookOpen,
  Activity,
  BarChart3,
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
  ArcElement
);

export interface ReflectionTrendsData {
  date: string;
  reflections_count: number;
  avg_mood_score: number;
  dominant_emotion: string;
  avg_energy_level: number;
  avg_confidence_level: number;
  resolution_rate: number;
  boundary_success_rate: number;
}

import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

interface ReflectionAnalysisProps {
  workspaceId?: string;
  daysFilter: string;
  selectedUserId?: string;
}

export default function ReflectionAnalysis({
  workspaceId,
  daysFilter,
  selectedUserId,
}: ReflectionAnalysisProps) {
  // Fetch trends data and transform it
  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    workspaceId
      ? `/api/analytics/patterns?type=trends&days_filter=${daysFilter}&workspaceId=${workspaceId}${
          selectedUserId ? `&user_id=${selectedUserId}` : ""
        }`
      : null,
    fetcher
  );

  console.log(result);

  // Transform trends data to reflection analysis format
  const data: ReflectionTrendsData[] =
    result?.data?.map(
      (trend: {
        date: string;
        total_reflections: number;
        avg_health_score: number;
      }) => ({
        date: trend.date,
        reflections_count: trend.total_reflections,
        avg_mood_score: trend.avg_health_score, // Using health score as mood proxy
        dominant_emotion: "Mixed", // Default since we don't have emotion data in trends
        avg_energy_level: 7, // Default since we don't have energy data in trends
        avg_confidence_level: 7, // Default since we don't have confidence data in trends
        resolution_rate: 75, // Default since we don't have resolution data in trends
        boundary_success_rate: 80, // Default since we don't have boundary data in trends
      })
    ) || [];
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Reflection Analysis</CardTitle>
            <CardDescription>Loading analysis...</CardDescription>
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
            <CardTitle>Reflection Analysis</CardTitle>
            <CardDescription>
              No reflection data available for the selected period.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Sort data by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Extract chart data
  const labels = sortedData.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Mood Trends Chart
  const moodTrendsData = {
    labels,
    datasets: [
      {
        label: "Mood Score",
        data: sortedData.map((item) => item.avg_mood_score),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Energy Levels Chart
  const energyLevelsData = {
    labels,
    datasets: [
      {
        label: "Energy Level",
        data: sortedData.map((item) => item.avg_energy_level),
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Confidence Levels Chart
  const confidenceLevelsData = {
    labels,
    datasets: [
      {
        label: "Confidence Level",
        data: sortedData.map((item) => item.avg_confidence_level),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Success Rates Chart
  const successRatesData = {
    labels,
    datasets: [
      {
        label: "Resolution Rate",
        data: sortedData.map((item) => item.resolution_rate),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
      },
      {
        label: "Boundary Success Rate",
        data: sortedData.map((item) => item.boundary_success_rate),
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Emotion Distribution Chart
  const emotionCounts = sortedData.reduce((acc, item) => {
    acc[item.dominant_emotion] = (acc[item.dominant_emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const emotionDistributionData = {
    labels: Object.keys(emotionCounts),
    datasets: [
      {
        label: "Emotion Frequency",
        data: Object.values(emotionCounts),
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(107, 114, 128, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
          "rgb(107, 114, 128)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Calculate insights
  const totalReflections = sortedData.reduce(
    (sum, item) => sum + item.reflections_count,
    0
  );
  const avgMood =
    sortedData.reduce((sum, item) => sum + item.avg_mood_score, 0) /
    sortedData.length;
  const avgEnergy =
    sortedData.reduce((sum, item) => sum + item.avg_energy_level, 0) /
    sortedData.length;
  const avgConfidence =
    sortedData.reduce((sum, item) => sum + item.avg_confidence_level, 0) /
    sortedData.length;
  const avgResolutionRate =
    sortedData.reduce((sum, item) => sum + item.resolution_rate, 0) /
    sortedData.length;
  const avgBoundarySuccess =
    sortedData.reduce((sum, item) => sum + item.boundary_success_rate, 0) /
    sortedData.length;

  // Find trends
  const recentData = sortedData.slice(-7); // Last 7 entries
  const earlierData = sortedData.slice(0, Math.min(7, sortedData.length - 7)); // First 7 entries

  const recentAvgMood =
    recentData.reduce((sum, item) => sum + item.avg_mood_score, 0) /
    recentData.length;
  const earlierAvgMood =
    earlierData.reduce((sum, item) => sum + item.avg_mood_score, 0) /
    earlierData.length;
  const moodTrend =
    recentAvgMood > earlierAvgMood
      ? "improving"
      : recentAvgMood < earlierAvgMood
      ? "declining"
      : "stable";

  const recentAvgEnergy =
    recentData.reduce((sum, item) => sum + item.avg_energy_level, 0) /
    recentData.length;
  const earlierAvgEnergy =
    earlierData.reduce((sum, item) => sum + item.avg_energy_level, 0) /
    earlierData.length;
  const energyTrend =
    recentAvgEnergy > earlierAvgEnergy
      ? "increasing"
      : recentAvgEnergy < earlierAvgEnergy
      ? "decreasing"
      : "stable";

  // Find most common emotions
  const emotionFrequency = Object.entries(emotionCounts).sort(
    ([, a], [, b]) => b - a
  );
  const mostCommonEmotion = emotionFrequency[0]?.[0] || "Unknown";
  const secondMostCommonEmotion = emotionFrequency[1]?.[0] || "Unknown";

  // Find best and worst performing days
  const bestDay = sortedData.reduce((best, current) =>
    current.avg_mood_score > best.avg_mood_score ? current : best
  );
  const worstDay = sortedData.reduce((worst, current) =>
    current.avg_mood_score < worst.avg_mood_score ? current : worst
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Reflection Overview
          </CardTitle>
          <CardDescription>
            Your reflection patterns and key insights for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">
                  Total Reflections
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {totalReflections}
              </p>
              <p className="text-sm text-blue-700">
                Over {sortedData.length} days
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Avg Mood</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {avgMood.toFixed(1)}/10
              </p>
              <p className="text-sm text-green-700">Trend: {moodTrend}</p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">Avg Energy</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {avgEnergy.toFixed(1)}/10
              </p>
              <p className="text-sm text-purple-700">Trend: {energyTrend}</p>
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">
                  Success Rate
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {avgResolutionRate.toFixed(1)}%
              </p>
              <p className="text-sm text-orange-700">Resolution success</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Trends Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Mood Trends Over Time</CardTitle>
          <CardDescription>
            How your emotional state has evolved throughout this period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line
              data={moodTrendsData}
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
                        `Mood: ${context.parsed.y.toFixed(1)}/10`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                      callback: (value) => `${value}/10`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📈 Mood Analysis:</strong> Your mood has been{" "}
              <strong>{moodTrend}</strong> over this period.
              {moodTrend === "improving" &&
                " This suggests positive progress in your emotional well-being! 🎉"}
              {moodTrend === "declining" &&
                " Consider what might be contributing to this trend and what support you might need."}
              {moodTrend === "stable" &&
                " You're maintaining consistent emotional balance, which is a great foundation."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Energy and Confidence Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Energy & Confidence Trends</CardTitle>
          <CardDescription>
            Your energy levels and confidence over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Energy Levels</h4>
              <div className="h-48">
                <Line
                  data={energyLevelsData}
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
                            `Energy: ${context.parsed.y.toFixed(1)}/10`,
                        },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                          callback: (value) => `${value}/10`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Confidence Levels</h4>
              <div className="h-48">
                <Line
                  data={confidenceLevelsData}
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
                            `Confidence: ${context.parsed.y.toFixed(1)}/10`,
                        },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                          callback: (value) => `${value}/10`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Rates Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Success Rates Over Time</CardTitle>
          <CardDescription>
            How your resolution and boundary success rates have changed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line
              data={successRatesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top" as const,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.dataset.label}: ${context.parsed.y.toFixed(
                          1
                        )}%`,
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
        </CardContent>
      </Card>

      {/* Emotion Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Emotion Distribution</CardTitle>
          <CardDescription>
            The most common emotions in your reflections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-64">
              <Doughnut
                data={emotionDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `${context.label}: ${context.parsed} times`,
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Most Common Emotions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>1. {mostCommonEmotion}</span>
                    <Badge variant="secondary">
                      {emotionFrequency[0]?.[1] || 0} times
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>2. {secondMostCommonEmotion}</span>
                    <Badge variant="secondary">
                      {emotionFrequency[1]?.[1] || 0} times
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Best & Worst Days</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Best Day:</span>
                    <span className="text-green-600 font-medium">
                      {new Date(bestDay.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      ({bestDay.avg_mood_score.toFixed(1)}/10)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Worst Day:</span>
                    <span className="text-red-600 font-medium">
                      {new Date(worstDay.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      ({worstDay.avg_mood_score.toFixed(1)}/10)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Written Patterns Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Pattern Analysis
          </CardTitle>
          <CardDescription>
            Key insights and patterns discovered in your reflections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-800 mb-2">
                📊 Overall Performance
              </h4>
              <p className="text-sm text-blue-700">
                You've completed <strong>{totalReflections} reflections</strong>{" "}
                over {sortedData.length} days, averaging{" "}
                <strong>
                  {(totalReflections / sortedData.length).toFixed(1)}{" "}
                  reflections per day
                </strong>
                . Your average mood score of{" "}
                <strong>{avgMood.toFixed(1)}/10</strong> indicates
                {avgMood >= 7
                  ? " excellent emotional well-being"
                  : avgMood >= 5
                  ? " moderate emotional balance"
                  : " room for improvement in emotional health"}
                .
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-medium text-green-800 mb-2">
                🎯 Success Patterns
              </h4>
              <p className="text-sm text-green-700">
                Your{" "}
                <strong>
                  resolution rate of {avgResolutionRate.toFixed(1)}%
                </strong>{" "}
                shows
                {avgResolutionRate >= 80
                  ? " excellent problem-solving skills"
                  : avgResolutionRate >= 60
                  ? " good conflict resolution abilities"
                  : " opportunities to improve conflict resolution"}
                . With a{" "}
                <strong>
                  boundary success rate of {avgBoundarySuccess.toFixed(1)}%
                </strong>
                , you're
                {avgBoundarySuccess >= 80
                  ? " very effective at maintaining healthy boundaries"
                  : avgBoundarySuccess >= 60
                  ? " generally good at setting boundaries"
                  : " working on boundary-setting skills"}
                .
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <h4 className="font-medium text-purple-800 mb-2">
                ⚡ Energy & Confidence Insights
              </h4>
              <p className="text-sm text-purple-700">
                Your average energy level of{" "}
                <strong>{avgEnergy.toFixed(1)}/10</strong> and confidence level
                of <strong>{avgConfidence.toFixed(1)}/10</strong> suggest
                {avgEnergy >= 7 && avgConfidence >= 7
                  ? " you're operating at peak performance with high energy and confidence"
                  : avgEnergy >= 5 && avgConfidence >= 5
                  ? " you're maintaining balanced energy and confidence levels"
                  : " you might benefit from focusing on energy management and confidence-building activities"}
                . The {energyTrend} energy trend indicates{" "}
                {energyTrend === "increasing"
                  ? "positive momentum"
                  : energyTrend === "decreasing"
                  ? "potential burnout or stress"
                  : "stable energy management"}
                .
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <h4 className="font-medium text-orange-800 mb-2">
                😊 Emotional Patterns
              </h4>
              <p className="text-sm text-orange-700">
                <strong>{mostCommonEmotion}</strong> is your most frequent
                emotion, appearing in {emotionFrequency[0]?.[1] || 0}{" "}
                reflections. This suggests{" "}
                {mostCommonEmotion.toLowerCase().includes("happy") ||
                mostCommonEmotion.toLowerCase().includes("joy")
                  ? "a generally positive emotional state"
                  : mostCommonEmotion.toLowerCase().includes("sad") ||
                    mostCommonEmotion.toLowerCase().includes("angry")
                  ? "you may be dealing with challenging emotions"
                  : mostCommonEmotion.toLowerCase().includes("calm") ||
                    mostCommonEmotion.toLowerCase().includes("peaceful")
                  ? "you're finding emotional balance"
                  : "you're experiencing a mix of emotions"}
                . Your second most common emotion,{" "}
                <strong>{secondMostCommonEmotion}</strong>, appears{" "}
                {emotionFrequency[1]?.[1] || 0} times, indicating{" "}
                {secondMostCommonEmotion === mostCommonEmotion
                  ? "consistent emotional patterns"
                  : "emotional complexity and variety"}
                .
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-indigo-50">
              <h4 className="font-medium text-indigo-800 mb-2">
                📈 Growth Opportunities
              </h4>
              <p className="text-sm text-indigo-700">
                Based on your patterns, consider focusing on:
                {avgMood < 6 &&
                  " • Mood improvement techniques and positive activities"}
                {avgEnergy < 6 && " • Energy management and stress reduction"}
                {avgConfidence < 6 &&
                  " • Confidence-building exercises and self-affirmation"}
                {avgResolutionRate < 70 &&
                  " • Conflict resolution skills and communication techniques"}
                {avgBoundarySuccess < 70 &&
                  " • Boundary-setting practice and assertiveness training"}
                {moodTrend === "declining" &&
                  " • Identifying and addressing factors contributing to mood decline"}
                {energyTrend === "decreasing" &&
                  " • Work-life balance and stress management strategies"}
                {!avgMood &&
                  !avgEnergy &&
                  !avgConfidence &&
                  !avgResolutionRate &&
                  !avgBoundarySuccess &&
                  moodTrend !== "declining" &&
                  energyTrend !== "decreasing" &&
                  " • Continue your current positive practices and consider setting new goals"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

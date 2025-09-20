import { Badge } from "@/components/ui/badge";
import {
  Heart,
  CheckCircle,
  AlertTriangle,
  User,
  Users,
  Zap,
  Shield,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ConnectionPatternsProps {
  analysisReport: AnalysisType;
}

// Helper functions for styling
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild":
      return "bg-blue-100 text-blue-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "severe":
      return "bg-orange-100 text-orange-800";
    case "extreme":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getEffectivenessColor = (effectiveness: string) => {
  switch (effectiveness) {
    case "very_effective":
      return "bg-green-100 text-green-800";
    case "somewhat_effective":
      return "bg-yellow-100 text-yellow-800";
    case "ineffective":
      return "bg-orange-100 text-orange-800";
    case "harmful":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getWhoExhibitedIcon = (who: string) => {
  switch (who) {
    case "you":
      return <User className="w-4 h-4" />;
    case "them":
      return <User className="w-4 h-4" />;
    case "both":
      return <Users className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

export default function ConnectionPatterns({
  analysisReport,
}: ConnectionPatternsProps) {
  const connectionPatterns = analysisReport.connectionPatterns;

  if (!connectionPatterns) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Connection pattern analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get connection insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-rose-600" />
        <h3 className="text-lg font-semibold">Connection Patterns</h3>
      </div>

      {/* Detected Patterns */}
      {connectionPatterns.detectedPatterns?.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">
            Detected Connection Patterns
          </h4>
          <div className="space-y-4">
            {connectionPatterns.detectedPatterns.map((pattern, index) => (
              <div
                key={`pattern-${index}-${pattern.pattern.slice(0, 20)}`}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getWhoExhibitedIcon(pattern.who_exhibited || "unknown")}
                    <span className="font-medium capitalize">
                      {pattern.pattern?.replace(/_/g, " ") || "Unknown pattern"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={getSeverityColor(pattern.severity || "mild")}
                    >
                      {pattern.severity?.replace(/_/g, " ") || "Unknown"}
                    </Badge>
                    <Badge
                      className={getEffectivenessColor(
                        pattern.effectiveness || "unknown"
                      )}
                    >
                      {pattern.effectiveness?.replace(/_/g, " ") || "Unknown"}
                    </Badge>
                  </div>
                </div>

                {pattern.quote && (
                  <div className="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-r-lg">
                    <blockquote className="text-sm italic text-rose-900">
                      &quot;{pattern.quote}&quot;
                    </blockquote>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pattern.impact && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Impact:
                      </span>
                      <p className="text-sm text-gray-800">{pattern.impact}</p>
                    </div>
                  )}
                  {pattern.improvement && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Improvement:
                      </span>
                      <p className="text-sm text-gray-800">
                        {pattern.improvement}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Love Languages */}
      {connectionPatterns.loveLanguagesExpressed?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Love Languages Expressed
          </h4>
          <div className="flex flex-wrap gap-2">
            {connectionPatterns.loveLanguagesExpressed.map(
              (language, index) => (
                <Badge
                  key={`love-lang-${index}-${language.slice(0, 10)}`}
                  variant="outline"
                  className="capitalize"
                >
                  {language.replace(/_/g, " ")}
                </Badge>
              )
            )}
          </div>
        </div>
      )}

      {/* Connection Attempts */}
      {connectionPatterns.connectionAttempts?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Connection Attempts
          </h4>
          <div className="space-y-2">
            {connectionPatterns.connectionAttempts.map((attempt, index) => (
              <div
                key={`attempt-${index}-${attempt.slice(0, 20)}`}
                className="flex gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{attempt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection Barriers */}
      {connectionPatterns.connectionBarriers?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            Connection Barriers
          </h4>
          <div className="space-y-2">
            {connectionPatterns.connectionBarriers.map((barrier, index) => (
              <div
                key={`barrier-${index}-${barrier.slice(0, 20)}`}
                className="flex gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{barrier}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection Insights */}
      {connectionPatterns.connectionInsights?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" />
            Key Insights
          </h4>
          <div className="space-y-2">
            {connectionPatterns.connectionInsights.map((insight, index) => (
              <div
                key={`insight-${index}-${insight.slice(0, 20)}`}
                className="flex gap-2"
              >
                <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection Recommendations */}
      {connectionPatterns.connectionRecommendations?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {connectionPatterns.connectionRecommendations.map(
              (recommendation, index) => (
                <div
                  key={`recommendation-${index}-${recommendation.slice(0, 20)}`}
                  className="flex gap-2"
                >
                  <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

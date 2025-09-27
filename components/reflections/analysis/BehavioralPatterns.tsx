import { Badge } from "@/components/ui/badge";
import {
  Activity,
  ArrowRight,
  Target,
  TrendingUp,
  Star,
  Zap,
  AlertTriangle,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface BehavioralPatternsProps {
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
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function BehavioralPatterns({
  analysisReport,
}: BehavioralPatternsProps) {
  const behaviorPatterns = analysisReport.behaviorPatterns;

  if (!behaviorPatterns) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Behavioral patterns analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get behavioral insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Behavioral Patterns</h3>
      </div>

      {/* Detected Patterns */}
      {behaviorPatterns.detectedPatterns &&
        behaviorPatterns.detectedPatterns.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-700">
              Detected Behavioral Patterns
            </h4>
            <div className="space-y-4">
              {behaviorPatterns.detectedPatterns.map((pattern, index) => (
                <div
                  key={`pattern-${index}-${
                    pattern.pattern?.slice(0, 20) || "unknown"
                  }`}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-medium capitalize">
                        {pattern.pattern?.replace(/_/g, " ") ||
                          "Unknown pattern"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className={getSeverityColor(pattern.severity || "mild")}
                      >
                        {pattern.severity?.replace(/_/g, " ") || "Unknown"}
                      </Badge>
                    </div>
                  </div>

                  {pattern.quote && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                      <blockquote className="text-sm italic text-blue-900">
                        &quot;{pattern.quote}&quot;
                      </blockquote>
                    </div>
                  )}

                  {pattern.impact && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Impact:
                      </span>
                      <p className="text-sm text-gray-800">{pattern.impact}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Behavior Cycles */}
      {behaviorPatterns.behaviorCycles &&
        behaviorPatterns.behaviorCycles.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" />
              Behavior Cycles
            </h4>
            <div className="space-y-4">
              {behaviorPatterns.behaviorCycles.map((cycle, index) => (
                <div
                  key={`cycle-${index}-${
                    cycle.trigger?.slice(0, 20) || "unknown"
                  }`}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Trigger:
                        </span>
                        <p className="text-sm text-gray-800">{cycle.trigger}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Response:
                        </span>
                        <p className="text-sm text-gray-800">
                          {cycle.response}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Outcome:
                        </span>
                        <p className="text-sm text-gray-800">{cycle.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Growth Opportunities */}
      {behaviorPatterns.growthOpportunities &&
        behaviorPatterns.growthOpportunities.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Growth Opportunities
            </h4>
            <div className="space-y-2">
              {behaviorPatterns.growthOpportunities.map(
                (opportunity, index) => (
                  <div
                    key={`opportunity-${index}-${opportunity.slice(0, 20)}`}
                    className="flex gap-2"
                  >
                    <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{opportunity}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Calendar,
  Activity,
  AlertTriangle,
  User,
  Users,
  Zap,
  Shield,
  Target,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ContextFactorsProps {
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

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "low":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "severe":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getWhoAffectedIcon = (who: string) => {
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

const getQualityColor = (quality: string) => {
  switch (quality) {
    case "optimal":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "poor":
      return "bg-orange-100 text-orange-800";
    case "terrible":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ContextFactors({
  analysisReport,
}: ContextFactorsProps) {
  const contextFactors = analysisReport.contextFactors;

  if (!contextFactors) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Context factor analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get context insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Context Factors</h3>
      </div>

      {/* Detected Patterns */}
      {contextFactors.detectedPatterns?.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">
            Detected Context Patterns
          </h4>
          <div className="space-y-4">
            {contextFactors.detectedPatterns.map((pattern, index) => (
              <div
                key={`pattern-${index}-${pattern.pattern.slice(0, 20)}`}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getWhoAffectedIcon(pattern.who_affected || "unknown")}
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
                  </div>
                </div>

                {pattern.quote && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                    <blockquote className="text-sm italic text-blue-900">
                      &quot;{pattern.quote}&quot;
                    </blockquote>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pattern.impact && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Impact:
                      </span>
                      <p className="text-sm text-gray-800">{pattern.impact}</p>
                    </div>
                  )}
                  {pattern.mitigation && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Mitigation:
                      </span>
                      <p className="text-sm text-gray-800">
                        {pattern.mitigation}
                      </p>
                    </div>
                  )}
                  {pattern.future_prevention && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Future Prevention:
                      </span>
                      <p className="text-sm text-gray-800">
                        {pattern.future_prevention}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Environment */}
      {contextFactors.environment && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Environment</h4>
          <Badge variant="outline" className="capitalize">
            {contextFactors.environment.replace(/_/g, " ")}
          </Badge>
        </div>
      )}

      {/* External Stressors */}
      {contextFactors.externalStressors?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            External Stressors
          </h4>
          <div className="flex flex-wrap gap-2">
            {contextFactors.externalStressors.map((stressor, index) => (
              <Badge
                key={`stressor-${index}-${stressor.slice(0, 10)}`}
                variant="destructive"
                className="capitalize"
              >
                {stressor.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Stressor Analysis */}
      {contextFactors.stressorAnalysis?.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">
            Stressor Analysis
          </h4>
          <div className="space-y-4">
            {contextFactors.stressorAnalysis.map((stressor, index) => (
              <div
                key={`stressor-analysis-${index}-${stressor.stressor.slice(
                  0,
                  20
                )}`}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">{stressor.stressor}</span>
                  </div>
                  <Badge className={getImpactColor(stressor.impact)}>
                    {stressor.impact}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stressor.source && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Source:
                      </span>
                      <p className="text-sm text-gray-800">{stressor.source}</p>
                    </div>
                  )}
                  {stressor.duration && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Duration:
                      </span>
                      <p className="text-sm text-gray-800">
                        {stressor.duration}
                      </p>
                    </div>
                  )}
                  {stressor.coping && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Coping:
                      </span>
                      <p className="text-sm text-gray-800">{stressor.coping}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Context */}
      {contextFactors.timeContext && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Time Context
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Time of Day:
              </span>
              <Badge variant="outline" className="capitalize">
                {contextFactors.timeContext.timeOfDay?.replace(/_/g, " ") ||
                  "Unknown"}
              </Badge>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Day of Week:
              </span>
              <Badge variant="outline" className="capitalize">
                {contextFactors.timeContext.dayOfWeek?.replace(/_/g, " ") ||
                  "Unknown"}
              </Badge>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Timing Quality:
              </span>
              <Badge
                className={getQualityColor(
                  contextFactors.timeContext.timingQuality || "unknown"
                )}
              >
                {contextFactors.timeContext.timingQuality?.replace(/_/g, " ") ||
                  "Unknown"}
              </Badge>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Time Pressure:
              </span>
              <Badge
                className={getImpactColor(
                  contextFactors.timeContext.timePressure || "none"
                )}
              >
                {contextFactors.timeContext.timePressure?.replace(/_/g, " ") ||
                  "None"}
              </Badge>
            </div>
          </div>

          {contextFactors.timeContext.timeImpact && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
              <span className="text-xs font-medium text-gray-600">
                Time Impact:
              </span>
              <p className="text-sm text-blue-900">
                {contextFactors.timeContext.timeImpact}
              </p>
            </div>
          )}

          {contextFactors.timeContext.specialCircumstances?.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Special Circumstances:
              </span>
              <div className="flex flex-wrap gap-2">
                {contextFactors.timeContext.specialCircumstances.map(
                  (circumstance, index) => (
                    <Badge key={`circumstance-${index}`} variant="outline">
                      {circumstance}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Emotional Context */}
      {contextFactors.emotionalContext && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-600" />
            Emotional Context
          </h4>

          {contextFactors.emotionalContext.recentEvents?.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Recent Events:
              </span>
              <div className="space-y-1">
                {contextFactors.emotionalContext.recentEvents.map(
                  (event, index) => (
                    <div key={`recent-event-${index}`} className="flex gap-2">
                      <Activity className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm capitalize">
                        {event.replace(/_/g, " ")}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {contextFactors.emotionalContext.emotionalBaggage?.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Emotional Baggage:
              </span>
              <div className="space-y-1">
                {contextFactors.emotionalContext.emotionalBaggage.map(
                  (baggage, index) => (
                    <div
                      key={`baggage-${index}`}
                      className="bg-yellow-50 border-l-4 border-yellow-500 p-2 rounded-r-lg"
                    >
                      <p className="text-sm text-yellow-900 capitalize">
                        {baggage.replace(/_/g, " ")}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Context Optimization */}
      {contextFactors.contextOptimization && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Target className="w-4 h-4 text-green-600" />
            Context Optimization
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contextFactors.contextOptimization.idealTiming && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-gray-600">
                  Ideal Timing:
                </span>
                <p className="text-sm text-gray-800">
                  {contextFactors.contextOptimization.idealTiming}
                </p>
              </div>
            )}
            {contextFactors.contextOptimization.idealEnvironment && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-gray-600">
                  Ideal Environment:
                </span>
                <p className="text-sm text-gray-800">
                  {contextFactors.contextOptimization.idealEnvironment}
                </p>
              </div>
            )}
          </div>

          {contextFactors.contextOptimization.preparationNeeded?.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Preparation Needed:
              </span>
              <div className="space-y-1">
                {contextFactors.contextOptimization.preparationNeeded.map(
                  (prep, index) => (
                    <div key={`prep-${index}`} className="flex gap-2">
                      <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{prep}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {contextFactors.contextOptimization.barriersToRemove?.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600">
                Barriers to Remove:
              </span>
              <div className="flex flex-wrap gap-2">
                {contextFactors.contextOptimization.barriersToRemove.map(
                  (barrier, index) => (
                    <Badge key={`barrier-${index}`} variant="destructive">
                      {barrier}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Context Insights */}
      {contextFactors.contextInsights?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" />
            Context Insights
          </h4>
          <div className="space-y-2">
            {contextFactors.contextInsights.map((insight, index) => (
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

      {/* Context Recommendations */}
      {contextFactors.contextRecommendations?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {contextFactors.contextRecommendations.map(
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

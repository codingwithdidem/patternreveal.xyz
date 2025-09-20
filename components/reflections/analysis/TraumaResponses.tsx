import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  User,
  Users,
  Brain,
  Heart,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface TraumaResponsesProps {
  analysisReport: AnalysisType;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild":
      return "bg-green-100 text-green-800 border-green-200";
    case "moderate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "severe":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "extreme":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getActivationColor = (activation: string) => {
  switch (activation) {
    case "none":
      return "bg-green-100 text-green-800";
    case "mild":
      return "bg-yellow-100 text-yellow-800";
    case "moderate":
      return "bg-orange-100 text-orange-800";
    case "severe":
      return "bg-red-100 text-red-800";
    case "extreme":
    case "overwhelming":
      return "bg-red-200 text-red-900";
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

const getResponseIcon = (response: string) => {
  switch (response) {
    case "fight":
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    case "flight":
      return <Shield className="w-4 h-4 text-blue-600" />;
    case "freeze":
      return <Brain className="w-4 h-4 text-gray-600" />;
    case "fawn":
      return <Heart className="w-4 h-4 text-pink-600" />;
    default:
      return <Shield className="w-4 h-4 text-gray-600" />;
  }
};

export default function TraumaResponses({
  analysisReport,
}: TraumaResponsesProps) {
  const traumaResponses = analysisReport.traumaResponses;

  if (!traumaResponses) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Trauma response analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get trauma response insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold">Trauma Responses</h3>
      </div>

      {/* Primary Responses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Your Primary Response
          </h4>
          <div className="flex items-center gap-2">
            {getResponseIcon(traumaResponses.yourPrimaryResponse || "none")}
            <Badge variant="outline" className="capitalize">
              {traumaResponses.yourPrimaryResponse?.replace(/_/g, " ") ||
                "None detected"}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Their Primary Response
          </h4>
          <div className="flex items-center gap-2">
            {getResponseIcon(traumaResponses.theirPrimaryResponse || "unknown")}
            <Badge variant="outline" className="capitalize">
              {traumaResponses.theirPrimaryResponse?.replace(/_/g, " ") ||
                "Unknown"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Trauma Triggers */}
      {traumaResponses.traumaTriggers?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Trauma Triggers</h4>
          <div className="flex flex-wrap gap-2">
            {traumaResponses.traumaTriggers.map((trigger, index) => (
              <Badge
                key={`trigger-${index}-${trigger.slice(0, 20)}`}
                variant="destructive"
                className="capitalize"
              >
                {trigger.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Coping Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {traumaResponses.healthyCopingUsed?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">
              Healthy Coping Used
            </h4>
            <div className="space-y-2">
              {traumaResponses.healthyCopingUsed.map((strategy, index) => (
                <div
                  key={`healthy-${index}-${strategy.slice(0, 20)}`}
                  className="flex gap-2 p-2 bg-green-50 rounded border-l-4 border-green-500"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {traumaResponses.unhealthyCopingUsed?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">
              Unhealthy Coping Used
            </h4>
            <div className="space-y-2">
              {traumaResponses.unhealthyCopingUsed.map((strategy, index) => (
                <div
                  key={`unhealthy-${index}-${strategy.slice(0, 20)}`}
                  className="flex gap-2 p-2 bg-red-50 rounded border-l-4 border-red-500"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Text Evidence */}
      {traumaResponses.textEvidence?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Text Evidence</h4>
          <div className="space-y-2">
            {traumaResponses.textEvidence.map((evidence, index) => (
              <div
                key={`evidence-${index}-${
                  evidence.quote?.slice(0, 20) || "unknown"
                }`}
                className="p-3 bg-gray-50 rounded border-l-4 border-gray-500"
              >
                <blockquote className="text-sm italic text-gray-700 mb-2">
                  &quot;{evidence.quote}&quot;
                </blockquote>
                {evidence.analysis && (
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Analysis:</span>{" "}
                    {evidence.analysis}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detected Patterns */}
      {traumaResponses.detectedPatterns?.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">
            Detected Trauma Patterns
          </h4>
          <div className="space-y-4">
            {traumaResponses.detectedPatterns.map((pattern, index) => (
              <div
                key={`pattern-${index}-${
                  pattern.pattern?.slice(0, 20) || "unknown"
                }`}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {pattern.pattern?.replace(/_/g, " ") || "Unknown pattern"}
                    </Badge>
                    <Badge
                      className={getSeverityColor(pattern.severity || "mild")}
                    >
                      {pattern.severity || "mild"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {getWhoExhibitedIcon(pattern.who_exhibited || "you")}
                    <span className="capitalize">
                      {pattern.who_exhibited || "you"}
                    </span>
                  </div>
                </div>

                {pattern.quote && (
                  <div className="mb-3">
                    <blockquote className="text-sm italic text-gray-700 bg-white p-3 rounded border-l-4 border-orange-500">
                      &quot;{pattern.quote}&quot;
                    </blockquote>
                  </div>
                )}

                {pattern.impact && (
                  <div className="mb-3">
                    <h5 className="font-medium text-sm text-gray-600 mb-1">
                      Impact:
                    </h5>
                    <p className="text-sm text-gray-700">{pattern.impact}</p>
                  </div>
                )}

                {pattern.trigger && (
                  <div className="mb-3">
                    <h5 className="font-medium text-sm text-gray-600 mb-1">
                      Trigger:
                    </h5>
                    <p className="text-sm text-gray-700">{pattern.trigger}</p>
                  </div>
                )}

                {pattern.copingStrategy && (
                  <div className="mb-3">
                    <h5 className="font-medium text-sm text-gray-600 mb-1">
                      Coping Strategy:
                    </h5>
                    <p className="text-sm text-gray-700">
                      {pattern.copingStrategy}
                    </p>
                  </div>
                )}

                {pattern.suggestedHealing && (
                  <div>
                    <h5 className="font-medium text-sm text-gray-600 mb-1">
                      Suggested Healing:
                    </h5>
                    <p className="text-sm text-gray-700">
                      {pattern.suggestedHealing}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights & Recommendations */}
      {traumaResponses.healingRecommendations?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Healing Recommendations
          </h4>
          <div className="space-y-2">
            {traumaResponses.healingRecommendations.map(
              (recommendation, index) => (
                <div
                  key={`recommendation-${index}-${recommendation.slice(0, 20)}`}
                  className="p-3 bg-green-50 rounded border-l-4 border-green-500"
                >
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

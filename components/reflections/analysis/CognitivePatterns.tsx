import { Badge } from "@/components/ui/badge";
import { Brain, AlertTriangle, User, Users, Zap, Shield } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface CognitivePatternsProps {
  analysisReport: AnalysisType;
}

// Helper functions for styling
const getPerspectiveColor = (level: string) => {
  switch (level) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "limited":
      return "bg-yellow-100 text-yellow-800";
    case "poor":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTrapColor = (trap: string) => {
  switch (trap) {
    case "catastrophizing":
    case "black_and_white":
    case "personalization":
    case "emotional_reasoning":
      return "bg-red-100 text-red-800";
    case "mind_reading":
    case "fortune_telling":
    case "jumping_to_conclusions":
      return "bg-orange-100 text-orange-800";
    case "overgeneralization":
    case "filtering":
    case "control_fallacies":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CognitivePatterns({
  analysisReport,
}: CognitivePatternsProps) {
  const cognitivePatterns = analysisReport.cognitivePatterns;

  if (!cognitivePatterns) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Cognitive pattern analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get cognitive insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Cognitive Patterns</h3>
      </div>

      {/* Thinking Traps */}
      {cognitivePatterns.thinkingTraps?.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            Thinking Traps Identified
          </h4>
          <div className="space-y-4">
            {cognitivePatterns.thinkingTraps.map((trap, index) => (
              <div
                key={`trap-${index}-${trap.trap.slice(0, 20)}`}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="font-medium capitalize">
                      {trap.trap?.replace(/_/g, " ") || "Unknown trap"}
                    </span>
                  </div>
                  <Badge className={getTrapColor(trap.trap || "unknown")}>
                    {trap.trap?.replace(/_/g, " ") || "Unknown"}
                  </Badge>
                </div>

                {trap.quote && (
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg">
                    <blockquote className="text-sm italic text-orange-900">
                      &quot;{trap.quote}&quot;
                    </blockquote>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trap.explanation && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Explanation:
                      </span>
                      <p className="text-sm text-gray-800">
                        {trap.explanation}
                      </p>
                    </div>
                  )}
                  {trap.impact && (
                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Impact:
                      </span>
                      <p className="text-sm text-gray-800">{trap.impact}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cognitive Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Perspective Taking
          </h4>
          <Badge
            className={getPerspectiveColor(
              cognitivePatterns.perspectiveTaking || "poor"
            )}
          >
            {cognitivePatterns.perspectiveTaking?.replace(/_/g, " ") ||
              "Not assessed"}
          </Badge>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Emotional Reasoning
          </h4>
          <Badge
            variant={
              cognitivePatterns.emotionalReasoning ? "destructive" : "default"
            }
          >
            {cognitivePatterns.emotionalReasoning ? "Present" : "Minimal"}
          </Badge>
        </div>
      </div>

      {/* Assumptions Made */}
      {cognitivePatterns.assumptionsMade?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Assumptions Made
          </h4>
          <div className="space-y-2">
            {cognitivePatterns.assumptionsMade.map((assumption, index) => (
              <div
                key={`assumption-${index}-${assumption.slice(0, 20)}`}
                className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg"
              >
                <p className="text-sm text-yellow-900">{assumption}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Text Evidence */}
      {cognitivePatterns.textEvidence?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Text Evidence</h4>
          <div className="space-y-3">
            {cognitivePatterns.textEvidence.map((evidence, index) => (
              <div
                key={`evidence-${index}-${evidence.quote?.slice(0, 20)}`}
                className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-r-lg"
              >
                <blockquote className="text-sm italic text-purple-900 mb-2">
                  &quot;{evidence.quote}&quot;
                </blockquote>
                {evidence.analysis && (
                  <p className="text-xs text-purple-800">{evidence.analysis}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

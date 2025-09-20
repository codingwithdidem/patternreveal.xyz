import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface CommunicationPatternsProps {
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

const getStyleColor = (style: string) => {
  switch (style) {
    case "assertive":
      return "bg-green-100 text-green-800";
    case "collaborative":
      return "bg-blue-100 text-blue-800";
    case "passive":
      return "bg-yellow-100 text-yellow-800";
    case "aggressive":
      return "bg-red-100 text-red-800";
    case "passive_aggressive":
      return "bg-orange-100 text-orange-800";
    case "avoidant":
      return "bg-gray-100 text-gray-800";
    case "dismissive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getResolutionColor = (resolution: string) => {
  switch (resolution) {
    case "collaborative":
      return "bg-green-100 text-green-800";
    case "compromising":
      return "bg-blue-100 text-blue-800";
    case "accommodating":
      return "bg-yellow-100 text-yellow-800";
    case "avoiding":
      return "bg-red-100 text-red-800";
    case "competitive":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getListeningColor = (effectiveness: string) => {
  switch (effectiveness) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "fair":
      return "bg-yellow-100 text-yellow-800";
    case "poor":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CommunicationPatterns({
  analysisReport,
}: CommunicationPatternsProps) {
  const communicationPatterns = analysisReport.communicationPatterns;

  if (!communicationPatterns) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Communication patterns analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get communication insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Communication Patterns</h3>
      </div>

      {/* Detected Patterns */}
      {communicationPatterns.detectedPatterns?.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">
            Detected Communication Patterns
          </h4>
          <div className="space-y-4">
            {communicationPatterns.detectedPatterns.map((pattern, index) => (
              <div
                key={`pattern-${index}-${pattern.pattern.slice(0, 20)}`}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
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

      {/* Communication Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Communication Style
          </h4>
          <div className="space-y-3">
            {communicationPatterns.overallCommunicationStyle && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overall Style:</span>
                <Badge
                  className={getStyleColor(
                    communicationPatterns.overallCommunicationStyle
                  )}
                >
                  {communicationPatterns.overallCommunicationStyle.replace(
                    /_/g,
                    " "
                  )}
                </Badge>
              </div>
            )}
            {communicationPatterns.conflictResolutionStyle && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Conflict Resolution:
                </span>
                <Badge
                  className={getResolutionColor(
                    communicationPatterns.conflictResolutionStyle
                  )}
                >
                  {communicationPatterns.conflictResolutionStyle.replace(
                    /_/g,
                    " "
                  )}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            Communication Quality
          </h4>
          <div className="space-y-3">
            {communicationPatterns.listeningEffectiveness && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Listening:</span>
                <Badge
                  className={getListeningColor(
                    communicationPatterns.listeningEffectiveness
                  )}
                >
                  {communicationPatterns.listeningEffectiveness}
                </Badge>
              </div>
            )}
            {communicationPatterns.boundariesMaintained !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Boundaries:</span>
                <Badge
                  variant={
                    communicationPatterns.boundariesMaintained
                      ? "default"
                      : "destructive"
                  }
                >
                  {communicationPatterns.boundariesMaintained
                    ? "Maintained"
                    : "Not Maintained"}
                </Badge>
              </div>
            )}
            {communicationPatterns.resolutionAchieved !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resolution:</span>
                <Badge
                  variant={
                    communicationPatterns.resolutionAchieved
                      ? "default"
                      : "secondary"
                  }
                >
                  {communicationPatterns.resolutionAchieved
                    ? "Achieved"
                    : "Not Achieved"}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Needs Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communicationPatterns.expressedNeeds?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Expressed Needs
            </h4>
            <div className="space-y-2">
              {communicationPatterns.expressedNeeds.map((need, index) => (
                <div
                  key={`expressed-need-${index}-${need.slice(0, 20)}`}
                  className="flex gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{need}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {communicationPatterns.unmetNeeds?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              Unmet Needs
            </h4>
            <div className="space-y-2">
              {communicationPatterns.unmetNeeds.map((need, index) => (
                <div
                  key={`unmet-need-${index}-${need.slice(0, 20)}`}
                  className="flex gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{need}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Escalation Triggers */}
      {communicationPatterns.escalationTriggers?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-600" />
            Escalation Triggers
          </h4>
          <div className="flex flex-wrap gap-2">
            {communicationPatterns.escalationTriggers.map((trigger, index) => (
              <Badge
                key={`trigger-${index}-${trigger.slice(0, 10)}`}
                variant="destructive"
              >
                {trigger}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Text Evidence */}
      {communicationPatterns.textEvidence?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-purple-600" />
            Text Evidence
          </h4>
          <div className="space-y-3">
            {communicationPatterns.textEvidence.map((evidence, index) => (
              <div
                key={`evidence-${index}-${evidence.quote?.slice(0, 20)}`}
                className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg"
              >
                <blockquote className="text-sm italic text-blue-900 mb-2">
                  &quot;{evidence.quote}&quot;
                </blockquote>
                {evidence.analysis && (
                  <p className="text-xs text-blue-800">{evidence.analysis}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

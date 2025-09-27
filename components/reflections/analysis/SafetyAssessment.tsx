import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface SafetyAssessmentProps {
  analysisReport: AnalysisType;
}

export default function SafetyAssessment({
  analysisReport,
}: SafetyAssessmentProps) {
  const abuseDetection = analysisReport.abuseDetection;

  return (
    <Card
      className={cn(
        "border-2",
        abuseDetection?.isAbusive ? "border-red-500" : "border-green-500"
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Safety Assessment
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge
            variant={abuseDetection?.isAbusive ? "destructive" : "default"}
          >
            {abuseDetection?.isAbusive
              ? "Concerning Behavior Detected"
              : "No Abuse Detected"}
          </Badge>
          {abuseDetection?.isAtImmediateRisk && (
            <Badge variant="destructive">⚠️ Immediate Risk</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detected Abusive Behaviors */}
        {abuseDetection?.detectedAbusiveBehaviors?.length &&
          abuseDetection.detectedAbusiveBehaviors.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-red-700">
                Detected Concerning Behaviors
              </h4>
              {abuseDetection.detectedAbusiveBehaviors.map(
                (behavior, index) => (
                  <div
                    key={`behavior-${index}-${behavior?.behavior || "unknown"}`}
                    className="p-4 border-2 border-red-200 rounded-lg space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="uppercase">
                        {behavior.type}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-red-900">
                        <strong>
                          {behavior.behavior?.replace(/_/g, " ") ||
                            "Unknown behavior"}
                        </strong>
                      </p>
                      <p className="text-xs text-red-700">
                        <strong>Quote:</strong> "
                        {behavior.quote || "No quote available"}"
                      </p>
                      <p className="text-xs text-red-700">
                        <strong>Impact:</strong>{" "}
                        {behavior.impact || "No impact description"}
                      </p>
                      {behavior.reasonings?.length &&
                        behavior.reasonings.length > 0 && (
                          <div>
                            <p className="text-xs text-red-700 font-medium mb-1">
                              Why this is abusive:
                            </p>
                            <ul className="text-xs text-red-700 space-y-1">
                              {behavior.reasonings.map(
                                (reason, reasonIndex) => (
                                  <li
                                    key={`reason-${index}-${reason}`}
                                    className="flex items-start gap-1"
                                  >
                                    <span className="text-red-500 mt-0.5">
                                      •
                                    </span>
                                    <span>{reason}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

        {/* Abuse Triggers */}
        {abuseDetection?.abuseTriggers?.length &&
          abuseDetection.abuseTriggers.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-red-700">Common Triggers</h4>
              <div className="flex flex-wrap gap-2">
                {abuseDetection.abuseTriggers.map((trigger, index) => (
                  <Badge
                    key={`trigger-${index}-${trigger}`}
                    variant="outline"
                    className="text-xs text-red-700 border-red-300"
                  >
                    {trigger}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {/* Warning Signs */}
        {abuseDetection?.warningSigns?.length &&
          abuseDetection.warningSigns.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-red-700">Warning Signs</h4>
              <div className="space-y-2">
                {abuseDetection.warningSigns.map((sign, index) => (
                  <div
                    key={`sign-${index}-${sign}`}
                    className="flex items-start gap-2 text-sm text-red-700"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Suggested Actions */}
        {abuseDetection?.suggestedActionsToTake?.length &&
          abuseDetection.suggestedActionsToTake.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Recommended Actions</h4>
              <div className="space-y-2">
                {abuseDetection.suggestedActionsToTake.map((action, index) => (
                  <div
                    key={`action-${index}-${action}`}
                    className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}

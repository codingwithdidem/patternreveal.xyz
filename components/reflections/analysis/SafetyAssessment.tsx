import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface SafetyAssessmentProps {
  analysisReport: AnalysisType;
}

export default function SafetyAssessment({
  analysisReport,
}: SafetyAssessmentProps) {
  return (
    <Card
      className={cn(
        "border-2",
        analysisReport.abuseDetection?.isAbusive
          ? "border-red-500"
          : "border-green-500"
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Safety Assessment
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge
            variant={
              analysisReport.abuseDetection?.isAbusive
                ? "destructive"
                : "default"
            }
          >
            {analysisReport.abuseDetection?.isAbusive
              ? "Concerning Behavior Detected"
              : "No Abuse Detected"}
          </Badge>
          <Badge
            variant={
              analysisReport.abuseDetection?.isAtImmediateRisk
                ? "destructive"
                : "default"
            }
          >
            {analysisReport.abuseDetection?.isAtImmediateRisk
              ? "Immediate Risk"
              : "No Immediate Risk"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detected Abusive Behaviors */}
        {analysisReport.abuseDetection?.detectedAbusiveBehaviors?.length >
          0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-red-700">
              Detected Concerning Behaviors
            </h4>
            {analysisReport.abuseDetection.detectedAbusiveBehaviors.map(
              (behavior, index) => (
                <div
                  key={index}
                  className="p-4 border-2 border-red-200 rounded-lg space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="uppercase">
                      {behavior.type}
                    </Badge>
                    <span className="font-medium">
                      Severity: {behavior.severity}
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {behavior.frequency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {behavior.description}
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Risk Factors */}
        {analysisReport.abuseDetection?.riskFactors?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-red-700">Risk Factors</h4>
            <div className="flex flex-wrap gap-2">
              {analysisReport.abuseDetection.riskFactors.map(
                (factor, index) => (
                  <Badge
                    key={index}
                    variant="destructive"
                    className="capitalize"
                  >
                    {factor.replace(/_/g, " ")}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        {/* Protective Factors */}
        {analysisReport.abuseDetection?.protectiveFactors?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-green-700">Protective Factors</h4>
            <div className="space-y-2">
              {analysisReport.abuseDetection.protectiveFactors.map(
                (factor, index) => (
                  <div key={index} className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm capitalize">
                      {factor.replace(/_/g, " ")}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Safety Recommendations */}
        {analysisReport.abuseDetection?.safetyRecommendations?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Safety Recommendations</h4>
            <div className="space-y-2">
              {analysisReport.abuseDetection.safetyRecommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Suggested Actions */}
        {analysisReport.abuseDetection?.suggestedActionsToTake?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Recommended Actions</h4>
            <div className="space-y-2">
              {analysisReport.abuseDetection.suggestedActionsToTake.map(
                (action, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{action}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Suggested Resources */}
        {analysisReport.abuseDetection?.suggestedResources?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Support Resources</h4>
            <div className="space-y-2">
              {analysisReport.abuseDetection.suggestedResources.map(
                (resource, index) => (
                  <Link
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-purple-900 hover:underline">
                      {resource.title}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

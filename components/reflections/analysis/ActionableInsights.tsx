import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  Zap,
  Star,
  Lightbulb,
  AlertTriangle,
  Heart,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ActionableInsightsProps {
  analysisReport: AnalysisType;
}

export default function ActionableInsights({
  analysisReport,
}: ActionableInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Actionable Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Immediate Actions */}
        {analysisReport.actionableInsights?.immediateActions?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-red-700">Immediate Actions</h4>
            <div className="space-y-2">
              {analysisReport.actionableInsights.immediateActions.map(
                (action, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <Zap className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{action}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Short-term Goals */}
        {analysisReport.actionableInsights?.shortTermGoals?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-orange-700">Short-term Goals</h4>
            <div className="space-y-2">
              {analysisReport.actionableInsights.shortTermGoals.map(
                (goal, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-orange-50 rounded-lg"
                  >
                    <Target className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{goal}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Long-term Goals */}
        {analysisReport.actionableInsights?.longTermGoals?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-700">Long-term Goals</h4>
            <div className="space-y-2">
              {analysisReport.actionableInsights.longTermGoals.map(
                (goal, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{goal}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Resources Needed */}
        {analysisReport.actionableInsights?.resourcesNeeded?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-purple-700">Resources Needed</h4>
            <div className="space-y-2">
              {analysisReport.actionableInsights.resourcesNeeded.map(
                (resource, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-purple-50 rounded-lg"
                  >
                    <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm capitalize">
                      {resource.replace(/_/g, " ")}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Warning Signs */}
        {analysisReport.actionableInsights?.warningSignsToWatch?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-orange-700">
              Warning Signs to Watch
            </h4>
            <div className="space-y-2">
              {analysisReport.actionableInsights.warningSignsToWatch.map(
                (sign, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm capitalize">
                      {sign.replace(/_/g, " ")}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Self-Care Recommendations */}
        {analysisReport.actionableInsights?.selfCareRecommendations?.length >
          0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-green-700">
              Self-Care Recommendations
            </h4>
            <div className="space-y-2">
              {analysisReport.actionableInsights.selfCareRecommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-green-50 rounded-lg"
                  >
                    <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

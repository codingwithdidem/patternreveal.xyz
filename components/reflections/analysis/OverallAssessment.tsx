import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";
import {
  CheckCircle,
  AlertTriangle,
  Star,
  Brain,
  Copy,
  Check,
} from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface OverallAssessmentProps {
  analysisReport: AnalysisType;
}

export default function OverallAssessment({
  analysisReport,
}: OverallAssessmentProps) {
  const assessment = analysisReport?.overallAssessment;
  const { isCopied, copy } = useCopyToClipboard({
    timeout: 2000,
    onSuccess: () => {
      // Optional: Add toast notification here if needed
    },
  });
  const healthScore = assessment?.healthScore || 0;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 6) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (score >= 4) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Needs Work";
    return "Concerning";
  };

  return (
    <div className="space-y-6">
      {/* Relationship Health Assessment - Compact Top Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border border-slate-200/60">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 mb-1">
                Relationship Health Assessment
              </h1>
              <p className="text-sm text-slate-600">
                Comprehensive analysis of your relationship patterns and
                dynamics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  assessment?.confidenceLevel === "high"
                    ? "default"
                    : "secondary"
                }
                className="px-2 py-1 text-xs font-medium"
              >
                {assessment?.confidenceLevel || "medium"} confidence
              </Badge>
            </div>
          </div>

          {/* Compact Health Score */}
          <div className="flex items-center gap-6">
            <div
              className={cn(
                "w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg flex-shrink-0",
                getScoreColor(healthScore)
              )}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{healthScore}/10</div>
                <div className="text-xs font-medium">
                  {getScoreLabel(healthScore)}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Overall Health Score
              </h3>
              <p className="text-xs text-slate-600">
                Based on comprehensive pattern analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {assessment?.summary && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Overview</h2>
            <button
              type="button"
              onClick={() => copy(assessment?.summary || "")}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title={isCopied ? "Copied!" : "Copy summary"}
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed text-base">
              {assessment?.summary}
            </p>
          </div>
        </div>
      )}

      {/* Insights Vertical Layout */}
      {assessment && (
        <div className="space-y-6">
          {/* Key Insights */}
          {assessment?.keyInsights?.length > 0 && (
            <div className="border-blue-200 bg-blue-50/50 rounded-lg p-4">
              <h3 className="flex items-center gap-2 text-base font-semibold text-blue-800 mb-3">
                <Brain className="w-4 h-4 text-blue-600" />
                Key Insights
              </h3>
              <div className="space-y-2">
                {assessment?.keyInsights?.map((insight, index) => (
                  <div
                    key={`insight-${index}-${insight.slice(0, 20)}`}
                    className="flex gap-3 p-3 bg-white rounded-lg border border-blue-200/50"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-900">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning Flags */}
          {assessment.warningFlags?.length > 0 && (
            <div className="border-orange-200 bg-orange-50/50 rounded-lg p-4">
              <h3 className="flex items-center gap-2 text-base font-semibold text-orange-800 mb-3">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Areas to Monitor
              </h3>
              <div className="space-y-2">
                {assessment?.warningFlags?.map((flag, index) => (
                  <div
                    key={`warning-${index}-${flag.slice(0, 20)}`}
                    className="flex gap-3 p-3 bg-white rounded-lg border border-orange-200/50"
                  >
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-orange-900">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Positive Highlights */}
          {assessment?.positiveHighlights?.length > 0 && (
            <div className="border-green-200 bg-green-50/50 rounded-lg p-4">
              <h3 className="flex items-center gap-2 text-base font-semibold text-green-800 mb-3">
                <Star className="w-4 h-4 text-green-600" />
                Positive Highlights
              </h3>
              <div className="space-y-2">
                {assessment?.positiveHighlights?.map((highlight, index) => (
                  <div
                    key={`highlight-${index}-${highlight.slice(0, 20)}`}
                    className="flex gap-3 p-3 bg-white rounded-lg border border-green-200/50"
                  >
                    <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-900">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

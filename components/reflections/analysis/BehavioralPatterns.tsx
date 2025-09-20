import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  Target,
  TrendingUp,
  Star,
  Zap,
  MessageCircle,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface BehavioralPatternsProps {
  analysisReport: AnalysisType;
}

const TextEvidenceDisplay = ({
  evidence,
}: {
  evidence: Array<{ quote: string; analysis: string }>;
}) => {
  if (!evidence?.length) return null;

  return (
    <div className="space-y-3 mt-4">
      <h5 className="font-medium text-sm flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Supporting Evidence
      </h5>
      <div className="space-y-3">
        {evidence.map((item, index) => (
          <div
            key={index}
            className="bg-slate-50 p-3 rounded-lg border-l-4 border-blue-500"
          >
            <blockquote className="text-sm italic text-slate-700 mb-2">
              &quot;{item.quote}&quot;
            </blockquote>
            <p className="text-xs text-slate-600">{item.analysis}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function BehavioralPatterns({
  analysisReport,
}: BehavioralPatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Behavioral Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detected Patterns */}
        {analysisReport.behaviorPatterns?.detectedPatterns?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Detected Behavioral Patterns</h4>
            <div className="space-y-3">
              {analysisReport.behaviorPatterns.detectedPatterns.map(
                (pattern, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">
                        {pattern.pattern.replace(/_/g, " ")}
                      </span>
                      <Badge variant="outline" className="capitalize">
                        {pattern.frequency}
                      </Badge>
                      <Badge
                        variant={
                          pattern.severity === "high"
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {pattern.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pattern.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Behavioral Triggers */}
        {analysisReport.behaviorPatterns?.behavioralTriggers?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Behavioral Triggers</h4>
            <div className="flex flex-wrap gap-2">
              {analysisReport.behaviorPatterns.behavioralTriggers.map(
                (trigger, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {trigger.replace(/_/g, " ")}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        {/* Coping Mechanisms */}
        {analysisReport.behaviorPatterns?.copingMechanisms?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Coping Mechanisms</h4>
            <div className="space-y-2">
              {analysisReport.behaviorPatterns.copingMechanisms.map(
                (mechanism, index) => (
                  <div key={index} className="flex gap-2">
                    <Activity className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm capitalize">
                      {mechanism.replace(/_/g, " ")}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Behavior Cycles */}
        {analysisReport.behaviorPatterns?.behaviorCycles?.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Behavior Cycles</h4>
            <div className="space-y-3">
              {analysisReport.behaviorPatterns.behaviorCycles.map(
                (cycle, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Trigger:</span>
                      <span className="text-sm">{cycle.trigger}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                      <span className="font-medium">Response:</span>
                      <span className="text-sm">{cycle.response}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Outcome:</span>
                      <span className="text-sm">{cycle.outcome}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysisReport.behaviorPatterns?.yourBehaviorPatterns?.length >
            0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Your Patterns</h4>
              <div className="space-y-2">
                {analysisReport.behaviorPatterns.yourBehaviorPatterns.map(
                  (pattern, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                      {pattern}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {analysisReport.behaviorPatterns?.theirBehaviorPatterns?.length >
            0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Their Patterns</h4>
              <div className="space-y-2">
                {analysisReport.behaviorPatterns.theirBehaviorPatterns.map(
                  (pattern, index) => (
                    <div
                      key={index}
                      className="p-2 bg-purple-50 rounded text-sm"
                    >
                      {pattern}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {analysisReport.behaviorPatterns?.growthOpportunities?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Growth Opportunities
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {analysisReport.behaviorPatterns.growthOpportunities.map(
                (opportunity, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-green-50 rounded-lg"
                  >
                    <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{opportunity}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Behavioral Quotes */}
        {analysisReport.behaviorPatterns?.behavioralQuotes?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Behavioral Evidence</h4>
            <div className="space-y-2">
              {analysisReport.behaviorPatterns.behavioralQuotes.map(
                (quote, index) => (
                  <div
                    key={index}
                    className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500"
                  >
                    <blockquote className="text-sm italic text-purple-900">
                      &quot;{quote}&quot;
                    </blockquote>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <TextEvidenceDisplay
          evidence={analysisReport.behaviorPatterns?.textEvidence || []}
        />
      </CardContent>
    </Card>
  );
}

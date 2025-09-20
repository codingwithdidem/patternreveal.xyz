import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface CognitivePatternsProps {
  analysisReport: AnalysisType;
}

export default function CognitivePatterns({
  analysisReport,
}: CognitivePatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Cognitive Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysisReport.cognitivePatterns ? (
          <>
            {/* Detected Patterns */}
            {analysisReport.cognitivePatterns?.detectedPatterns?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Detected Cognitive Patterns</h4>
                <div className="space-y-3">
                  {analysisReport.cognitivePatterns.detectedPatterns.map(
                    (pattern, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg space-y-2"
                      >
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">
                    Perspective Taking
                  </span>
                  <Badge className="ml-2 capitalize">
                    {analysisReport.cognitivePatterns?.perspectiveTaking ||
                      "Not assessed"}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium">
                    Emotional Reasoning
                  </span>
                  <Badge
                    variant={
                      analysisReport.cognitivePatterns?.emotionalReasoning
                        ? "destructive"
                        : "default"
                    }
                    className="ml-2"
                  >
                    {analysisReport.cognitivePatterns?.emotionalReasoning
                      ? "Present"
                      : "Minimal"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">
                    Cognitive Distortions
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {analysisReport.cognitivePatterns?.cognitiveDistortions?.map(
                      (distortion, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="text-xs capitalize"
                        >
                          {distortion.replace(/_/g, " ")}
                        </Badge>
                      )
                    ) || (
                      <span className="text-sm text-muted-foreground">
                        None detected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Thinking Traps */}
            {analysisReport.cognitivePatterns?.thinkingTraps?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-700">
                  Thinking Traps Identified
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysisReport.cognitivePatterns.thinkingTraps.map(
                    (trap, index) => (
                      <Badge
                        key={index}
                        variant="destructive"
                        className="capitalize"
                      >
                        {trap.replace(/_/g, " ")}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Assumptions Made */}
            {analysisReport.cognitivePatterns?.assumptionsMade?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Assumptions Made</h4>
                <div className="space-y-2">
                  {analysisReport.cognitivePatterns.assumptionsMade.map(
                    (assumption, index) => (
                      <div
                        key={index}
                        className="p-2 bg-yellow-50 rounded text-sm border border-yellow-200"
                      >
                        {assumption}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Cognitive Quotes */}
            {analysisReport.cognitivePatterns?.cognitiveQuotes?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Cognitive Evidence</h4>
                <div className="space-y-2">
                  {analysisReport.cognitivePatterns.cognitiveQuotes.map(
                    (quote, index) => (
                      <div
                        key={index}
                        className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500"
                      >
                        <blockquote className="text-sm italic text-yellow-900">
                          &quot;{quote}&quot;
                        </blockquote>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Cognitive pattern analysis not available for this reflection.
              <br />
              Re-analyze this reflection to get cognitive insights.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface TraumaResponsesProps {
  analysisReport: AnalysisType;
}

export default function TraumaResponses({
  analysisReport,
}: TraumaResponsesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Trauma Responses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysisReport.traumaResponses ? (
          <>
            {/* Trauma Indicators */}
            {analysisReport.traumaResponses?.traumaIndicators?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-700">
                  Trauma Indicators
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysisReport.traumaResponses.traumaIndicators.map(
                    (indicator, index) => (
                      <Badge
                        key={index}
                        variant="destructive"
                        className="capitalize"
                      >
                        {indicator.replace(/_/g, " ")}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Trauma Triggers */}
            {analysisReport.traumaResponses?.traumaTriggers?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-red-700">Trauma Triggers</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisReport.traumaResponses.traumaTriggers.map(
                    (trigger, index) => (
                      <Badge
                        key={index}
                        variant="destructive"
                        className="capitalize"
                      >
                        {trigger.replace(/_/g, " ")}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Trauma Responses */}
            {analysisReport.traumaResponses?.traumaResponses?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Trauma Responses</h4>
                <div className="space-y-2">
                  {analysisReport.traumaResponses.traumaResponses.map(
                    (response, index) => (
                      <div key={index} className="flex gap-2">
                        <Shield className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm capitalize">
                          {response.replace(/_/g, " ")}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Your Response</span>
                  <Badge className="ml-2 capitalize">
                    {analysisReport.traumaResponses?.yourResponse ||
                      "Not detected"}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium">Their Response</span>
                  <Badge className="ml-2 capitalize">
                    {analysisReport.traumaResponses?.theirResponse ||
                      "Not detected"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Trauma Triggered</span>
                  <Badge
                    variant={
                      analysisReport.traumaResponses?.traumaTriggered
                        ? "destructive"
                        : "default"
                    }
                    className="ml-2"
                  >
                    {analysisReport.traumaResponses?.traumaTriggered
                      ? "Yes"
                      : "No"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Coping Strategies */}
            {analysisReport.traumaResponses?.copingStrategiesUsed?.length >
              0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">
                  Healthy Coping Strategies Used
                </h4>
                <div className="space-y-2">
                  {analysisReport.traumaResponses.copingStrategiesUsed.map(
                    (strategy, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-green-50 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strategy}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Trauma Quotes */}
            {analysisReport.traumaResponses?.traumaQuotes?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Trauma Evidence</h4>
                <div className="space-y-2">
                  {analysisReport.traumaResponses.traumaQuotes.map(
                    (quote, index) => (
                      <div
                        key={index}
                        className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500"
                      >
                        <blockquote className="text-sm italic text-red-900">
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
              Trauma response analysis not available for this reflection.
              <br />
              Re-analyze this reflection to get trauma response insights.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

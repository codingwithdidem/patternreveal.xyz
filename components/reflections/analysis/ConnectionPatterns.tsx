import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CheckCircle, AlertTriangle } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ConnectionPatternsProps {
  analysisReport: AnalysisType;
}

export default function ConnectionPatterns({
  analysisReport,
}: ConnectionPatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Connection & Love Languages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysisReport.connectionPatterns ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Connection Style</span>
                  <Badge className="ml-2 capitalize">
                    {analysisReport.connectionPatterns?.connectionStyle ||
                      "Not detected"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Connection Needs</span>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {analysisReport.connectionPatterns?.connectionNeeds?.map(
                      (need, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs capitalize"
                        >
                          {need.replace(/_/g, " ")}
                        </Badge>
                      )
                    ) || (
                      <span className="text-sm text-muted-foreground">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Love Languages */}
            {analysisReport.connectionPatterns?.loveLanguagesExpressed?.length >
              0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Love Languages Expressed</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisReport.connectionPatterns.loveLanguagesExpressed.map(
                    (language, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="capitalize"
                      >
                        {language.replace(/_/g, " ")}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Intimacy Types */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Emotional</span>
                <Badge className="capitalize">
                  {analysisReport.connectionPatterns?.intimacyTypes
                    ?.emotional || "Not assessed"}
                </Badge>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">Physical</span>
                <Badge className="capitalize">
                  {analysisReport.connectionPatterns?.intimacyTypes?.physical ||
                    "Not assessed"}
                </Badge>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">Intellectual</span>
                <Badge className="capitalize">
                  {analysisReport.connectionPatterns?.intimacyTypes
                    ?.intellectual || "Not assessed"}
                </Badge>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">Spiritual</span>
                <Badge className="capitalize">
                  {analysisReport.connectionPatterns?.intimacyTypes
                    ?.spiritual || "Not assessed"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Connection Attempts */}
              {analysisReport.connectionPatterns?.connectionAttempts?.length >
                0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">
                    Connection Attempts
                  </h4>
                  <div className="space-y-2">
                    {analysisReport.connectionPatterns.connectionAttempts.map(
                      (attempt, index) => (
                        <div key={index} className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{attempt}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Connection Barriers */}
              {analysisReport.connectionPatterns?.connectionBarriers?.length >
                0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-700">
                    Connection Barriers
                  </h4>
                  <div className="space-y-2">
                    {analysisReport.connectionPatterns.connectionBarriers.map(
                      (barrier, index) => (
                        <div key={index} className="flex gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{barrier}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Connection Quotes */}
            {analysisReport.connectionPatterns?.connectionQuotes?.length >
              0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Connection Evidence</h4>
                <div className="space-y-2">
                  {analysisReport.connectionPatterns.connectionQuotes.map(
                    (quote, index) => (
                      <div
                        key={index}
                        className="p-3 bg-rose-50 rounded-lg border-l-4 border-rose-500"
                      >
                        <blockquote className="text-sm italic text-rose-900">
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
              Connection pattern analysis not available for this reflection.
              <br />
              Re-analyze this reflection to get connection insights.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

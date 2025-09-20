import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface AttachmentPatternsProps {
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

export default function AttachmentPatterns({
  analysisReport,
}: AttachmentPatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Attachment Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysisReport.attachmentPatterns ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">
                    Your Attachment Style
                  </span>
                  <Badge className="ml-2 capitalize">
                    {analysisReport.attachmentPatterns?.attachmentStyle ||
                      "Not detected"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">
                    Attachment Issues Triggered
                  </span>
                  <Badge
                    variant={
                      analysisReport.attachmentPatterns?.attachmentTriggered
                        ? "destructive"
                        : "default"
                    }
                    className="ml-2"
                  >
                    {analysisReport.attachmentPatterns?.attachmentTriggered
                      ? "Yes"
                      : "No"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Attachment Triggers */}
            {analysisReport.attachmentPatterns?.attachmentTriggers?.length >
              0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Attachment Triggers</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisReport.attachmentPatterns.attachmentTriggers.map(
                    (trigger, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="capitalize"
                      >
                        {trigger.replace(/_/g, " ")}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Attachment Behaviors */}
            {analysisReport.attachmentPatterns?.attachmentBehaviors?.length >
              0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Attachment Behaviors Observed</h4>
                <div className="space-y-2">
                  {analysisReport.attachmentPatterns.attachmentBehaviors.map(
                    (behavior, index) => (
                      <div
                        key={index}
                        className="p-2 bg-blue-50 rounded text-sm"
                      >
                        {behavior}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Attachment Quotes */}
            {analysisReport.attachmentPatterns?.attachmentQuotes?.length >
              0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Attachment Evidence</h4>
                <div className="space-y-2">
                  {analysisReport.attachmentPatterns.attachmentQuotes.map(
                    (quote, index) => (
                      <div
                        key={index}
                        className="p-3 bg-pink-50 rounded-lg border-l-4 border-pink-500"
                      >
                        <blockquote className="text-sm italic text-pink-900">
                          &quot;{quote}&quot;
                        </blockquote>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <TextEvidenceDisplay
              evidence={analysisReport.attachmentPatterns?.textEvidence || []}
            />
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Attachment pattern analysis not available for this reflection.
              <br />
              Re-analyze this reflection to get attachment insights.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

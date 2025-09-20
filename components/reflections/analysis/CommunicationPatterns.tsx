import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, CheckCircle, AlertTriangle } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface CommunicationPatternsProps {
  analysisReport: AnalysisType;
}

const CommunicationStyleDescription = ({ style }: { style: string }) => {
  const descriptions: Record<string, string> = {
    assertive:
      "Direct, honest, and respectful communication that considers both your needs and others'",
    passive:
      "Avoiding conflict, difficulty expressing needs, often leading to resentment",
    aggressive:
      "Forceful communication that prioritizes your needs over others', can be hostile",
    "passive-aggressive":
      "Indirect expression of negative feelings, often through sarcasm or subtle hostility",
    avoidant:
      "Avoiding difficult conversations or conflict, leading to unresolved issues",
    collaborative:
      "Working together to find solutions that benefit everyone involved",
  };

  return (
    <p className="text-xs text-muted-foreground mt-1">
      {descriptions[style] || "Communication approach during this interaction"}
    </p>
  );
};

const ConflictResolutionDescription = ({ style }: { style: string }) => {
  const descriptions: Record<string, string> = {
    collaborative:
      "Working together to find win-win solutions that address everyone's needs",
    competitive:
      "Focusing on winning or being right, often at the expense of the relationship",
    accommodating:
      "Giving in to others' demands while neglecting your own needs",
    avoiding: "Sidestepping conflict entirely, leaving issues unresolved",
    compromising:
      "Finding middle-ground solutions where both parties give up something",
    assertive:
      "Directly addressing issues while respecting both parties' perspectives",
  };

  return (
    <p className="text-xs text-muted-foreground mt-1">
      {descriptions[style] || "Approach to handling disagreements"}
    </p>
  );
};

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

export default function CommunicationPatterns({
  analysisReport,
}: CommunicationPatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Communication Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detected Patterns */}
        {analysisReport.communicationPatterns?.detectedPatterns?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Detected Communication Patterns</h4>
            <div className="space-y-3">
              {analysisReport.communicationPatterns.detectedPatterns.map(
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Communication Style</span>
                <Badge className="capitalize">
                  {analysisReport.communicationPatterns?.communicationStyle ||
                    "Not detected"}
                </Badge>
              </div>
              <CommunicationStyleDescription
                style={
                  analysisReport.communicationPatterns?.communicationStyle ||
                  "unknown"
                }
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Conflict Resolution</span>
                <Badge className="capitalize">
                  {analysisReport.communicationPatterns
                    ?.conflictResolutionStyle || "Not detected"}
                </Badge>
              </div>
              <ConflictResolutionDescription
                style={
                  analysisReport.communicationPatterns
                    ?.conflictResolutionStyle || "unknown"
                }
              />
            </div>

            <div>
              <span className="text-sm font-medium">
                Listening Effectiveness
              </span>
              <Badge
                variant={
                  analysisReport.communicationPatterns
                    ?.listeningEffectiveness === "excellent"
                    ? "default"
                    : "secondary"
                }
                className="ml-2 capitalize"
              >
                {analysisReport.communicationPatterns?.listeningEffectiveness ||
                  "Not assessed"}
              </Badge>
            </div>

            <div>
              <span className="text-sm font-medium">Assertiveness Level</span>
              <Badge
                variant={
                  analysisReport.communicationPatterns?.assertivenessLevel ===
                  "high"
                    ? "default"
                    : "secondary"
                }
                className="ml-2 capitalize"
              >
                {analysisReport.communicationPatterns?.assertivenessLevel ||
                  "Not assessed"}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium">Boundaries Maintained</span>
              <Badge
                variant={
                  analysisReport.communicationPatterns?.boundariesMaintained
                    ? "default"
                    : "destructive"
                }
                className="ml-2"
              >
                {analysisReport.communicationPatterns?.boundariesMaintained
                  ? "Yes"
                  : "No"}
              </Badge>
            </div>

            <div>
              <span className="text-sm font-medium">Resolution Achieved</span>
              <Badge
                variant={
                  analysisReport.communicationPatterns?.resolutionAchieved
                    ? "default"
                    : "secondary"
                }
                className="ml-2"
              >
                {analysisReport.communicationPatterns?.resolutionAchieved
                  ? "Yes"
                  : "No"}
              </Badge>
            </div>

            <div>
              <span className="text-sm font-medium">Boundary Setting</span>
              <Badge
                variant={
                  analysisReport.communicationPatterns?.boundarySetting ===
                  "strong"
                    ? "default"
                    : "secondary"
                }
                className="ml-2 capitalize"
              >
                {analysisReport.communicationPatterns?.boundarySetting ||
                  "Not assessed"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Communication Barriers */}
        {analysisReport.communicationPatterns?.communicationBarriers?.length >
          0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-orange-700">
              Communication Barriers
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysisReport.communicationPatterns.communicationBarriers.map(
                (barrier, index) => (
                  <Badge
                    key={index}
                    variant="destructive"
                    className="capitalize"
                  >
                    {barrier.replace(/_/g, " ")}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysisReport.communicationPatterns?.expressedNeeds?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700">Expressed Needs</h4>
              <div className="space-y-2">
                {analysisReport.communicationPatterns.expressedNeeds.map(
                  (need, index) => (
                    <div key={index} className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{need}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {analysisReport.communicationPatterns?.unmetNeeds?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700">Unmet Needs</h4>
              <div className="space-y-2">
                {analysisReport.communicationPatterns.unmetNeeds.map(
                  (need, index) => (
                    <div key={index} className="flex gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{need}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {analysisReport.communicationPatterns?.escalationTriggers?.length >
          0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Escalation Triggers</h4>
            <div className="flex flex-wrap gap-2">
              {analysisReport.communicationPatterns.escalationTriggers.map(
                (trigger, index) => (
                  <Badge key={index} variant="destructive">
                    {trigger}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        {/* Communication Quotes */}
        {analysisReport.communicationPatterns?.communicationQuotes?.length >
          0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Communication Evidence</h4>
            <div className="space-y-2">
              {analysisReport.communicationPatterns.communicationQuotes.map(
                (quote, index) => (
                  <div
                    key={index}
                    className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500"
                  >
                    <blockquote className="text-sm italic text-green-900">
                      &quot;{quote}&quot;
                    </blockquote>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <TextEvidenceDisplay
          evidence={analysisReport.communicationPatterns?.textEvidence || []}
        />
      </CardContent>
    </Card>
  );
}

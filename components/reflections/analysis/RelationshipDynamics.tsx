import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface RelationshipDynamicsProps {
  analysisReport: AnalysisType;
}

export default function RelationshipDynamics({
  analysisReport,
}: RelationshipDynamicsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Relationship Dynamics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Power Dynamics</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">
                  Initiator:
                </span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.relationshipDynamics?.powerDynamics
                    ?.initiator || "Not detected"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Controller:
                </span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.relationshipDynamics?.powerDynamics
                    ?.controller || "Not detected"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Balance:</span>
                <Badge
                  variant={
                    analysisReport.relationshipDynamics?.powerDynamics
                      ?.balance === "balanced"
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2 capitalize"
                >
                  {analysisReport.relationshipDynamics?.powerDynamics
                    ?.balance || "Not assessed"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Decision Making:
                </span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.relationshipDynamics?.decisionMakingStyle?.replace(
                    /_/g,
                    " "
                  ) || "Not detected"}
                </Badge>
              </div>
            </div>
            {analysisReport.relationshipDynamics?.powerDynamics
              ?.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {analysisReport.relationshipDynamics.powerDynamics.description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Relationship Quality</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Intimacy:</span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.relationshipDynamics?.intimacyLevel?.replace(
                    /_/g,
                    " "
                  ) || "Not assessed"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Trust:</span>
                <Badge
                  variant={
                    analysisReport.relationshipDynamics?.trustLevel === "high"
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2 capitalize"
                >
                  {analysisReport.relationshipDynamics?.trustLevel ||
                    "Not assessed"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Effort:</span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.relationshipDynamics?.effortBalance?.replace(
                    /_/g,
                    " "
                  ) || "Not assessed"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Support System:
                </span>
                <Badge
                  variant={
                    analysisReport.relationshipDynamics?.supportSystem ===
                    "strong"
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2 capitalize"
                >
                  {analysisReport.relationshipDynamics?.supportSystem ||
                    "Not assessed"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Relationship Status</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">
                  Satisfaction:
                </span>
                <Badge
                  variant={
                    analysisReport.relationshipDynamics
                      ?.relationshipSatisfaction === "high"
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2 capitalize"
                >
                  {analysisReport.relationshipDynamics
                    ?.relationshipSatisfaction || "Not assessed"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Commitment:
                </span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.relationshipDynamics?.commitmentLevel ||
                    "Not assessed"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Relationship Quotes */}
        {analysisReport.relationshipDynamics?.relationshipQuotes?.length >
          0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Relationship Evidence</h4>
            <div className="space-y-2">
              {analysisReport.relationshipDynamics.relationshipQuotes.map(
                (quote, index) => (
                  <div
                    key={index}
                    className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500"
                  >
                    <blockquote className="text-sm italic text-indigo-900">
                      &quot;{quote}&quot;
                    </blockquote>
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

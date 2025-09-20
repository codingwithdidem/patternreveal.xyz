import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Star, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ProgressTrackingProps {
  analysisReport: AnalysisType;
}

const TrendIndicator = ({ trend }: { trend: string }) => {
  const config = {
    improving: {
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    declining: {
      icon: TrendingUp,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    stable: {
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    uncertain: {
      icon: AlertTriangle,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
  };

  const {
    icon: Icon,
    color,
    bg,
  } = config[trend as keyof typeof config] || config.uncertain;

  return (
    <div className={cn("flex items-center gap-2 px-3 py-2 rounded-full", bg)}>
      <Icon className={cn("w-4 h-4", color)} />
      <span className={cn("font-medium capitalize", color)}>{trend}</span>
    </div>
  );
};

export default function ProgressTracking({
  analysisReport,
}: ProgressTrackingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Progress & Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Relationship Trend:</span>
          <TrendIndicator
            trend={
              analysisReport.progressTracking?.relationshipHealthTrend ||
              "uncertain"
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Communication Progress</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">
                  Improvement:
                </span>
                <Badge
                  variant={
                    analysisReport.progressTracking
                      ?.communicationImprovement === "improving"
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2 capitalize"
                >
                  {analysisReport.progressTracking?.communicationImprovement ||
                    "Not assessed"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Conflict Resolution:
                </span>
                <Badge
                  variant={
                    analysisReport.progressTracking
                      ?.conflictResolutionProgress === "improving"
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2 capitalize"
                >
                  {analysisReport.progressTracking
                    ?.conflictResolutionProgress || "Not assessed"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Emotional Wellbeing</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Trend:</span>
                <Badge
                  variant={
                    analysisReport.progressTracking?.emotionalWellbeingTrend ===
                    "improving"
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2 capitalize"
                >
                  {analysisReport.progressTracking?.emotionalWellbeingTrend ||
                    "Not assessed"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysisReport.progressTracking?.personalGrowthAreas?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Personal Growth Areas</h4>
              <div className="space-y-2">
                {analysisReport.progressTracking.personalGrowthAreas.map(
                  (area, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                      {area}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {analysisReport.progressTracking?.areasOfConcern?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Areas of Concern</h4>
              <div className="space-y-2">
                {analysisReport.progressTracking.areasOfConcern.map(
                  (area, index) => (
                    <div
                      key={index}
                      className="p-2 bg-orange-50 rounded text-sm"
                    >
                      {area}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Relationship Milestones */}
        {analysisReport.progressTracking?.relationshipMilestones?.length >
          0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Relationship Milestones</h4>
            <div className="space-y-2">
              {analysisReport.progressTracking.relationshipMilestones.map(
                (milestone, index) => (
                  <div key={index} className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{milestone}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Challenges Overcome */}
        {analysisReport.progressTracking?.challengesOvercome?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-green-700">
              Challenges Overcome
            </h4>
            <div className="space-y-2">
              {analysisReport.progressTracking.challengesOvercome.map(
                (challenge, index) => (
                  <div key={index} className="flex gap-2">
                    <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{challenge}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Strengths Identified */}
        {analysisReport.progressTracking?.strengthsIdentified?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Star className="w-4 h-4" />
              Identified Strengths
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {analysisReport.progressTracking.strengthsIdentified.map(
                (strength, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-green-50 rounded-lg"
                  >
                    <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
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

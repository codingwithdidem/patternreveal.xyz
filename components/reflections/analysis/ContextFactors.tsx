import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Calendar, Activity } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ContextFactorsProps {
  analysisReport: AnalysisType;
}

export default function ContextFactors({
  analysisReport,
}: ContextFactorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Context & Environment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Interaction Details</h4>
            <div className="space-y-2">
              <Badge variant="outline" className="capitalize">
                {analysisReport.contextFactors?.interactionType?.replace(
                  /_/g,
                  " "
                ) || "Not specified"}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {analysisReport.contextFactors?.duration || "Not specified"}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {analysisReport.contextFactors?.environment || "Not specified"}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Timing</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="capitalize">
                  {analysisReport.contextFactors?.timeOfDay || "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="capitalize">
                  {analysisReport.contextFactors?.dayOfWeek || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Energy Levels</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Yours:</span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.contextFactors?.energyLevelYours ||
                    "Not assessed"}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Theirs:</span>
                <Badge className="ml-2 capitalize">
                  {analysisReport.contextFactors?.energyLevelTheirs ||
                    "Not assessed"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* External Stressors */}
        {analysisReport.contextFactors?.externalStressors?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">External Stressors</h4>
            <div className="flex flex-wrap gap-2">
              {analysisReport.contextFactors.externalStressors.map(
                (stressor, index) => (
                  <Badge
                    key={index}
                    variant="destructive"
                    className="capitalize"
                  >
                    {stressor.replace(/_/g, " ")}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        {/* Relationship Stage */}
        {analysisReport.contextFactors?.relationshipStage && (
          <div className="space-y-3">
            <h4 className="font-semibold">Relationship Stage</h4>
            <Badge variant="outline" className="capitalize">
              {analysisReport.contextFactors.relationshipStage.replace(
                /_/g,
                " "
              )}
            </Badge>
          </div>
        )}

        {/* Recent Events */}
        {analysisReport.contextFactors?.recentEvents?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Recent Events</h4>
            <div className="space-y-2">
              {analysisReport.contextFactors.recentEvents.map(
                (event, index) => (
                  <div key={index} className="flex gap-2">
                    <Activity className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm capitalize">
                      {event.replace(/_/g, " ")}
                    </span>
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

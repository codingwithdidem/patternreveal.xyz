import { CopyInput } from "@/components/CopyInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface AnalysisProps {
  isLoading: boolean;
  analysisReport: AnalysisType | undefined;
}

export default function Analysis({ isLoading, analysisReport }: AnalysisProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(analysisReport?.suggestedActionsToTake);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-4">
        <Badge variant={analysisReport?.isAbusive ? "destructive" : "default"}>
          {analysisReport?.isAbusive ? "Abusive" : "Not Abusive"}
        </Badge>
        <Badge
          variant={
            analysisReport?.isAtImmediateRisk ? "destructive" : "default"
          }
        >
          {analysisReport?.isAtImmediateRisk
            ? "At Immediate Risk"
            : "Not At Immediate Risk"}
        </Badge>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Detected Abusive Behaviors</CardTitle>
          <CardDescription>
            These are the abusive behaviors detected in your reflection.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {analysisReport?.detectedAbusiveBehaviors.map((behaviour) => (
            <div
              key={behaviour.type}
              className="flex items-center space-x-2 text-sm"
            >
              <div className="flex flex-col gap-1">
                <h2 className="uppercase font-medium">{behaviour.behavior}</h2>
                <div className="flex flex-col gap-1">
                  {behaviour.reasonings.map((reason) => (
                    <div key={reason} className="text-xs">
                      <p>{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggested Actions</CardTitle>
          <CardDescription>
            These are the actions you can take to improve your current
            situation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {analysisReport?.suggestedActionsToTake.map((action) => (
            <div key={action} className="flex items-center space-x-2 text-sm">
              <ArrowRight className="w-5 h-5 shrink-0" />
              <p>{action}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggested Resources</CardTitle>
          <CardDescription>
            These are the resources that can help you improve your current
            situation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {analysisReport?.suggestedResources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.link}
              className="flex items-center space-x-2 text-sm"
            >
              <ArrowRight className="w-5 h-5 shrink-0" />
              <p>{resource.title}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

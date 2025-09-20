import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, Heart, MessageCircle } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface EmotionalPatternsProps {
  analysisReport: AnalysisType;
}

const EmotionIcon = ({ emotion }: { emotion: string }) => {
  const icons: Record<string, React.ReactNode> = {
    joy: "😊",
    sadness: "😢",
    anger: "😠",
    fear: "😨",
    anxiety: "😰",
    love: "🥰",
    frustration: "😤",
    contentment: "😌",
    guilt: "😔",
    shame: "😳",
  };

  return <span className="text-2xl">{icons[emotion] || "😐"}</span>;
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

export default function EmotionalPatterns({
  analysisReport,
}: EmotionalPatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Emotional Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <EmotionIcon
                emotion={
                  analysisReport.emotionalPatterns?.dominantEmotion || "neutral"
                }
              />
              <div>
                <p className="font-semibold capitalize">
                  {analysisReport.emotionalPatterns?.dominantEmotion ||
                    "Not detected"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Dominant emotion
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Emotional Intensity</span>
                <span className="text-sm font-medium">
                  {analysisReport.emotionalPatterns?.emotionalIntensity || 0}
                  /10
                </span>
              </div>
              <Progress
                value={
                  (analysisReport.emotionalPatterns?.emotionalIntensity || 0) *
                  10
                }
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Recovery Time</span>
              <Badge variant="outline" className="capitalize">
                <Clock className="w-3 h-3 mr-1" />
                {analysisReport.emotionalPatterns?.emotionalRecoveryTime ||
                  "Not specified"}
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Emotional Stability</span>
              <Badge
                variant={
                  analysisReport.emotionalPatterns?.emotionalStability ===
                  "stable"
                    ? "default"
                    : "secondary"
                }
                className="capitalize"
              >
                {analysisReport.emotionalPatterns?.emotionalStability ||
                  "Not assessed"}
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Stress Response</span>
              <Badge variant="outline" className="capitalize">
                {analysisReport.emotionalPatterns?.stressResponse ||
                  "Not detected"}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Self-Regulation</span>
              <Badge
                variant={
                  analysisReport.emotionalPatterns?.selfRegulation ===
                  "excellent"
                    ? "default"
                    : "secondary"
                }
                className="capitalize"
              >
                {analysisReport.emotionalPatterns?.selfRegulation ||
                  "Not assessed"}
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Emotional Contagion</span>
              <Badge
                variant={
                  analysisReport.emotionalPatterns?.emotionalContagion
                    ? "destructive"
                    : "default"
                }
              >
                {analysisReport.emotionalPatterns?.emotionalContagion
                  ? "Present"
                  : "Not Detected"}
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Emotional Exhaustion</span>
              <Badge
                variant={
                  analysisReport.emotionalPatterns?.emotionalExhaustion
                    ? "destructive"
                    : "default"
                }
              >
                {analysisReport.emotionalPatterns?.emotionalExhaustion
                  ? "Present"
                  : "Not Detected"}
              </Badge>
            </div>

            {(analysisReport.emotionalPatterns?.moodBeforeInteraction ||
              analysisReport.emotionalPatterns?.moodAfterInteraction) && (
              <div className="space-y-3">
                <span className="text-sm font-medium">Mood Changes</span>
                <div className="flex items-center gap-4">
                  {analysisReport.emotionalPatterns?.moodBeforeInteraction && (
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {analysisReport.emotionalPatterns.moodBeforeInteraction}
                        /10
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Before
                      </div>
                    </div>
                  )}
                  {analysisReport.emotionalPatterns?.moodBeforeInteraction &&
                    analysisReport.emotionalPatterns?.moodAfterInteraction && (
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  {analysisReport.emotionalPatterns?.moodAfterInteraction && (
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {analysisReport.emotionalPatterns.moodAfterInteraction}
                        /10
                      </div>
                      <div className="text-xs text-muted-foreground">After</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specific Emotions */}
        {analysisReport.emotionalPatterns?.specificEmotions?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Specific Emotions</h4>
            <div className="space-y-3">
              {analysisReport.emotionalPatterns.specificEmotions.map(
                (emotion, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <EmotionIcon emotion={emotion.emotion} />
                      <span className="font-medium capitalize">
                        {emotion.emotion}
                      </span>
                      <Badge variant="outline">{emotion.intensity}/10</Badge>
                      <Badge variant="secondary" className="capitalize">
                        {emotion.duration}
                      </Badge>
                    </div>
                    {emotion.triggers?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {emotion.triggers.map((trigger, triggerIndex) => (
                          <Badge
                            key={triggerIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Emotional Patterns */}
        {analysisReport.emotionalPatterns?.emotionalPatterns?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Emotional Patterns</h4>
            <div className="space-y-3">
              {analysisReport.emotionalPatterns.emotionalPatterns.map(
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
                          pattern.impact === "severe"
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {pattern.impact}
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

        {analysisReport.emotionalPatterns?.emotionalTriggers?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Emotional Triggers</h4>
            <div className="flex flex-wrap gap-2">
              {analysisReport.emotionalPatterns.emotionalTriggers.map(
                (trigger, index) => (
                  <Badge key={index} variant="outline">
                    {trigger}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        {/* Emotional Quotes */}
        {analysisReport.emotionalPatterns?.emotionalQuotes?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Emotional Evidence</h4>
            <div className="space-y-2">
              {analysisReport.emotionalPatterns.emotionalQuotes.map(
                (quote, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <blockquote className="text-sm italic text-blue-900">
                      &quot;{quote}&quot;
                    </blockquote>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <TextEvidenceDisplay
          evidence={analysisReport.emotionalPatterns?.textEvidence || []}
        />
      </CardContent>
    </Card>
  );
}

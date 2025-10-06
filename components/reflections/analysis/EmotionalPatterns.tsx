import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  AlertTriangle,
  User,
  Users,
  Zap,
  Target,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface EmotionalPatternsProps {
  analysisReport: AnalysisType;
}

// Helper functions for styling
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild":
      return "bg-blue-100 text-blue-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "severe":
      return "bg-orange-100 text-orange-800";
    case "extreme":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRegulationColor = (regulation: string) => {
  switch (regulation) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "fair":
      return "bg-yellow-100 text-yellow-800";
    case "poor":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getEmotionIcon = (emotion: string) => {
  const icons: Record<string, React.ReactNode> = {
    joy: "😊",
    sadness: "😢",
    anger: "😠",
    fear: "😨",
    anxiety: "😰",
    surprise: "😲",
    disgust: "🤢",
    love: "🥰",
    frustration: "😤",
    contentment: "😌",
    guilt: "😔",
    shame: "😳",
    hurt: "💔",
    disappointment: "😞",
    confusion: "😕",
    excitement: "🤩",
    relief: "😮‍💨",
    jealousy: "😒",
    loneliness: "😔",
    gratitude: "🙏",
    hope: "✨",
    despair: "😩",
    rage: "🤬",
    panic: "😱",
    numbness: "😐",
    overwhelm: "😵",
    peace: "😌",
    longing: "🥺",
    resentment: "😤",
    compassion: "💝",
  };
  return icons[emotion] || "😐";
};

const getWhoExhibitedIcon = (who: string) => {
  switch (who) {
    case "you":
      return <User className="w-4 h-4" />;
    case "them":
      return <User className="w-4 h-4" />;
    case "both":
      return <Users className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

export default function EmotionalPatterns({
  analysisReport,
}: EmotionalPatternsProps) {
  const emotionalPatterns = analysisReport.emotionalPatterns;

  if (!emotionalPatterns) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Emotional patterns analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get emotional insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold">Emotional Patterns</h3>
      </div>

      {/* Emotional Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600" />
            Emotional State
          </h4>
          <div className="space-y-3">
            {emotionalPatterns.dominantEmotion && (
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getEmotionIcon(emotionalPatterns.dominantEmotion)}
                </span>
                <div>
                  <span className="text-sm font-medium capitalize">
                    {emotionalPatterns.dominantEmotion}
                  </span>
                  <p className="text-xs text-gray-600">Dominant emotion</p>
                </div>
              </div>
            )}
            {emotionalPatterns.emotionalRegulation && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Regulation:</span>
                <Badge
                  className={getRegulationColor(
                    emotionalPatterns.emotionalRegulation
                  )}
                >
                  {emotionalPatterns.emotionalRegulation}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-600" />
            Emotional Triggers
          </h4>
          {emotionalPatterns.emotionalTriggers &&
            emotionalPatterns.emotionalTriggers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {emotionalPatterns.emotionalTriggers.map((trigger, index) => (
                  <Badge
                    key={`trigger-${index}-${trigger.slice(0, 10)}`}
                    variant="outline"
                  >
                    {trigger}
                  </Badge>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* Detected Patterns */}
      {emotionalPatterns.detectedPatterns &&
        emotionalPatterns.detectedPatterns.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-700">
              Detected Emotional Patterns
            </h4>
            <div className="space-y-4">
              {emotionalPatterns.detectedPatterns.map((pattern, index) => (
                <div
                  key={`pattern-${index}-${pattern.pattern?.slice(0, 20)}`}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getWhoExhibitedIcon(pattern.who_exhibited || "unknown")}
                      <span className="font-medium capitalize">
                        {pattern.pattern?.replace(/_/g, " ") ||
                          "Unknown pattern"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className={getSeverityColor(pattern.severity || "mild")}
                      >
                        {pattern.severity?.replace(/_/g, " ") || "Unknown"}
                      </Badge>
                    </div>
                  </div>

                  {pattern.quote && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                      <blockquote className="text-sm italic text-blue-900">
                        &quot;{pattern.quote}&quot;
                      </blockquote>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pattern.impact && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Impact:
                        </span>
                        <p className="text-sm text-gray-800">
                          {pattern.impact}
                        </p>
                      </div>
                    )}
                    {pattern.trigger && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Trigger:
                        </span>
                        <p className="text-sm text-gray-800">
                          {pattern.trigger}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pattern.unsustainableBehavior && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Unsustainable Behavior:
                        </span>
                        <p className="text-sm text-red-800">
                          {pattern.unsustainableBehavior}
                        </p>
                      </div>
                    )}
                    {pattern.suggestedBehavior && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Suggested Behavior:
                        </span>
                        <p className="text-sm text-green-800">
                          {pattern.suggestedBehavior}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

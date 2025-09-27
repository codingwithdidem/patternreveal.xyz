import { Badge } from "@/components/ui/badge";
import { Heart, User, Users } from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface AttachmentPatternsProps {
  analysisReport: AnalysisType;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild":
      return "bg-green-100 text-green-800 border-green-200";
    case "moderate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "severe":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "extreme":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
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

const getAttachmentStyleColor = (style: string) => {
  switch (style) {
    case "secure":
      return "bg-green-100 text-green-800 border-green-200";
    case "anxious":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "avoidant":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "disorganized":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function AttachmentPatterns({
  analysisReport,
}: AttachmentPatternsProps) {
  const attachmentPatterns = analysisReport.attachmentPatterns;

  if (!attachmentPatterns) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Attachment pattern analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get attachment insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-pink-600" />
        <h3 className="text-lg font-semibold">Attachment Patterns</h3>
      </div>

      {/* Attachment Styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Your Attachment Style
          </h4>
          <Badge
            className={`capitalize ${getAttachmentStyleColor(
              attachmentPatterns.yourAttachmentStyle || "unknown"
            )}`}
          >
            {attachmentPatterns.yourAttachmentStyle?.replace(/_/g, " ") ||
              "Not detected"}
          </Badge>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Their Attachment Style
          </h4>
          <Badge
            className={`capitalize ${getAttachmentStyleColor(
              attachmentPatterns.theirAttachmentStyle || "unknown"
            )}`}
          >
            {attachmentPatterns.theirAttachmentStyle?.replace(/_/g, " ") ||
              "Not detected"}
          </Badge>
        </div>
      </div>

      {/* Attachment Triggered */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">
          Attachment Issues Triggered
        </h4>
        <Badge
          variant={
            attachmentPatterns.attachmentTriggered ? "destructive" : "default"
          }
          className={
            attachmentPatterns.attachmentTriggered
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }
        >
          {attachmentPatterns.attachmentTriggered ? "Yes" : "No"}
        </Badge>
      </div>

      {/* Detected Patterns */}
      {attachmentPatterns.detectedPatterns &&
        attachmentPatterns.detectedPatterns.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-700">
              Detected Attachment Patterns
            </h4>
            <div className="space-y-4">
              {attachmentPatterns.detectedPatterns.map((pattern, index) => (
                <div
                  key={`pattern-${index}-${
                    pattern.pattern?.slice(0, 20) || "unknown"
                  }`}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {pattern.pattern?.replace(/_/g, " ") ||
                          "Unknown pattern"}
                      </Badge>
                      <Badge
                        className={getSeverityColor(pattern.severity || "mild")}
                      >
                        {pattern.severity || "mild"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      {getWhoExhibitedIcon(pattern.who_exhibited || "you")}
                      <span className="capitalize">
                        {pattern.who_exhibited || "you"}
                      </span>
                    </div>
                  </div>

                  {pattern.quote && (
                    <div className="mb-3">
                      <blockquote className="text-sm italic text-gray-700 bg-white p-3 rounded border-l-4 border-pink-500">
                        &quot;{pattern.quote}&quot;
                      </blockquote>
                    </div>
                  )}

                  {pattern.impact && (
                    <div>
                      <h5 className="font-medium text-sm text-gray-600 mb-1">
                        Impact:
                      </h5>
                      <p className="text-sm text-gray-700">{pattern.impact}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

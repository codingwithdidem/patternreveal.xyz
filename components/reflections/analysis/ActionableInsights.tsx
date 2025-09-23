import { Badge } from "@/components/ui/badge";
import {
  Target,
  Zap,
  Star,
  Lightbulb,
  AlertTriangle,
  Heart,
  MessageCircle,
  Brain,
  Users,
  Calendar,
  BookOpen,
  Phone,
  Clock,
  CheckCircle,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ActionableInsightsProps {
  analysisReport: AnalysisType;
}

export default function ActionableInsights({
  analysisReport,
}: ActionableInsightsProps) {
  const insights = analysisReport.actionableInsights;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "challenging":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "difficult":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Immediate Actions */}
      {insights?.immediateActions?.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Zap className="w-5 h-5 text-red-600" />
            Immediate Actions
          </h3>
          <div className="space-y-4">
            {insights.immediateActions.map((action, index) => {
              // Handle both string and object formats
              const isString = typeof action === "string";
              const actionText = isString
                ? action
                : action.action || String(action);
              const priority = isString
                ? "medium"
                : action.priority || "medium";
              const difficulty = isString
                ? "moderate"
                : action.difficulty || "moderate";
              const timeframe = isString
                ? "Within 24-48 hours"
                : action.timeframe || "Within 24-48 hours";
              const expectedOutcome = isString
                ? "Improved situation"
                : action.expectedOutcome || "Improved situation";
              const reasoning = isString
                ? "This action is important for your wellbeing"
                : action.reasoning ||
                  "This action is important for your wellbeing";

              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">
                      {actionText}
                    </h4>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(priority)}>
                        {priority}
                      </Badge>
                      <Badge className={getDifficultyColor(difficulty)}>
                        {difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        Timeframe:
                      </span>
                      <p className="text-gray-600">{timeframe}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Expected Outcome:
                      </span>
                      <p className="text-gray-600">{expectedOutcome}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Reasoning:
                    </span>
                    <p className="text-gray-600">{reasoning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Communication Strategies */}
      {insights?.communicationStrategies?.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Communication Strategies
          </h3>
          <div className="space-y-4">
            {insights.communicationStrategies.map((strategy, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <h4 className="font-semibold text-gray-900">
                  {strategy.strategy}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      When to Use:
                    </span>
                    <p className="text-gray-600">{strategy.whenToUse}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Expected Result:
                    </span>
                    <p className="text-gray-600">{strategy.expectedResult}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    How to Implement:
                  </span>
                  <p className="text-gray-600">{strategy.howToImplement}</p>
                </div>
                {strategy.examplePhrases?.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">
                      Example Phrases:
                    </span>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {strategy.examplePhrases.map((phrase, phraseIndex) => (
                        <li key={phraseIndex}>"{phrase}"</li>
                      ))}
                    </ul>
                  </div>
                )}
                {strategy.whatToAvoid?.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">
                      What to Avoid:
                    </span>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {strategy.whatToAvoid.map((avoid, avoidIndex) => (
                        <li key={avoidIndex}>{avoid}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emotional Regulation Techniques */}
      {insights?.emotionalRegulationTechniques?.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Brain className="w-5 h-5 text-purple-600" />
            Emotional Regulation Techniques
          </h3>
          <div className="space-y-4">
            {insights.emotionalRegulationTechniques.map((technique, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900">
                    {technique.technique}
                  </h4>
                  <Badge
                    className={
                      technique.effectiveness === "high"
                        ? "bg-green-100 text-green-800"
                        : technique.effectiveness === "moderate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {technique.effectiveness} effectiveness
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Trigger:</span>
                    <p className="text-gray-600">{technique.trigger}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <p className="text-gray-600">{technique.duration}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    When to Use:
                  </span>
                  <p className="text-gray-600">{technique.whenToUse}</p>
                </div>
                {technique.steps?.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Steps:</span>
                    <ol className="list-decimal list-inside text-gray-600 space-y-1">
                      {technique.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning Signs */}
      {insights?.warningSigns?.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Warning Signs
          </h3>
          <div className="space-y-4">
            {insights.warningSigns.map((sign, index) => {
              // Handle both string and object formats
              const isString = typeof sign === "string";
              const signText = isString ? sign : sign.sign || String(sign);
              const severity = isString ? "medium" : sign.severity || "medium";
              const description = isString
                ? "This is a warning sign to watch for"
                : sign.description || "This is a warning sign to watch for";
              const action = isString
                ? "Take appropriate action"
                : sign.action || "Take appropriate action";
              const prevention = isString
                ? "Monitor closely"
                : sign.prevention || "Monitor closely";
              const support = isString
                ? "Seek support if needed"
                : sign.support || "Seek support if needed";

              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">{signText}</h4>
                    <Badge className={getSeverityColor(severity)}>
                      {severity}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Description:
                    </span>
                    <p className="text-gray-600">{description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Action:</span>
                      <p className="text-gray-600">{action}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Prevention:
                      </span>
                      <p className="text-gray-600">{prevention}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Support:</span>
                    <p className="text-gray-600">{support}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resource Recommendations */}
      {insights?.resourceRecommendations?.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Resource Recommendations
          </h3>
          <div className="space-y-4">
            {insights.resourceRecommendations.map((resource, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900">
                    {resource.resource}
                  </h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">{resource.type}</Badge>
                    <Badge
                      className={
                        resource.effectiveness === "high"
                          ? "bg-green-100 text-green-800"
                          : resource.effectiveness === "moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {resource.effectiveness}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Purpose:</span>
                    <p className="text-gray-600">{resource.purpose}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Cost:</span>
                    <p className="text-gray-600">{resource.cost}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Description:
                  </span>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Accessibility:
                  </span>
                  <p className="text-gray-600">{resource.accessibility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Long-term Vision */}
      {insights?.longTermVision?.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Star className="w-5 h-5 text-blue-600" />
            Long-term Vision
          </h3>
          <div className="space-y-4">
            {insights.longTermVision.map((vision, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900">{vision.goal}</h4>
                  <Badge variant="outline">{vision.timeframe}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      Current Reality:
                    </span>
                    <p className="text-gray-600">{vision.currentReality}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Desired Outcome:
                    </span>
                    <p className="text-gray-600">{vision.desiredOutcome}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Steps:</span>
                  <ol className="list-decimal list-inside text-gray-600 space-y-1">
                    {vision.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      Obstacles:
                    </span>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {vision.obstacles.map((obstacle, obstacleIndex) => (
                        <li key={obstacleIndex}>{obstacle}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Support Needed:
                    </span>
                    <p className="text-gray-600">{vision.support}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

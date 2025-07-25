import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Brain,
  Users,
  Target,
  Lightbulb,
  Shield,
  Star,
  Clock,
  Calendar,
  MapPin,
  Zap,
  Activity,
  Sparkles,
  BarChart3,
  Eye,
  Target as TargetIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import AnimatedEmptyState from "@/components/AnimatedEmptyState";
import { Button } from "@/components/ui/button";
import PremiumFeatureBadge from "@/components/PremiumFeatureBadge";

interface AnalysisProps {
  isLoading: boolean;
  analysisReport: AnalysisType | undefined;
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

const HealthScoreIndicator = ({ score }: { score: number }) => {
  const getColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-100";
    if (score >= 6) return "text-yellow-600 bg-yellow-100";
    if (score >= 4) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getLabel = (score: number) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Needs Work";
    return "Concerning";
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl",
          getColor(score)
        )}
      >
        {score}/10
      </div>
      <div>
        <p className="font-semibold text-lg">{getLabel(score)}</p>
        <p className="text-sm text-muted-foreground">Relationship Health</p>
      </div>
    </div>
  );
};

const TrendIndicator = ({ trend }: { trend: string }) => {
  const config = {
    improving: {
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    stable: { icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
    declining: { icon: TrendingDown, color: "text-red-600", bg: "bg-red-100" },
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
      "Withdrawing from difficult conversations, avoiding confrontation entirely",
    dismissive: "Minimizing or invalidating others' concerns and feelings",
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

export default function Analysis({ isLoading, analysisReport }: AnalysisProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Analyzing your reflection...</p>
        </div>
      </div>
    );
  }

  if (!analysisReport) {
    return (
      <AnimatedEmptyState
        title="No Analysis Available"
        description="Get AI-powered insights into your relationship patterns, emotional dynamics, and behavioral cycles. Discover hidden patterns and receive personalized guidance."
        className="min-h-[600px] w-full"
        cardContent={(index) => {
          const cards = [
            {
              icon: <Brain className="w-5 h-5 text-blue-600" />,
              title: "Emotional Patterns",
              description: "Identify triggers and emotional responses",
            },
            {
              icon: <MessageCircle className="w-6 h-6 text-green-600" />,
              title: "Communication Analysis",
              description: "Understand communication dynamics",
            },
            {
              icon: <Activity className="w-6 h-6 text-purple-600" />,
              title: "Behavioral Cycles",
              description: "Recognize recurring patterns",
            },
            {
              icon: <Heart className="w-6 h-6 text-pink-600" />,
              title: "Relationship Health",
              description: "Assess overall relationship quality",
            },
            {
              icon: <Shield className="w-6 h-6 text-orange-600" />,
              title: "Safety Assessment",
              description: "Identify concerning behaviors",
            },
            {
              icon: <TargetIcon className="w-6 h-6 text-indigo-600" />,
              title: "Actionable Insights",
              description: "Get personalized recommendations",
            },
          ];

          const card = cards[index % cards.length];

          return (
            <div className="flex items-start gap-3 w-full">
              <div className="flex-shrink-0 mt-0.5">{card.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 leading-tight">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-500 leading-tight mt-1">
                  {card.description}
                </p>
              </div>
            </div>
          );
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Overall Assessment */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Analysis Overview
                <PremiumFeatureBadge feature="ai-analysis" />
              </CardTitle>
              <CardDescription>
                Comprehensive relationship pattern insights
              </CardDescription>
            </div>
            <Badge
              variant={
                analysisReport.overallAssessment.confidenceLevel === "high"
                  ? "default"
                  : "secondary"
              }
            >
              {analysisReport.overallAssessment.confidenceLevel} confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <HealthScoreIndicator
            score={analysisReport.overallAssessment.healthScore}
          />

          {analysisReport.overallAssessment.keyInsights.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Key Insights
              </h4>
              <div className="space-y-2">
                {analysisReport.overallAssessment.keyInsights.map(
                  (insight, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-900">{insight}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Warning Flags */}
          {analysisReport.overallAssessment.warningFlags.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-orange-700">
                <AlertTriangle className="w-4 h-4" />
                Areas to Monitor
              </h4>
              <div className="space-y-2">
                {analysisReport.overallAssessment.warningFlags.map(
                  (flag, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                    >
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-orange-900">{flag}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Positive Highlights */}
          {analysisReport.overallAssessment.positiveHighlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-green-700">
                <Star className="w-4 h-4" />
                Positive Highlights
              </h4>
              <div className="space-y-2">
                {analysisReport.overallAssessment.positiveHighlights.map(
                  (highlight, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-900">{highlight}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <div className="">
        <Tabs defaultValue="emotional" className="w-full mb-8">
          <TabsList className="flex w-full justify-stretch overflow-x-scroll scrollbar-hide">
            <TabsTrigger className="flex-1" value="emotional">
              Emotional
            </TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger className="w-full" value="behavioral">
              Behavioral
            </TabsTrigger>
            <TabsTrigger className="w-full" value="dynamics">
              Dynamics
            </TabsTrigger>
            <TabsTrigger className="w-full" value="attachment">
              Attachment
            </TabsTrigger>
            <TabsTrigger className="w-full" value="trauma">
              Trauma
            </TabsTrigger>
            <TabsTrigger className="w-full" value="connection">
              Connection
            </TabsTrigger>
            <TabsTrigger className="w-full" value="cognitive">
              Cognitive
            </TabsTrigger>
            <TabsTrigger className="w-full" value="context">
              Context
            </TabsTrigger>
            <TabsTrigger className="w-full" value="progress">
              Progress
            </TabsTrigger>
            <TabsTrigger className="w-full" value="actions">
              Actions
            </TabsTrigger>
            <TabsTrigger className="w-full" value="safety">
              Safety
            </TabsTrigger>
          </TabsList>

          {/* Emotional Patterns */}
          <TabsContent value="emotional" className="space-y-4">
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
                          analysisReport.emotionalPatterns.dominantEmotion
                        }
                      />
                      <div>
                        <p className="font-semibold capitalize">
                          {analysisReport.emotionalPatterns.dominantEmotion}
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
                          {analysisReport.emotionalPatterns.emotionalIntensity}
                          /10
                        </span>
                      </div>
                      <Progress
                        value={
                          analysisReport.emotionalPatterns.emotionalIntensity *
                          10
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Recovery Time</span>
                      <Badge variant="outline" className="capitalize">
                        <Clock className="w-3 h-3 mr-1" />
                        {analysisReport.emotionalPatterns.emotionalRecoveryTime}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-sm font-medium">
                        Self-Regulation
                      </span>
                      <Badge
                        variant={
                          analysisReport.emotionalPatterns.selfRegulation ===
                          "excellent"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {analysisReport.emotionalPatterns.selfRegulation}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">
                        Emotional Contagion
                      </span>
                      <Badge
                        variant={
                          analysisReport.emotionalPatterns.emotionalContagion
                            ? "destructive"
                            : "default"
                        }
                      >
                        {analysisReport.emotionalPatterns.emotionalContagion
                          ? "Present"
                          : "Not Detected"}
                      </Badge>
                    </div>

                    {(analysisReport.emotionalPatterns.moodBeforeInteraction ||
                      analysisReport.emotionalPatterns
                        .moodAfterInteraction) && (
                      <div className="space-y-3">
                        <span className="text-sm font-medium">
                          Mood Changes
                        </span>
                        <div className="flex items-center gap-4">
                          {analysisReport.emotionalPatterns
                            .moodBeforeInteraction && (
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {
                                  analysisReport.emotionalPatterns
                                    .moodBeforeInteraction
                                }
                                /10
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Before
                              </div>
                            </div>
                          )}
                          {analysisReport.emotionalPatterns
                            .moodBeforeInteraction &&
                            analysisReport.emotionalPatterns
                              .moodAfterInteraction && (
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            )}
                          {analysisReport.emotionalPatterns
                            .moodAfterInteraction && (
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {
                                  analysisReport.emotionalPatterns
                                    .moodAfterInteraction
                                }
                                /10
                              </div>
                              <div className="text-xs text-muted-foreground">
                                After
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {analysisReport.emotionalPatterns.emotionalTriggers.length >
                  0 && (
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

                <TextEvidenceDisplay
                  evidence={analysisReport.emotionalPatterns.textEvidence || []}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Patterns */}
          <TabsContent value="communication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Communication Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">
                          Communication Style
                        </span>
                        <Badge className="capitalize">
                          {
                            analysisReport.communicationPatterns
                              .communicationStyle
                          }
                        </Badge>
                      </div>
                      <CommunicationStyleDescription
                        style={
                          analysisReport.communicationPatterns
                            .communicationStyle
                        }
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">
                          Conflict Resolution
                        </span>
                        <Badge className="capitalize">
                          {
                            analysisReport.communicationPatterns
                              .conflictResolutionStyle
                          }
                        </Badge>
                      </div>
                      <ConflictResolutionDescription
                        style={
                          analysisReport.communicationPatterns
                            .conflictResolutionStyle
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
                            .listeningEffectiveness === "excellent"
                            ? "default"
                            : "secondary"
                        }
                        className="ml-2 capitalize"
                      >
                        {
                          analysisReport.communicationPatterns
                            .listeningEffectiveness
                        }
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium">
                        Boundaries Maintained
                      </span>
                      <Badge
                        variant={
                          analysisReport.communicationPatterns
                            .boundariesMaintained
                            ? "default"
                            : "destructive"
                        }
                        className="ml-2"
                      >
                        {analysisReport.communicationPatterns
                          .boundariesMaintained
                          ? "Yes"
                          : "No"}
                      </Badge>
                    </div>

                    <div>
                      <span className="text-sm font-medium">
                        Resolution Achieved
                      </span>
                      <Badge
                        variant={
                          analysisReport.communicationPatterns
                            .resolutionAchieved
                            ? "default"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {analysisReport.communicationPatterns.resolutionAchieved
                          ? "Yes"
                          : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysisReport.communicationPatterns.expressedNeeds.length >
                    0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-700">
                        Expressed Needs
                      </h4>
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

                  {analysisReport.communicationPatterns.unmetNeeds.length >
                    0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-orange-700">
                        Unmet Needs
                      </h4>
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

                {analysisReport.communicationPatterns.escalationTriggers
                  .length > 0 && (
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

                <TextEvidenceDisplay
                  evidence={
                    analysisReport.communicationPatterns.textEvidence || []
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavioral Patterns */}
          <TabsContent value="behavioral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Behavioral Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisReport.behaviorPatterns.behaviorCycles.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Behavior Cycles</h4>
                    <div className="space-y-3">
                      {analysisReport.behaviorPatterns.behaviorCycles.map(
                        (cycle, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">Trigger:</span>
                              <span className="text-sm">{cycle.trigger}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-orange-600" />
                              <span className="font-medium">Response:</span>
                              <span className="text-sm">{cycle.response}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-green-600" />
                              <span className="font-medium">Outcome:</span>
                              <span className="text-sm">{cycle.outcome}</span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysisReport.behaviorPatterns.yourBehaviorPatterns.length >
                    0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Your Patterns</h4>
                      <div className="space-y-2">
                        {analysisReport.behaviorPatterns.yourBehaviorPatterns.map(
                          (pattern, index) => (
                            <div
                              key={index}
                              className="p-2 bg-blue-50 rounded text-sm"
                            >
                              {pattern}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {analysisReport.behaviorPatterns.theirBehaviorPatterns
                    .length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Their Patterns</h4>
                      <div className="space-y-2">
                        {analysisReport.behaviorPatterns.theirBehaviorPatterns.map(
                          (pattern, index) => (
                            <div
                              key={index}
                              className="p-2 bg-purple-50 rounded text-sm"
                            >
                              {pattern}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {analysisReport.behaviorPatterns.growthOpportunities.length >
                  0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Growth Opportunities
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {analysisReport.behaviorPatterns.growthOpportunities.map(
                        (opportunity, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-3 bg-green-50 rounded-lg"
                          >
                            <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{opportunity}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <TextEvidenceDisplay
                  evidence={analysisReport.behaviorPatterns.textEvidence || []}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relationship Dynamics */}
          <TabsContent value="dynamics" className="space-y-4">
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
                          Initiated by:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {
                            analysisReport.relationshipDynamics.powerDynamics
                              .whoInitiated
                          }
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Controlled by:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {
                            analysisReport.relationshipDynamics.powerDynamics
                              .whoControlled
                          }
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Decisions:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {analysisReport.relationshipDynamics.powerDynamics.decisionMaking.replace(
                            /_/g,
                            " "
                          )}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Support Patterns</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Emotional:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {analysisReport.relationshipDynamics.supportPatterns.emotionalSupport.replace(
                            /_/g,
                            " "
                          )}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Practical:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {analysisReport.relationshipDynamics.supportPatterns.practicalSupport.replace(
                            /_/g,
                            " "
                          )}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Validation:
                        </span>
                        <Badge
                          variant={
                            analysisReport.relationshipDynamics.supportPatterns
                              .validationExchanged
                              ? "default"
                              : "secondary"
                          }
                          className="ml-2"
                        >
                          {analysisReport.relationshipDynamics.supportPatterns
                            .validationExchanged
                            ? "Present"
                            : "Absent"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Relationship Quality</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Intimacy:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {analysisReport.relationshipDynamics.intimacyLevel.replace(
                            /_/g,
                            " "
                          )}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Trust:
                        </span>
                        <Badge
                          variant={
                            analysisReport.relationshipDynamics.trustLevel ===
                            "high"
                              ? "default"
                              : "secondary"
                          }
                          className="ml-2 capitalize"
                        >
                          {analysisReport.relationshipDynamics.trustLevel}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Effort:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {analysisReport.relationshipDynamics.effortBalance.replace(
                            /_/g,
                            " "
                          )}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attachment Patterns */}
          <TabsContent value="attachment" className="space-y-4">
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
                            {
                              analysisReport.attachmentPatterns
                                .yourAttachmentStyle
                            }
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Their Attachment Style
                          </span>
                          <Badge className="ml-2 capitalize">
                            {
                              analysisReport.attachmentPatterns
                                .theirAttachmentStyle
                            }
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
                              analysisReport.attachmentPatterns
                                .attachmentTriggered
                                ? "destructive"
                                : "default"
                            }
                            className="ml-2"
                          >
                            {analysisReport.attachmentPatterns
                              .attachmentTriggered
                              ? "Yes"
                              : "No"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {analysisReport.attachmentPatterns.attachmentBehaviors
                      ?.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">
                          Attachment Behaviors Observed
                        </h4>
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

                    <TextEvidenceDisplay
                      evidence={
                        analysisReport.attachmentPatterns.textEvidence || []
                      }
                    />
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Attachment pattern analysis not available for this
                      reflection.
                      <br />
                      Re-analyze this reflection to get attachment insights.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trauma Responses */}
          <TabsContent value="trauma" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Trauma Responses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisReport.traumaResponses ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium">
                            Your Response
                          </span>
                          <Badge className="ml-2 capitalize">
                            {analysisReport.traumaResponses.yourResponse}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Their Response
                          </span>
                          <Badge className="ml-2 capitalize">
                            {analysisReport.traumaResponses.theirResponse}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium">
                            Trauma Triggered
                          </span>
                          <Badge
                            variant={
                              analysisReport.traumaResponses.traumaTriggered
                                ? "destructive"
                                : "default"
                            }
                            className="ml-2"
                          >
                            {analysisReport.traumaResponses.traumaTriggered
                              ? "Yes"
                              : "No"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {analysisReport.traumaResponses.copingStrategiesUsed
                      ?.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-700">
                          Healthy Coping Strategies Used
                        </h4>
                        <div className="space-y-2">
                          {analysisReport.traumaResponses.copingStrategiesUsed.map(
                            (strategy, index) => (
                              <div
                                key={index}
                                className="flex gap-3 p-3 bg-green-50 rounded-lg"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{strategy}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Trauma response analysis not available for this
                      reflection.
                      <br />
                      Re-analyze this reflection to get trauma response
                      insights.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connection Patterns */}
          <TabsContent value="connection" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Connection & Love Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisReport.connectionPatterns ? (
                  <>
                    {analysisReport.connectionPatterns.loveLanguagesExpressed
                      ?.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">
                          Love Languages Expressed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisReport.connectionPatterns.loveLanguagesExpressed.map(
                            (language, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="capitalize"
                              >
                                {language.replace(/_/g, " ")}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Emotional</span>
                        <Badge className="capitalize">
                          {
                            analysisReport.connectionPatterns.intimacyTypes
                              .emotional
                          }
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Physical</span>
                        <Badge className="capitalize">
                          {
                            analysisReport.connectionPatterns.intimacyTypes
                              .physical
                          }
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">
                          Intellectual
                        </span>
                        <Badge className="capitalize">
                          {
                            analysisReport.connectionPatterns.intimacyTypes
                              .intellectual
                          }
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Spiritual</span>
                        <Badge className="capitalize">
                          {
                            analysisReport.connectionPatterns.intimacyTypes
                              .spiritual
                          }
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {analysisReport.connectionPatterns.connectionAttempts
                        ?.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-green-700">
                            Connection Attempts
                          </h4>
                          <div className="space-y-2">
                            {analysisReport.connectionPatterns.connectionAttempts.map(
                              (attempt, index) => (
                                <div key={index} className="flex gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{attempt}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {analysisReport.connectionPatterns.connectionBarriers
                        ?.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-orange-700">
                            Connection Barriers
                          </h4>
                          <div className="space-y-2">
                            {analysisReport.connectionPatterns.connectionBarriers.map(
                              (barrier, index) => (
                                <div key={index} className="flex gap-2">
                                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{barrier}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Connection pattern analysis not available for this
                      reflection.
                      <br />
                      Re-analyze this reflection to get connection insights.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cognitive Patterns */}
          <TabsContent value="cognitive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Cognitive Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisReport.cognitivePatterns ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium">
                            Perspective Taking
                          </span>
                          <Badge className="ml-2 capitalize">
                            {analysisReport.cognitivePatterns.perspectiveTaking}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Emotional Reasoning
                          </span>
                          <Badge
                            variant={
                              analysisReport.cognitivePatterns
                                .emotionalReasoning
                                ? "destructive"
                                : "default"
                            }
                            className="ml-2"
                          >
                            {analysisReport.cognitivePatterns.emotionalReasoning
                              ? "Present"
                              : "Minimal"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {analysisReport.cognitivePatterns.thinkingTraps?.length >
                      0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-orange-700">
                          Thinking Traps Identified
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisReport.cognitivePatterns.thinkingTraps.map(
                            (trap, index) => (
                              <Badge
                                key={index}
                                variant="destructive"
                                className="capitalize"
                              >
                                {trap.replace(/_/g, " ")}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {analysisReport.cognitivePatterns.assumptionsMade?.length >
                      0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">Assumptions Made</h4>
                        <div className="space-y-2">
                          {analysisReport.cognitivePatterns.assumptionsMade.map(
                            (assumption, index) => (
                              <div
                                key={index}
                                className="p-2 bg-yellow-50 rounded text-sm border border-yellow-200"
                              >
                                {assumption}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Cognitive pattern analysis not available for this
                      reflection.
                      <br />
                      Re-analyze this reflection to get cognitive insights.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Context Factors */}
          <TabsContent value="context" className="space-y-4">
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
                        {analysisReport.contextFactors.interactionType.replace(
                          /_/g,
                          " "
                        )}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {analysisReport.contextFactors.duration}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {analysisReport.contextFactors.environment}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Timing</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="capitalize">
                          {analysisReport.contextFactors.timeContext.timeOfDay}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="capitalize">
                          {analysisReport.contextFactors.timeContext.dayOfWeek}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Energy Levels</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Yours:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {analysisReport.contextFactors.energyLevels.yours}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Theirs:
                        </span>
                        <Badge className="ml-2 capitalize">
                          {analysisReport.contextFactors.energyLevels.theirs}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {analysisReport.contextFactors.externalStressors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">External Stressors</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisReport.contextFactors.externalStressors.map(
                        (stressor, index) => (
                          <Badge key={index} variant="destructive">
                            {stressor}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tracking */}
          <TabsContent value="progress" className="space-y-4">
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
                    trend={analysisReport.progressTracking.relationshipTrend}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysisReport.progressTracking.personalGrowthAreas.length >
                    0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Personal Growth Areas</h4>
                      <div className="space-y-2">
                        {analysisReport.progressTracking.personalGrowthAreas.map(
                          (area, index) => (
                            <div
                              key={index}
                              className="p-2 bg-blue-50 rounded text-sm"
                            >
                              {area}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {analysisReport.progressTracking.areasNeedingAttention
                    .length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Areas Needing Attention</h4>
                      <div className="space-y-2">
                        {analysisReport.progressTracking.areasNeedingAttention.map(
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

                {analysisReport.progressTracking.strengthsIdentified &&
                  analysisReport.progressTracking.strengthsIdentified.length >
                    0 && (
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
          </TabsContent>

          {/* Actionable Insights */}
          <TabsContent value="actions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Actionable Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisReport.actionableInsights.immediateActions.length >
                  0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700">
                      Immediate Actions
                    </h4>
                    <div className="space-y-2">
                      {analysisReport.actionableInsights.immediateActions.map(
                        (action, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                          >
                            <Zap className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {analysisReport.actionableInsights.shortTermStrategies.length >
                  0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-orange-700">
                      Short-term Strategies
                    </h4>
                    <div className="space-y-2">
                      {analysisReport.actionableInsights.shortTermStrategies.map(
                        (strategy, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-3 bg-orange-50 rounded-lg"
                          >
                            <Target className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strategy}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {analysisReport.actionableInsights.longTermGoals.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-700">
                      Long-term Goals
                    </h4>
                    <div className="space-y-2">
                      {analysisReport.actionableInsights.longTermGoals.map(
                        (goal, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                          >
                            <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{goal}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {analysisReport.actionableInsights.selfCareRecommendations
                  .length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">
                      Self-Care Recommendations
                    </h4>
                    <div className="space-y-2">
                      {analysisReport.actionableInsights.selfCareRecommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-3 bg-green-50 rounded-lg"
                          >
                            <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{recommendation}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Assessment */}
          <TabsContent value="safety" className="space-y-4">
            <Card
              className={cn(
                "border-2",
                analysisReport.abuseDetection.isAbusive
                  ? "border-red-500"
                  : "border-green-500"
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Safety Assessment
                </CardTitle>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      analysisReport.abuseDetection.isAbusive
                        ? "destructive"
                        : "default"
                    }
                  >
                    {analysisReport.abuseDetection.isAbusive
                      ? "Concerning Behavior Detected"
                      : "No Abuse Detected"}
                  </Badge>
                  <Badge
                    variant={
                      analysisReport.abuseDetection.isAtImmediateRisk
                        ? "destructive"
                        : "default"
                    }
                  >
                    {analysisReport.abuseDetection.isAtImmediateRisk
                      ? "Immediate Risk"
                      : "No Immediate Risk"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisReport.abuseDetection.detectedAbusiveBehaviors.length >
                  0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-700">
                      Detected Concerning Behaviors
                    </h4>
                    {analysisReport.abuseDetection.detectedAbusiveBehaviors.map(
                      (behavior, index) => (
                        <div
                          key={index}
                          className="p-4 border-2 border-red-200 rounded-lg space-y-3"
                        >
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive" className="uppercase">
                              {behavior.type}
                            </Badge>
                            <span className="font-medium">
                              {behavior.behavior}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-sm font-medium">
                              Reasoning:
                            </span>
                            {behavior.reasonings.map((reason, reasonIndex) => (
                              <div key={reasonIndex} className="flex gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{reason}</span>
                              </div>
                            ))}
                          </div>

                          <TextEvidenceDisplay
                            evidence={behavior.textEvidence || []}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}

                {analysisReport.abuseDetection.suggestedActionsToTake.length >
                  0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recommended Actions</h4>
                    <div className="space-y-2">
                      {analysisReport.abuseDetection.suggestedActionsToTake.map(
                        (action, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                          >
                            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {analysisReport.abuseDetection.suggestedResources.length >
                  0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Support Resources</h4>
                    <div className="space-y-2">
                      {analysisReport.abuseDetection.suggestedResources.map(
                        (resource, index) => (
                          <Link
                            key={index}
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-purple-900 hover:underline">
                              {resource.title}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

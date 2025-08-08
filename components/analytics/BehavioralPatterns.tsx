"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Shield,
  Heart,
  Users,
  MessageSquare,
  Clock,
  Zap,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Calendar,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BehavioralPatternsData {
  // Boundary patterns
  boundary_violations_count: number;
  boundary_success_count: number;
  avoided_conflict_count: number;
  engaged_conflict_count: number;

  // Communication patterns
  deep_conversations_count: number;
  surface_conversations_count: number;
  initiated_conversations_count: number;
  avoided_conversations_count: number;

  // Emotional patterns
  emotional_contagion_count: number;
  emotional_regulation_count: number;
  suppressed_emotions_count: number;
  expressed_emotions_count: number;

  // Power dynamics
  gave_up_control_count: number;
  maintained_control_count: number;
  compromised_count: number;
  stood_firm_count: number;

  // Trust patterns
  trusted_instincts_count: number;
  ignored_instincts_count: number;
  gave_benefit_of_doubt_count: number;
  questioned_behavior_count: number;

  // Time patterns
  rushed_decisions_count: number;
  took_time_count: number;
  procrastinated_count: number;
  acted_immediately_count: number;

  // Total interactions for percentage calculations
  total_interactions: number;
}

import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

interface BehavioralPatternsProps {
  workspaceId?: string;
  daysFilter: string;
  selectedUserId?: string;
}

export default function BehavioralPatterns({
  workspaceId,
  daysFilter,
  selectedUserId,
}: BehavioralPatternsProps) {
  // Fetch behavioral patterns data (using emotional intelligence data for now)
  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    workspaceId
      ? `/api/analytics/patterns?type=behavioral_patterns&days_filter=${daysFilter}&workspaceId=${workspaceId}${
          selectedUserId ? `&user_id=${selectedUserId}` : ""
        }`
      : null,
    fetcher
  );

  const data = result?.data as BehavioralPatternsData[];
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Behavioral Patterns</CardTitle>
            <CardDescription>Analyzing your patterns...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Behavioral Patterns</CardTitle>
            <CardDescription>
              No behavioral data available for the selected period.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const patternData = data[0];

  // Calculate percentages
  const boundaryViolationRate =
    (patternData.boundary_violations_count / patternData.total_interactions) *
    100;
  const boundarySuccessRate =
    (patternData.boundary_success_count / patternData.total_interactions) * 100;
  const avoidedConflictRate =
    (patternData.avoided_conflict_count / patternData.total_interactions) * 100;
  const engagedConflictRate =
    (patternData.engaged_conflict_count / patternData.total_interactions) * 100;

  const deepConversationRate =
    (patternData.deep_conversations_count / patternData.total_interactions) *
    100;
  const surfaceConversationRate =
    (patternData.surface_conversations_count / patternData.total_interactions) *
    100;
  const avoidedConversationRate =
    (patternData.avoided_conversations_count / patternData.total_interactions) *
    100;

  const emotionalContagionRate =
    (patternData.emotional_contagion_count / patternData.total_interactions) *
    100;
  const emotionalRegulationRate =
    (patternData.emotional_regulation_count / patternData.total_interactions) *
    100;
  const suppressedEmotionsRate =
    (patternData.suppressed_emotions_count / patternData.total_interactions) *
    100;

  const gaveUpControlRate =
    (patternData.gave_up_control_count / patternData.total_interactions) * 100;
  const maintainedControlRate =
    (patternData.maintained_control_count / patternData.total_interactions) *
    100;

  const ignoredInstinctsRate =
    (patternData.ignored_instincts_count / patternData.total_interactions) *
    100;
  const trustedInstinctsRate =
    (patternData.trusted_instincts_count / patternData.total_interactions) *
    100;

  const rushedDecisionsRate =
    (patternData.rushed_decisions_count / patternData.total_interactions) * 100;
  const tookTimeRate =
    (patternData.took_time_count / patternData.total_interactions) * 100;

  // Determine primary patterns
  const primaryPatterns = [];

  if (avoidedConversationRate > 30) {
    primaryPatterns.push({
      type: "avoidance",
      title: "Avoiding Deep Conversations",
      description: `You avoided ${Math.round(
        avoidedConversationRate
      )}% of potential deep conversations`,
      icon: EyeOff,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    });
  }

  if (boundaryViolationRate > 25) {
    primaryPatterns.push({
      type: "boundary",
      title: "Struggling with Boundaries",
      description: `You couldn't protect your boundaries in ${Math.round(
        boundaryViolationRate
      )}% of interactions`,
      icon: Shield,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    });
  }

  if (emotionalContagionRate > 40) {
    primaryPatterns.push({
      type: "emotional",
      title: "Emotional Contagion",
      description: `You absorbed others' emotions in ${Math.round(
        emotionalContagionRate
      )}% of interactions`,
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    });
  }

  if (gaveUpControlRate > 35) {
    primaryPatterns.push({
      type: "power",
      title: "Giving Up Control",
      description: `You gave up control in ${Math.round(
        gaveUpControlRate
      )}% of power dynamics`,
      icon: Unlock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    });
  }

  if (ignoredInstinctsRate > 30) {
    primaryPatterns.push({
      type: "trust",
      title: "Ignoring Your Instincts",
      description: `You ignored your gut feelings in ${Math.round(
        ignoredInstinctsRate
      )}% of situations`,
      icon: XCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    });
  }

  if (rushedDecisionsRate > 45) {
    primaryPatterns.push({
      type: "timing",
      title: "Rushing Decisions",
      description: `You made rushed decisions in ${Math.round(
        rushedDecisionsRate
      )}% of interactions`,
      icon: Clock,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    });
  }

  // Positive patterns
  const positivePatterns = [];

  if (boundarySuccessRate > 60) {
    positivePatterns.push({
      title: "Strong Boundary Setting",
      description: `You successfully maintained boundaries in ${Math.round(
        boundarySuccessRate
      )}% of interactions`,
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    });
  }

  if (deepConversationRate > 40) {
    positivePatterns.push({
      title: "Deep Communication",
      description: `You engaged in meaningful conversations ${Math.round(
        deepConversationRate
      )}% of the time`,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    });
  }

  if (emotionalRegulationRate > 50) {
    positivePatterns.push({
      title: "Emotional Regulation",
      description: `You managed your emotions well in ${Math.round(
        emotionalRegulationRate
      )}% of situations`,
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Your Behavioral Patterns
          </CardTitle>
          <CardDescription>
            Over the last 30 days, here's what you've been doing in your
            relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">
                  Total Interactions
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {patternData.total_interactions}
              </p>
              <p className="text-sm text-blue-700">Over 30 days</p>
            </div>

            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">
                  Boundary Success
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(boundarySuccessRate)}%
              </p>
              <p className="text-sm text-green-700">Of interactions</p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">
                  Deep Conversations
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(deepConversationRate)}%
              </p>
              <p className="text-sm text-purple-700">Of interactions</p>
            </div>

            <div className="p-4 border rounded-lg bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">
                  Emotional Regulation
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(emotionalRegulationRate)}%
              </p>
              <p className="text-sm text-orange-700">Of interactions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Patterns - What You've Been Avoiding/Struggling With */}
      {primaryPatterns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Patterns to Address
            </CardTitle>
            <CardDescription>
              These are the behaviors that have been holding you back
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {primaryPatterns.map((pattern, index) => {
                const IconComponent = pattern.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-4 border rounded-lg",
                      pattern.bgColor,
                      pattern.borderColor
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent
                        className={cn("h-5 w-5 mt-0.5", pattern.color)}
                      />
                      <div className="flex-1">
                        <h4 className={cn("font-medium mb-1", pattern.color)}>
                          {pattern.title}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {pattern.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">Needs Attention</Badge>
                          <span className="text-xs text-gray-500">
                            This pattern is affecting your relationship outcomes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Positive Patterns */}
      {positivePatterns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Strengths to Build On
            </CardTitle>
            <CardDescription>
              These are the behaviors that are serving you well
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positivePatterns.map((pattern, index) => {
                const IconComponent = pattern.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-4 border rounded-lg",
                      pattern.bgColor,
                      pattern.borderColor
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent
                        className={cn("h-5 w-5 mt-0.5", pattern.color)}
                      />
                      <div className="flex-1">
                        <h4 className={cn("font-medium mb-1", pattern.color)}>
                          {pattern.title}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {pattern.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800"
                          >
                            Strength
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Keep doing this - it's working for you
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Pattern Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Pattern Analysis</CardTitle>
          <CardDescription>
            A breakdown of your behavioral patterns over the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Boundary Patterns */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Boundary Management
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Successfully maintained boundaries
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress value={boundarySuccessRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(boundarySuccessRate)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Boundary violations</span>
                  <div className="flex items-center gap-2">
                    <Progress value={boundaryViolationRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(boundaryViolationRate)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Patterns */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Communication Style
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Deep, meaningful conversations
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress value={deepConversationRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(deepConversationRate)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Surface-level conversations</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={surfaceConversationRate}
                      className="w-24"
                    />
                    <span className="text-sm font-medium">
                      {Math.round(surfaceConversationRate)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avoided conversations</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={avoidedConversationRate}
                      className="w-24"
                    />
                    <span className="text-sm font-medium">
                      {Math.round(avoidedConversationRate)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotional Patterns */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Emotional Management
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emotional regulation</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={emotionalRegulationRate}
                      className="w-24"
                    />
                    <span className="text-sm font-medium">
                      {Math.round(emotionalRegulationRate)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emotional contagion</span>
                  <div className="flex items-center gap-2">
                    <Progress value={emotionalContagionRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(emotionalContagionRate)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Suppressed emotions</span>
                  <div className="flex items-center gap-2">
                    <Progress value={suppressedEmotionsRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(suppressedEmotionsRate)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Power Dynamics */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Power Dynamics
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Maintained control</span>
                  <div className="flex items-center gap-2">
                    <Progress value={maintainedControlRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(maintainedControlRate)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gave up control</span>
                  <div className="flex items-center gap-2">
                    <Progress value={gaveUpControlRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(gaveUpControlRate)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision Making */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Decision Making
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Took time to decide</span>
                  <div className="flex items-center gap-2">
                    <Progress value={tookTimeRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(tookTimeRate)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rushed decisions</span>
                  <div className="flex items-center gap-2">
                    <Progress value={rushedDecisionsRate} className="w-24" />
                    <span className="text-sm font-medium">
                      {Math.round(rushedDecisionsRate)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            What This Means for You
          </CardTitle>
          <CardDescription>
            Based on your behavioral patterns, here's what you should focus on
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {avoidedConversationRate > 30 && (
              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-2">
                  💬 Start Having Hard Conversations
                </h4>
                <p className="text-sm text-blue-700">
                  You're avoiding deep conversations{" "}
                  {Math.round(avoidedConversationRate)}% of the time. This might
                  be protecting you from discomfort, but it's also preventing
                  you from building deeper connections and resolving issues. Try
                  initiating one difficult conversation this week.
                </p>
              </div>
            )}

            {boundaryViolationRate > 25 && (
              <div className="p-4 border rounded-lg bg-orange-50">
                <h4 className="font-medium text-orange-800 mb-2">
                  🛡️ Practice Boundary Setting
                </h4>
                <p className="text-sm text-orange-700">
                  You're struggling to maintain boundaries in{" "}
                  {Math.round(boundaryViolationRate)}% of interactions. This
                  often leads to resentment and feeling taken advantage of.
                  Start with small boundaries and practice saying "no" to things
                  that don't align with your values.
                </p>
              </div>
            )}

            {emotionalContagionRate > 40 && (
              <div className="p-4 border rounded-lg bg-purple-50">
                <h4 className="font-medium text-purple-800 mb-2">
                  🧘‍♀️ Build Emotional Boundaries
                </h4>
                <p className="text-sm text-purple-700">
                  You're absorbing others' emotions{" "}
                  {Math.round(emotionalContagionRate)}% of the time. While
                  empathy is valuable, you need to protect your own emotional
                  state. Practice recognizing when you're taking on someone
                  else's emotions and consciously choose whether to engage or
                  maintain distance.
                </p>
              </div>
            )}

            {gaveUpControlRate > 35 && (
              <div className="p-4 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">
                  🎯 Reclaim Your Power
                </h4>
                <p className="text-sm text-red-700">
                  You're giving up control in {Math.round(gaveUpControlRate)}%
                  of power dynamics. This might feel easier in the moment, but
                  it leads to feeling powerless and resentful. Start making
                  decisions based on your own needs and values, not just to keep
                  the peace.
                </p>
              </div>
            )}

            {ignoredInstinctsRate > 30 && (
              <div className="p-4 border rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-800 mb-2">
                  🔮 Trust Your Gut
                </h4>
                <p className="text-sm text-yellow-700">
                  You're ignoring your instincts{" "}
                  {Math.round(ignoredInstinctsRate)}% of the time. Your
                  intuition is often right, but you're overriding it with logic
                  or people-pleasing. Start paying attention to your gut
                  feelings and act on them more often.
                </p>
              </div>
            )}

            {rushedDecisionsRate > 45 && (
              <div className="p-4 border rounded-lg bg-indigo-50">
                <h4 className="font-medium text-indigo-800 mb-2">
                  ⏰ Slow Down Your Decisions
                </h4>
                <p className="text-sm text-indigo-700">
                  You're making rushed decisions{" "}
                  {Math.round(rushedDecisionsRate)}% of the time. This often
                  leads to poor outcomes and regret. Practice taking time to
                  think through important decisions, even if it means saying "I
                  need to think about this" or "Let me get back to you."
                </p>
              </div>
            )}

            {primaryPatterns.length === 0 && (
              <div className="p-4 border rounded-lg bg-green-50">
                <h4 className="font-medium text-green-800 mb-2">
                  🎉 Great Job!
                </h4>
                <p className="text-sm text-green-700">
                  Your behavioral patterns are healthy and balanced. You're
                  maintaining good boundaries, having meaningful conversations,
                  and managing your emotions well. Keep up the great work!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

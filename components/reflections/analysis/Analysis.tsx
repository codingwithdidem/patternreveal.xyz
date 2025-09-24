import {
  LiftedTabs,
  LiftedTabsContent,
  LiftedTabsList,
  LiftedTabsTrigger,
} from "@/components/ui/lifted-tabs";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";
import {
  Brain,
  MessageCircle,
  Target as TargetIcon,
  Shield,
  Heart,
  Activity,
} from "lucide-react";
import AnimatedEmptyState from "@/components/AnimatedEmptyState";
// Import the new analysis components

import EmotionalPatterns from "./EmotionalPatterns";
import CommunicationPatterns from "./CommunicationPatterns";
import BehavioralPatterns from "./BehavioralPatterns";
import RelationshipDynamics from "./RelationshipDynamics";
import AttachmentPatterns from "./AttachmentPatterns";
import ConnectionPatterns from "./ConnectionPatterns";
import TraumaResponses from "./TraumaResponses";
import CognitivePatterns from "./CognitivePatterns";
import ContextFactors from "./ContextFactors";
import ActionableInsights from "./ActionableInsights";
import SafetyAssessment from "./SafetyAssessment";
import OverallAssessment from "./OverallAssessment";
import AnalysisSkeleton from "./AnalysisSkeleton";

interface AnalysisProps {
  isLoading: boolean;
  analysisReport: AnalysisType | undefined;
}

export default function Analysis({ isLoading, analysisReport }: AnalysisProps) {
  if (isLoading) {
    return <AnalysisSkeleton />;
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
      {/* Detailed Analysis Tabs */}
      <div className="">
        <LiftedTabs defaultValue="overall" className="w-full mb-8 space-y-0">
          <LiftedTabsList className="flex w-full justify-stretch overflow-x-scroll scrollbar-hide">
            <LiftedTabsTrigger className="flex-1" value="overall">
              Overall
            </LiftedTabsTrigger>
            <LiftedTabsTrigger value="emotional">Emotional</LiftedTabsTrigger>
            <LiftedTabsTrigger value="communication">
              Communication
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="behavioral">
              Behavioral
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="dynamics">
              Dynamics
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="attachment">
              Attachment
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="trauma">
              Trauma
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="connection">
              Connection
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="cognitive">
              Cognitive
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="actions">
              Actions
            </LiftedTabsTrigger>
            <LiftedTabsTrigger className="w-full" value="safety">
              Safety
            </LiftedTabsTrigger>
          </LiftedTabsList>

          {/* Overall Assessment */}
          <LiftedTabsContent value="overall" className="space-y-4">
            <OverallAssessment analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Emotional Patterns */}
          <LiftedTabsContent value="emotional" className="space-y-4">
            <EmotionalPatterns analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Communication Patterns */}
          <LiftedTabsContent value="communication" className="space-y-4">
            <CommunicationPatterns analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Behavioral Patterns */}
          <LiftedTabsContent value="behavioral" className="space-y-4">
            <BehavioralPatterns analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Relationship Dynamics */}
          <LiftedTabsContent value="dynamics" className="space-y-4">
            <RelationshipDynamics analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Attachment Patterns */}
          <LiftedTabsContent value="attachment" className="space-y-4">
            <AttachmentPatterns analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Trauma Responses */}
          <LiftedTabsContent value="trauma" className="space-y-4">
            <TraumaResponses analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Connection Patterns */}
          <LiftedTabsContent value="connection" className="space-y-4">
            <ConnectionPatterns analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Cognitive Patterns */}
          <LiftedTabsContent value="cognitive" className="space-y-4">
            <CognitivePatterns analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Actionable Insights */}
          <LiftedTabsContent value="actions" className="space-y-4">
            <ActionableInsights analysisReport={analysisReport} />
          </LiftedTabsContent>

          {/* Safety Assessment */}
          <LiftedTabsContent value="safety" className="space-y-4">
            <SafetyAssessment analysisReport={analysisReport} />
          </LiftedTabsContent>
        </LiftedTabs>
      </div>
    </div>
  );
}

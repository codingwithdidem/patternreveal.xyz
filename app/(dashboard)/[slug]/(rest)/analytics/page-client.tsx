"use client";

import { Suspense } from "react";
import useAnalyticsQueryParams from "@/hooks/nuqs/useAnalyticsQueryParams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Filters from "@/components/analytics/Filters";
import { Brain, Heart, Target, Activity, BookOpen } from "lucide-react";
import useWorkspace from "@/lib/swr/use-workspace";
import EmotionalIntelligenceTab from "@/components/analytics/EmotionalIntelligenceTab";
import RelationshipHealthTab from "@/components/analytics/RelationshipHealthTab";
import PredictiveInsightsTab from "@/components/analytics/PredictiveInsightsTab";
import type { EmotionalIntelligenceData } from "@/components/analytics/EmotionalIntelligenceInsights";
import type { RelationshipHealthData } from "@/components/analytics/RelationshipHealthInsights";
import type { PredictiveData } from "@/components/analytics/PredictiveInsights";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";
import ReflectionAnalysis, {
  type ReflectionTrendsData,
} from "@/components/analytics/ReflectionAnalysis";
import BehavioralPatterns, {
  type BehavioralPatternsData,
} from "@/components/analytics/BehavioralPatterns";

export default function AnalyticsPageClient() {
  const { id: workspaceId } = useWorkspace();
  const { filters } = useAnalyticsQueryParams();
  const { days: daysFilter, user: selectedUserId } = filters;

  // Pass props to child components
  const analyticsProps = {
    workspaceId,
    daysFilter,
    selectedUserId: selectedUserId === "all" ? undefined : selectedUserId,
  };

  return (
    <div className="space-y-6">
      <Filters />
      <Tabs defaultValue="emotional_intelligence" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="emotional_intelligence">
            <Brain className="h-4 w-4 mr-2" /> Emotional Intelligence
          </TabsTrigger>
          <TabsTrigger value="relationship_health">
            <Heart className="h-4 w-4 mr-2" /> Relationship Health
          </TabsTrigger>
          <TabsTrigger value="predictive">
            <Target className="h-4 w-4 mr-2" /> Predictive Insights
          </TabsTrigger>
          <TabsTrigger value="behavioral-patterns">
            <Activity className="h-4 w-4 mr-2" />
            Behavioral Patterns
          </TabsTrigger>
          <TabsTrigger value="reflection-analysis">
            <BookOpen className="h-4 w-4 mr-2" /> Reflection Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="emotional_intelligence" className="space-y-4">
          <Suspense fallback={<div>Loading emotional intelligence...</div>}>
            <EmotionalIntelligenceTab {...analyticsProps} />
          </Suspense>
        </TabsContent>

        <TabsContent value="relationship_health" className="space-y-4">
          <Suspense fallback={<div>Loading relationship health...</div>}>
            <RelationshipHealthTab {...analyticsProps} />
          </Suspense>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <Suspense fallback={<div>Loading predictive insights...</div>}>
            <PredictiveInsightsTab {...analyticsProps} />
          </Suspense>
        </TabsContent>

        <TabsContent value="behavioral-patterns" className="space-y-4">
          <Suspense fallback={<div>Loading behavioral patterns...</div>}>
            <BehavioralPatterns {...analyticsProps} />
          </Suspense>
        </TabsContent>

        <TabsContent value="reflection-analysis" className="space-y-4">
          <Suspense fallback={<div>Loading reflection analysis...</div>}>
            <ReflectionAnalysis {...analyticsProps} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

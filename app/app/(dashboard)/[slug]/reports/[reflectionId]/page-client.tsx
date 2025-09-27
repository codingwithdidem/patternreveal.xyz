"use client";

import Tiptap from "@/components/editor/Tiptap";
import Toolbar from "@/components/editor/Toolbar";
import useReflection from "@/lib/swr/use-reflection";
import { useParams } from "next/navigation";
import type { Editor } from "@tiptap/react";
import { useState, useMemo, Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";
import { mutate } from "swr";
import ReflectionsMenuBar from "@/components/reflections/ReflectionsMenuBar";
import AskAI from "@/components/reflections/ask-ai/AskAI";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SparklesIcon, WandSparklesIcon } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { experimental_useObject } from "ai/react";
import { analysisSchema } from "@/lib/zod/schemas/analysis";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";
import Analysis from "@/components/reflections/analysis/Analysis";
import AnalysisSkeleton from "@/components/reflections/analysis/AnalysisSkeleton";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton component for the reflection content
function ReflectionContentSkeleton() {
  return (
    <div className="h-full w-full px-8 py-2">
      <div className="mb-4">
        <Logo className="w-24 h-auto" />
      </div>

      {/* Menu Bar Skeleton */}
      <div className="flex items-center gap-1 w-full px-2 mb-4">
        <div className="flex items-center gap-1 w-full">
          <Skeleton className="w-9 h-9" />
          <div className="flex flex-col w-full">
            <Skeleton className="h-6 w-48 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="pl-2">
        <div className="flex gap-4 h-[calc(100vh-200px)]">
          {/* Left Panel - Editor */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-4 h-full">
              {/* Toolbar Skeleton */}
              <div className="flex items-center gap-2 p-2 border rounded-lg">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>

              {/* Editor Content Skeleton */}
              <div className="flex-1 border rounded-lg p-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-7/8" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Analysis */}
          <div className="w-[38%] min-w-[300px]">
            <div className="bg-gray-50/70 p-2 rounded-lg h-full">
              {/* Tabs Skeleton */}
              <div className="grid w-full grid-cols-2 mb-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Analysis Content Skeleton */}
              <div className="h-[calc(100%-60px)]">
                <AnalysisSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReflectionEditorClientPage() {
  const params = useParams() as { reflectionId: string; slug: string };
  const { reflection, error } = useReflection(params.reflectionId);

  const {
    isLoading: isLoadingAnalysis,
    object: analysisReport,
    submit,
  } = experimental_useObject<AnalysisType>({
    api: `/api/analyze?workspaceId=${reflection?.workspaceId}`,
    schema: analysisSchema,
    initialValue: reflection?.analysisReport?.report as AnalysisType,
  });

  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState(0);

  // Collect all quotes from the analysis report patterns
  const allTextEvidence = useMemo(() => {
    if (!analysisReport) return [];

    const evidence: Array<{
      quote: string;
      analysis?: string;
      pattern?: string;
      severity?: string;
      who_exhibited?: string;
    }> = [];

    // Collect quotes from emotional patterns
    if (analysisReport.emotionalPatterns?.detectedPatterns) {
      for (const pattern of analysisReport.emotionalPatterns.detectedPatterns) {
        if (pattern?.quote) {
          evidence.push({
            quote: pattern.quote,
            analysis: pattern.impact,
            pattern: pattern.pattern,
            severity: pattern.severity,
            who_exhibited: pattern.who_exhibited,
          });
        }
      }
    }

    // Collect quotes from communication patterns
    if (analysisReport.communicationPatterns?.detectedPatterns) {
      for (const pattern of analysisReport.communicationPatterns
        .detectedPatterns) {
        if (pattern?.quote) {
          if (pattern?.quote) {
            evidence.push({
              quote: pattern.quote,
              analysis: pattern.impact,
              pattern: pattern.pattern,
              severity: pattern.severity,
            });
          }
        }
      }
    }

    // Collect quotes from behavioral patterns
    if (analysisReport.behaviorPatterns?.detectedPatterns) {
      for (const pattern of analysisReport.behaviorPatterns.detectedPatterns) {
        if (pattern?.quote) {
          evidence.push({
            quote: pattern.quote,
            analysis: pattern.impact,
            pattern: pattern.pattern,
            severity: pattern.severity,
          });
        }
      }
    }

    // Collect quotes from relationship dynamics
    if (analysisReport.relationshipDynamics?.detectedPatterns) {
      for (const pattern of analysisReport.relationshipDynamics
        .detectedPatterns) {
        if (pattern?.quote) {
          if (pattern?.quote) {
            evidence.push({
              quote: pattern.quote,
              analysis: pattern.impact,
              pattern: pattern.pattern,
              severity: pattern.severity,
              who_exhibited: pattern.who_exhibited,
            });
          }
        }
      }
    }

    // Collect quotes from attachment patterns
    if (analysisReport.attachmentPatterns?.detectedPatterns) {
      for (const pattern of analysisReport.attachmentPatterns
        .detectedPatterns) {
        if (pattern?.quote) {
          evidence.push({
            quote: pattern.quote,
            analysis: pattern.impact,
            pattern: pattern.pattern,
            severity: pattern.severity,
            who_exhibited: pattern.who_exhibited,
          });
        }
      }
    }

    // Collect quotes from trauma responses
    if (analysisReport.traumaResponses?.detectedPatterns) {
      for (const pattern of analysisReport.traumaResponses.detectedPatterns) {
        if (pattern?.quote) {
          evidence.push({
            quote: pattern.quote,
            analysis: pattern.impact,
            pattern: pattern.pattern,
            severity: pattern.severity,
            who_exhibited: pattern.who_exhibited,
          });
        }
      }
    }

    // Collect quotes from connection patterns
    if (analysisReport.connectionPatterns?.detectedPatterns) {
      for (const pattern of analysisReport.connectionPatterns
        .detectedPatterns) {
        if (pattern?.quote) {
          evidence.push({
            quote: pattern.quote,
            analysis: pattern.impact,
            pattern: pattern.pattern,
            severity: pattern.severity,
            who_exhibited: pattern.who_exhibited,
          });
        }
      }
    }

    // Collect quotes from cognitive patterns (thinking traps)
    if (analysisReport.cognitivePatterns?.thinkingTraps) {
      for (const trap of analysisReport.cognitivePatterns.thinkingTraps) {
        if (trap?.quote) {
          evidence.push({
            quote: trap.quote,
            analysis: trap.impact,
            pattern: trap.trap,
            severity: "moderate", // thinking traps don't have severity
          });
        }
      }
    }

    // Collect quotes from abuse detection
    if (analysisReport.abuseDetection?.detectedAbusiveBehaviors) {
      for (const behavior of analysisReport.abuseDetection
        .detectedAbusiveBehaviors) {
        if (behavior?.quote) {
          evidence.push({
            quote: behavior.quote,
            analysis: behavior.impact,
            pattern: behavior.behavior,
            severity: "severe", // abuse behaviors are typically severe
          });
        }
      }
    }

    return evidence;
  }, [analysisReport]);

  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    setSaveStatus("Saving...");

    try {
      await fetch(`/api/reflections/${params.reflectionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: json,
        }),
      });

      setSaveStatus("Saved");
      mutate(`/api/reflections/${params.reflectionId}`);
    } catch {
      setSaveStatus("Failed to save");
    }
  }, 500);

  const onAnalyze = async (story: string) => {
    if (!reflection) {
      return;
    }

    await submit({
      reflectionId: reflection.id,
      story,
    });
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Suspense fallback={<ReflectionContentSkeleton />}>
      <div className="h-full w-full px-8 py-2">
        <div className="mb-4">
          <Link href={`/${params.slug}`} className="inline-block">
            <Logo className="w-24 h-auto hover:opacity-75 transition-opacity" />
          </Link>
        </div>

        {reflection ? (
          <>
            <ReflectionsMenuBar reflection={reflection} onAnalyze={onAnalyze} />
            <div className="pl-2">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={62} minSize={30} collapsible>
                  <div className="flex flex-col gap-4">
                    <Toolbar />
                    <Tiptap
                      saveStatus={saveStatus}
                      charsCount={charsCount}
                      content={reflection.content}
                      onContentUpdate={debouncedUpdates}
                      textEvidence={allTextEvidence}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={38} minSize={25} collapsible>
                  <div className="bg-gray-50/70 p-2 rounded-lg">
                    <Tabs defaultValue="analysis">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="analysis">
                          <WandSparklesIcon className="w-4 h-4 mr-2" />
                          Analysis
                        </TabsTrigger>

                        <TabsTrigger value="ask-ai">
                          <SparklesIcon className="w-4 h-4 mr-2" />
                          Ask AI
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="analysis">
                        <Suspense fallback={<AnalysisSkeleton />}>
                          <Analysis
                            isLoading={isLoadingAnalysis}
                            // @ts-expect-error - analysisReport is not typed
                            analysisReport={analysisReport}
                          />
                        </Suspense>
                      </TabsContent>

                      <TabsContent value="ask-ai">
                        <AskAI />
                      </TabsContent>
                    </Tabs>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </>
        ) : (
          <ReflectionContentSkeleton />
        )}
      </div>
    </Suspense>
  );
}

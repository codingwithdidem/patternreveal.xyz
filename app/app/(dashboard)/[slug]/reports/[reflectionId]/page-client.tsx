"use client";

import Tiptap from "@/components/editor/Tiptap";
import Toolbar from "@/components/editor/Toolbar";
import useReflection from "@/lib/swr/use-reflection";
import { useParams } from "next/navigation";
import type { Editor } from "@tiptap/react";
import { useState, useMemo } from "react";
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
import Logo from "@/components/Logo";
import Link from "next/link";

export default function ReflectionEditorClientPage() {
  const params = useParams() as { reflectionId: string; slug: string };
  const { reflection, isLoading, error } = useReflection(params.reflectionId);

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
      startIndex?: number;
      endIndex?: number;
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
            startIndex: pattern.startIndex,
            endIndex: pattern.endIndex,
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
              startIndex: pattern.startIndex,
              endIndex: pattern.endIndex,
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
            startIndex: pattern.startIndex,
            endIndex: pattern.endIndex,
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
              startIndex: pattern.startIndex,
              endIndex: pattern.endIndex,
              pattern: pattern.pattern,
              severity: pattern.severity,
              who_exhibited: pattern.who_exhibited,
            });
          }
        }
      }
    }

    // Collect quotes from context factors
    if (analysisReport.contextFactors?.detectedPatterns) {
      for (const pattern of analysisReport.contextFactors.detectedPatterns) {
        if (pattern?.quote) {
          evidence.push({
            quote: pattern.quote,
            analysis: pattern.impact,
            startIndex: pattern.startIndex,
            endIndex: pattern.endIndex,
            pattern: pattern.pattern,
            severity: pattern.severity,
            who_exhibited: pattern.who_affected,
          });
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
            startIndex: pattern.startIndex,
            endIndex: pattern.endIndex,
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
            startIndex: pattern.startIndex,
            endIndex: pattern.endIndex,
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
            startIndex: pattern.startIndex,
            endIndex: pattern.endIndex,
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
            startIndex: trap.startIndex,
            endIndex: trap.endIndex,
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
            startIndex: behavior.startIndex,
            endIndex: behavior.endIndex,
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
    } catch (error) {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!reflection || error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="h-full w-full px-8 py-2">
      <div className="mb-4">
        <Link href={`/${params.slug}`} className="inline-block">
          <Logo className="w-24 h-auto hover:opacity-75 transition-opacity" />
        </Link>
      </div>
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
                  <Analysis
                    isLoading={isLoadingAnalysis}
                    // @ts-expect-error - analysisReport is not typed
                    analysisReport={analysisReport}
                  />
                </TabsContent>

                <TabsContent value="ask-ai">
                  <AskAI />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

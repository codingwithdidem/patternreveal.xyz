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

import { experimental_useObject } from "ai/react";
import { analysisSchema } from "@/lib/zod/schemas/analysis";
import type {
  Analysis as AnalysisType,
  TextEvidence,
} from "@/lib/zod/schemas/analysis";
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

  // Collect all text evidence from the analysis report
  const allTextEvidence = useMemo(() => {
    if (!analysisReport) return [];

    const evidence: TextEvidence[] = [];

    // Collect evidence from all sections that have textEvidence
    if (analysisReport.emotionalPatterns?.textEvidence) {
      evidence.push(
        ...analysisReport.emotionalPatterns.textEvidence.filter(
          (e): e is TextEvidence => !!e && !!e.quote && !!e.analysis
        )
      );
    }
    if (analysisReport.communicationPatterns?.textEvidence) {
      evidence.push(
        ...analysisReport.communicationPatterns.textEvidence.filter(
          (e): e is TextEvidence => !!e && !!e.quote && !!e.analysis
        )
      );
    }
    if (analysisReport.behaviorPatterns?.textEvidence) {
      evidence.push(
        ...analysisReport.behaviorPatterns.textEvidence.filter(
          (e): e is TextEvidence => !!e && !!e.quote && !!e.analysis
        )
      );
    }
    if (analysisReport.attachmentPatterns?.textEvidence) {
      evidence.push(
        ...analysisReport.attachmentPatterns.textEvidence.filter(
          (e): e is TextEvidence => !!e && !!e.quote && !!e.analysis
        )
      );
    }
    if (analysisReport.abuseDetection?.detectedAbusiveBehaviors) {
      for (const behavior of analysisReport.abuseDetection
        .detectedAbusiveBehaviors) {
        if (behavior?.textEvidence) {
          evidence.push(
            ...behavior.textEvidence.filter(
              (e): e is TextEvidence => !!e && !!e.quote && !!e.analysis
            )
          );
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
      <div className="grid grid-cols-8 pl-2 gap-2">
        <div className="col-span-5 flex flex-col gap-4">
          <Toolbar />
          <Tiptap
            saveStatus={saveStatus}
            charsCount={charsCount}
            content={reflection.content}
            onContentUpdate={debouncedUpdates}
            textEvidence={allTextEvidence}
          />
        </div>
        <div className="col-span-3 bg-gray-50/70 p-2 rounded-lg">
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
      </div>
    </div>
  );
}

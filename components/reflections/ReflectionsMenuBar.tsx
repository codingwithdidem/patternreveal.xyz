"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarTrigger
} from "@/components/ui/menubar";
import {
  DownloadIcon,
  FileCodeIcon,
  FileIcon,
  FileJsonIcon,
  FileTypeIcon,
  Loader2Icon,
  Share2Icon,
  SparklesIcon
} from "lucide-react";
import ReflectionTitleInput from "./ReflectionTitleInput";
import type { Prisma } from "@prisma/client";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createReflectionReportLinkAction } from "@/lib/actions/create-reflection-report-link";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

type ReflectionsMenuBarProps = {
  reflection: Prisma.ReflectionGetPayload<{
    include: {
      analysisReport: true;
    };
  }>;
  onAnalyze: (text: string) => void;
};

export default function ReflectionsMenuBar({
  reflection
}: ReflectionsMenuBarProps) {
  const posthog = usePostHog();
  const { editor } = useEditorStore();

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = async () => {
    if (!editor) return;

    const json = editor.getJSON();

    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json"
    });

    onDownload(blob, `${reflection.title}.json`);
  };

  const onSaveHTML = async () => {
    if (!editor) return;

    const html = editor.getHTML();

    const blob = new Blob([html], {
      type: "text/html"
    });

    onDownload(blob, `${reflection.title}.html`);
  };

  const onSaveText = async () => {
    if (!editor) return;

    const text = editor.getText();

    const blob = new Blob([text], {
      type: "text/plain"
    });

    onDownload(blob, `${reflection.title}.txt`);
  };

  const onAnalyzeReflection = async () => {
    if (!editor) return;

    const text = editor.getText();

    onAnalyze(text);
  };

  const shareReflectionReport = useAction(createReflectionReportLinkAction, {
    onSuccess: ({ data }) => {
      navigator.clipboard.writeText(data?.reportLink ?? "");
      // Capture reflection report shared event
      posthog.capture("reflection_report_shared", {
        report_id: reflection.id,
        report_title: reflection.title,
        report_link: data?.reportLink
      });

      toast.success("Reflection report link copied to clipboard");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to share reflection report");
    }
  });

  return (
    <div className="flex items-center gap-1 w-full px-2">
      <div className="flex items-center gap-1 w-full">
        <FileIcon size={36} />
        <div className="flex flex-col w-full">
          <ReflectionTitleInput
            title={reflection.title}
            reflectionId={reflection.id}
          />

          <Menubar className="border-none shadow-none -ml-2 -mt-1">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent className="print:hidden">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <DownloadIcon size={16} className="mr-2" /> Download
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={onSaveJSON}>
                      <FileJsonIcon size={16} className="mr-2" /> JSON
                    </MenubarItem>
                    <MenubarItem onClick={onSaveHTML}>
                      <FileCodeIcon size={16} className="mr-2" /> HTML
                    </MenubarItem>
                    <MenubarItem onClick={onSaveText}>
                      <FileTypeIcon size={16} className="mr-2" /> Plain Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={"outline"}
          className="rounded-full px-4 h-10 text-base"
          onClick={() => {
            shareReflectionReport.execute({
              baseUrl: window.location.origin,
              reflectionId: reflection.id,
              expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000 // 1 week
              ).toISOString()
            });
          }}
          disabled={shareReflectionReport.isExecuting}
        >
          {shareReflectionReport.isExecuting ? (
            <Loader2Icon size={16} className="mr-1 animate-spin" />
          ) : (
            <Share2Icon size={16} className="mr-1" />
          )}
          Share
        </Button>
        <RainbowButton
          className="h-10 px-4 rounded-full"
          onClick={onAnalyzeReflection}
        >
          <SparklesIcon size={16} className="mr-2" />
          Analyze
        </RainbowButton>
      </div>
    </div>
  );
}

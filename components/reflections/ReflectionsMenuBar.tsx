"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DownloadIcon,
  FileCodeIcon,
  FileIcon,
  FileJsonIcon,
  FileTypeIcon,
  SparklesIcon,
} from "lucide-react";
import ReflectionTitleInput from "./ReflectionTitleInput";
import type { Prisma } from "@prisma/client";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useState } from "react";
import ShareReportModal from "../modals/ShareReportModal";
import { toast } from "sonner";

type ReflectionsMenuBarProps = {
  reflection: Prisma.ReflectionGetPayload<{
    include: {
      analysisReport: true;
    };
  }>;
  onAnalyze: (text: string) => void;
};

export default function ReflectionsMenuBar({
  reflection,
  onAnalyze,
}: ReflectionsMenuBarProps) {
  const { editor } = useEditorStore();

  const [openShareReportModal, setOpenShareReportModal] = useState(false);

  useKeyboardShortcut(
    "s",
    (ev) => {
      ev.preventDefault();

      const shareButton = document.getElementById(
        "share-reflection-report"
      ) as HTMLButtonElement;

      if (shareButton) {
        shareButton.click();
      }
    },
    {
      enabled: false,
    }
  );

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
      type: "application/json",
    });

    onDownload(blob, `${reflection.title}.json`);
  };

  const onSaveHTML = async () => {
    if (!editor) return;

    const html = editor.getHTML();

    const blob = new Blob([html], {
      type: "text/html",
    });

    onDownload(blob, `${reflection.title}.html`);
  };

  const onSaveText = async () => {
    if (!editor) return;

    const text = editor.getText();

    const blob = new Blob([text], {
      type: "text/plain",
    });

    onDownload(blob, `${reflection.title}.txt`);
  };

  const onDownloadAnalysisReport = async () => {
    if (
      !reflection.analysisReport ||
      reflection.analysisStatus !== "COMPLETED"
    ) {
      console.log("No analysis report found or analysis not completed");
      return;
    }

    console.log("Analysis report data:", reflection.analysisReport);

    try {
      console.log("Starting PDF generation...");

      // Import react-pdf dynamically
      const { pdf } = await import("@react-pdf/renderer");
      console.log("React PDF imported successfully");

      const AnalysisReportPDF = (await import("./analysis/AnalysisReportPDF"))
        .default;
      console.log("AnalysisReportPDF component imported successfully");

      // Generate PDF blob
      console.log("Generating PDF blob...");
      const blob = await pdf(
        <AnalysisReportPDF
          title={reflection.title}
          createdAt={reflection.createdAt}
          analysisReport={reflection.analysisReport}
        />
      ).toBlob();

      console.log("PDF blob generated successfully, size:", blob.size);

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${reflection.title}-analysis-report.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      console.log("PDF download initiated");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report. Please try again later.");
    }
  };

  const onAnalyzeReflection = async () => {
    if (!editor) return;

    // Don't allow analysis if already in progress or completed
    if (
      reflection.analysisStatus === "IN_PROGRESS" ||
      reflection.analysisStatus === "COMPLETED"
    ) {
      return;
    }

    const text = editor.getText();
    await onAnalyze(text);
  };

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

            <MenubarMenu>
              <MenubarTrigger>Report</MenubarTrigger>
              <MenubarContent className="print:hidden">
                <MenubarItem onClick={onDownloadAnalysisReport}>
                  <DownloadIcon size={16} className="mr-2" /> Download Analysis
                  Report (PDF)
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          id="share-reflection-report"
          variant={"outline"}
          className="rounded-full px-4 h-10 text-base"
          onClick={() => {
            setOpenShareReportModal(true);
          }}
        >
          Share
        </Button>
        <Tooltip
          content={
            reflection.analysisStatus === "IN_PROGRESS"
              ? "Analysis in progress..."
              : reflection.analysisStatus === "COMPLETED"
              ? "This reflection has already been analyzed"
              : reflection.analysisStatus === "FAILED"
              ? "Previous analysis failed. Click to retry."
              : "Analyze this reflection for patterns and insights"
          }
        >
          <RainbowButton
            className="h-10 px-4 rounded-full"
            onClick={onAnalyzeReflection}
            disabled={
              reflection.analysisStatus === "IN_PROGRESS" ||
              reflection.analysisStatus === "COMPLETED"
            }
          >
            <SparklesIcon size={16} className="mr-2" />
            {reflection.analysisStatus === "IN_PROGRESS"
              ? "Analyzing..."
              : reflection.analysisStatus === "COMPLETED"
              ? "Analyzed"
              : reflection.analysisStatus === "FAILED"
              ? "Retry Analysis"
              : "Analyze"}
          </RainbowButton>
        </Tooltip>
      </div>

      <ShareReportModal
        open={openShareReportModal}
        reflection={reflection}
        onClose={() => setOpenShareReportModal(false)}
      />
    </div>
  );
}

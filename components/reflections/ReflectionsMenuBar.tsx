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
  SparklesIcon
} from "lucide-react";
import ReflectionTitleInput from "./ReflectionTitleInput";
import type { Prisma } from "@prisma/client";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useState } from "react";
import ShareReportModal from "../modals/ShareReportModal";

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
  onAnalyze
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
      enabled: false
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
          id="share-reflection-report"
          variant={"outline"}
          className="rounded-full px-4 h-10 text-base"
          onClick={() => {
            setOpenShareReportModal(true);
          }}
        >
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

      <ShareReportModal
        open={openShareReportModal}
        reflection={reflection}
        onClose={() => setOpenShareReportModal(false)}
      />
    </div>
  );
}

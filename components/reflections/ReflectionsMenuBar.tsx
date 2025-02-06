"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarTrigger
} from "@/components/ui/menubar";
import {
  FileCodeIcon,
  FileIcon,
  FileJsonIcon,
  FileTypeIcon
} from "lucide-react";
import ReflectionTitleInput from "./ReflectionTitleInput";
import type { Reflection } from "@prisma/client";
import { useEditorStore } from "@/lib/store/useEditorStore";

type ReflectionsMenuBarProps = {
  reflection: Reflection;
};

export default function ReflectionsMenuBar({
  reflection
}: ReflectionsMenuBarProps) {
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

  return (
    <div className="flex items-center gap-1">
      <FileIcon size={36} />
      <div className="flex flex-col">
        <ReflectionTitleInput
          title={reflection.title}
          reflectionId={reflection.id}
        />
        <Menubar className="border-none shadow-none -ml-2">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent className="print:hidden">
              <MenubarSub>
                <MenubarSubTrigger>
                  <FileIcon size={16} className="mr-2" /> Download
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={onSaveJSON}>
                    <FileJsonIcon size={16} className="mr-2" /> JSON
                    <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={onSaveHTML}>
                    <FileCodeIcon size={16} className="mr-2" /> HTML
                    <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={onSaveText}>
                    <FileTypeIcon size={16} className="mr-2" /> Plain Text
                    <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

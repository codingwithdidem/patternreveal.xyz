"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from "@/components/ui/menubar";
import { FileIcon } from "lucide-react";
import ReflectionTitleInput from "./ReflectionTitleInput";
import type { Reflection } from "@prisma/client";

type ReflectionsMenuBarProps = {
  reflection: Reflection;
};

export default function ReflectionsMenuBar({
  reflection
}: ReflectionsMenuBarProps) {
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
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

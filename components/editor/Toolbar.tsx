"use client";

import { useEditorStore } from "@/lib/store/useEditorStore";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from "lucide-react";
import { Separator } from "@components/ui/separator";
import ColorSelector from "./tools/ColorSelector";
import LinkButton from "./tools/Link";
import Headings from "./tools/Headings";
import Fonts from "./tools/Fonts";
import ToolbarButton from "./ToolbarButton";

export default function Toolbar() {
  const { editor } = useEditorStore();

  const sections = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        tooltip: "Undo (⌘Z)"
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        tooltip: "Redo (⌘Y)"
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
        tooltip: "Spell Check (⌘+Option+X)"
      }
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
        tooltip: "Bold (⌘B)"
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
        tooltip: "Italic (⌘I)"
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
        tooltip: "Underline (⌘U)"
      }
    ],
    [
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
        tooltip: "Checklist (⌘+Shift+9)"
      },
      {
        label: "Bullet List",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
        tooltip: "Bulleted List (⌘+Shift+8)"
      },
      {
        label: "Ordered List",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
        tooltip: "Numbered List (⌘+Shift+7)"
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        tooltip: "Clear Formatting (⌘\\)"
      }
    ],
    [
      {
        label: "Left",
        icon: AlignLeftIcon,
        onClick: () => editor?.chain().focus().setTextAlign("left").run(),
        isActive: editor?.isActive({
          textAlign: "left"
        }),
        tooltip: "Left Align (⌘+Shift+L)"
      },
      {
        label: "Center",
        icon: AlignCenterIcon,
        onClick: () => editor?.chain().focus().setTextAlign("center").run(),
        isActive: editor?.isActive({
          textAlign: "center"
        }),
        tooltip: "Center Align (⌘+Shift+E)"
      },
      {
        label: "Right",
        icon: AlignRightIcon,
        onClick: () => editor?.chain().focus().setTextAlign("right").run(),
        isActive: editor?.isActive({
          textAlign: "right"
        }),
        tooltip: "Right Align (⌘+Shift+R)"
      }
    ]
  ];

  return (
    <div className="bg-[#f1f4f9] min-h-10 px-2.5 py-1.5 rounded-3xl flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((section) => (
        <ToolbarButton
          key={section.label}
          icon={section.icon}
          onClick={section.onClick}
          tooltip={section.tooltip}
        />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Headings />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Fonts />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((section) => (
        <ToolbarButton
          key={section.label}
          icon={section.icon}
          onClick={section.onClick}
          tooltip={section.tooltip}
        />
      ))}
      <ColorSelector />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((section) => (
        <ToolbarButton
          key={section.label}
          icon={section.icon}
          onClick={section.onClick}
          tooltip={section.tooltip}
        />
      ))}
      <LinkButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[3].map((section) => (
        <ToolbarButton
          key={section.label}
          icon={section.icon}
          onClick={section.onClick}
          tooltip={section.tooltip}
        />
      ))}
    </div>
  );
}

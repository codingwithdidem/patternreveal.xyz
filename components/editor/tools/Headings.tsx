import { useEditorStore } from "@/lib/store/useEditorStore";
import type { Level } from "@tiptap/extension-heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Headings() {
  const { editor } = useEditorStore();
  const headings = [
    {
      label: "Normal Text",
      value: 0,
      fontSize: "16px"
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px"
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px"
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px"
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px"
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px"
    },
    {
      label: "Heading 6",
      value: 6,
      fontSize: "14px"
    }
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Tooltip content="Styles">
          <Button variant={"ghost"} className={cn("hover:bg-neutral-200/80")}>
            <span className="truncate">{getCurrentHeading()}</span>
            <ChevronDown className="size-4 ml-2 shrink-0" />
          </Button>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map((heading) => (
          <DropdownMenuItem
            key={heading.label}
            onClick={() => {
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
              }
            }}
            className={cn(
              (heading.value === 0 && !editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: heading.value })
                ? "bg-neutral-200"
                : "bg-transparent"
            )}
            style={{ fontSize: heading.fontSize }}
          >
            {heading.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

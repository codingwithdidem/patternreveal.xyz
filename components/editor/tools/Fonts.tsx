import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function Fonts() {
  const { editor } = useEditorStore();

  const fonts = [
    {
      label: "Satoshi",
      value: "Satoshi"
    },
    {
      label: "Erode",
      value: "Erode"
    },
    {
      label: "Arial",
      value: "Arial"
    },
    {
      label: "Verdana",
      value: "Verdana"
    }
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Tooltip content={"Font"}>
          <Button variant={"ghost"} className={cn("hover:bg-neutral-200/80")}>
            <span className="truncate">
              {editor?.getAttributes("textStyle")?.fontFamily || "Arial"}
            </span>
            <ChevronDown className="size-4 ml-2 shrink-0" />
          </Button>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.label}
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
            className={cn(
              editor?.getAttributes("textStyle")?.fontFamily === font.value
                ? "bg-neutral-200"
                : "bg-transparent"
            )}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

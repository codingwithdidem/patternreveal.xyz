import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const TEXT_COLORS = [
  {
    label: "Default",
    color: "#000000"
  },
  {
    label: "Purple",
    color: "#9333EA"
  },
  {
    label: "Red",
    color: "#E00000"
  },
  {
    label: "Yellow",
    color: "#EAB308"
  },
  {
    label: "Blue",
    color: "#2563EB"
  },
  {
    label: "Green",
    color: "#008A00"
  },
  {
    label: "Orange",
    color: "#FFA500"
  },
  {
    label: "Pink",
    color: "#BA4081"
  },
  {
    label: "Gray",
    color: "#A8A29E"
  }
] as const;

const HIGHLIGHT_COLORS = [
  {
    label: "Default",
    color: "#000000"
  },
  {
    label: "Purple",
    color: "#9333EA"
  },
  {
    label: "Red",
    color: "#E00000"
  },
  {
    label: "Yellow",
    color: "#EAB308"
  },
  {
    label: "Blue",
    color: "#2563EB"
  },
  {
    label: "Green",
    color: "#008A00"
  },
  {
    label: "Orange",
    color: "#FFA500"
  },
  {
    label: "Pink",
    color: "#BA4081"
  },
  {
    label: "Gray",
    color: "#A8A29E"
  }
] as const;

export default function ColorSelector() {
  const { editor } = useEditorStore();

  const activeColorItem = TEXT_COLORS.find((item) => {
    return editor?.isActive("textStyle", { color: item.color });
  });

  const activeHighlightItem = HIGHLIGHT_COLORS.find((item) => {
    return editor?.isActive("highlight", { color: item.color });
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Tooltip content={"Color"}>
          <button
            type="button"
            className={cn(
              "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            )}
          >
            <span
              className="rounded-sm px-2"
              style={{
                color: activeColorItem?.color,
                backgroundColor: activeHighlightItem?.color
              }}
            >
              A
            </span>
          </button>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Color
          </div>
          {TEXT_COLORS.map(({ label, color }) => (
            <DropdownMenuItem
              key={label}
              onSelect={() => {
                editor?.commands.unsetColor();
                label !== "Default" &&
                  editor
                    ?.chain()
                    .focus()
                    .setColor(color || "")
                    .run();
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{label}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <div>
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Background
          </div>
          {HIGHLIGHT_COLORS.map(({ label, color }) => (
            <DropdownMenuItem
              key={label}
              onSelect={() => {
                editor?.commands.unsetHighlight();
                label !== "Default" &&
                  editor?.chain().focus().setHighlight({ color }).run();
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{label}</span>
              </div>
              {editor?.isActive("highlight", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

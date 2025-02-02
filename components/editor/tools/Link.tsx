import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
import { useEditorStore } from "@/lib/store/useEditorStore";
import { cn } from "@/lib/utils";
import { Link2Icon } from "lucide-react";
import { useRef } from "react";

export default function LinkButton() {
  const { editor } = useEditorStore();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Tooltip content="Insert Link (⌘+K)">
          <button
            type="button"
            className={cn(
              "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            )}
          >
            <Link2Icon
              className={cn("size-4 shrink-0", {
                "text-blue-500": editor?.isActive("link")
              })}
            />
          </button>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex items-center gap-x-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Paste link"
          defaultValue={editor?.getAttributes("link")?.href || ""}
        />

        {
          // Remove link
          editor?.isActive("link") ? (
            <Button
              onClick={() => {
                editor?.chain().focus().unsetLink().run();

                if (!inputRef.current) return;
                inputRef.current.value = "";
              }}
            >
              Unlink
            </Button>
          ) : (
            <Button
              onClick={() => {
                const href = inputRef.current?.value;
                if (!href) return;
                editor
                  ?.chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href })
                  .run();
              }}
            >
              Link
            </Button>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

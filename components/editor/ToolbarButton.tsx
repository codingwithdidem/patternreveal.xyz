import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

type ToolbarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  tooltip: string;
};

export default function ToolbarButton({
  isActive,
  icon: Icon,
  onClick,
  tooltip
}: ToolbarButtonProps) {
  return (
    <Tooltip content={tooltip}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
          isActive ? "bg-neutral-200" : "bg-transparent"
        )}
      >
        <Icon className="size-4" />
      </button>
    </Tooltip>
  );
}

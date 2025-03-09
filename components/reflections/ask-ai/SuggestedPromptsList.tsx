import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import { SUGGESTED_USER_PROMPTS } from "@/lib/ai/prompts";
import { LightbulbIcon } from "lucide-react";

export default function SuggestedPromptsList() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LightbulbIcon className="size-5 text-slate-600 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel className="text-gray-500">
          OR CHOOSE FROM SUGGESTED PROMPTS
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {SUGGESTED_USER_PROMPTS.map((prompt) => (
            <DropdownMenuItem
              className="p-2 flex flex-col gap-2 items-start cursor-pointer"
              key={prompt.id}
            >
              <div className="bg-emerald-100 rounded-sm p-1 px-2 text-emerald-800 font-semibold text-xs uppercase">
                <span className="bg-emerald-500 px-2 -ml-3 mr-2 py-1 rounded-sm text-white text-xs">
                  Good For:
                </span>{" "}
                {prompt.topic}
              </div>

              {prompt.prompt}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

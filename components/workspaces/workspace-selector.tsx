"use client";

import useWorkspaces from "@/lib/swr/use-workspaces";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { ChevronsUpDownIcon } from "lucide-react";
import { Combobox, type ComboboxOption } from "../ui/combobox";
import { cn } from "@/lib/utils";

type WorkspaceSelectorProps = {
  selectedWorkspace: string | null;
  setSelectedWorkspace: (workspace: string) => void;
};

export default function WorkspaceSelector({
  selectedWorkspace,
  setSelectedWorkspace
}: WorkspaceSelectorProps) {
  const { workspaces, loading } = useWorkspaces();

  const [open, setOpen] = useState(false);

  const workspaceOptions = useMemo(() => {
    return (
      workspaces?.map((workspace) => ({
        label: workspace.name,
        value: workspace.slug
      })) || []
    );
  }, [workspaces]);

  const selectedWorkspaceOption = useMemo(() => {
    if (!selectedWorkspace) {
      return null;
    }

    const workspace = workspaces?.find((w) => w.slug === selectedWorkspace);

    if (!workspace) {
      return null;
    }

    return {
      value: workspace.slug,
      label: workspace.name
    };
  }, [workspaces, selectedWorkspace]);

  console.log(selectedWorkspaceOption);

  return (
    <>
      <Combobox
        options={loading ? [] : workspaceOptions}
        selected={selectedWorkspaceOption}
        setSelected={(option: ComboboxOption | null) => {
          if (option) {
            setSelectedWorkspace(option.value);
          }
        }}
        searchPlaceholder={loading ? "" : "Search workspaces..."}
        placeholder={loading ? "" : "Select workspace"}
        open={open}
        onOpenChange={setOpen}
        caret
        matchTriggerWidth
        buttonProps={{
          className: cn(
            "border border-neutral-300 px-3",
            "data-[state=open]:ring-1 data-[state=open]:ring-neutral-500 data-[state=open]:border-neutral-500",
            "focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 transition-none"
          )
        }}
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="size-4 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-4 w-44 animate-pulse rounded-md bg-neutral-200" />
          </div>
        ) : (
          <span className="text-sm">{selectedWorkspaceOption?.label}</span>
        )}
      </Combobox>
    </>
  );
}

"use client";

import useWorkspaces from "@/lib/swr/use-workspaces";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { ChevronsUpDownIcon } from "lucide-react";
import { Combobox } from "../ui/combobox";
import { cn } from "@/lib/utils";

export default function WorkspaceSwitcher() {
  const { data: session } = useSession();
  const { workspaces, loading } = useWorkspaces();

  const [open, setOpen] = useState(false);

  console.log({
    user: session?.user
  });

  const defaultWorkspace = workspaces?.find(
    (workspace) => workspace.slug === session?.user?.defaultWorkspace
  );

  console.log(workspaces);

  const workspaceOptions = useMemo(() => {
    return workspaces?.map((workspace) => ({
      label: workspace.name,
      value: workspace.slug
    }));
  }, [workspaces]);

  return (
    <>
      <Combobox
        open={open}
        onOpenChange={setOpen}
        caret
        matchTriggerWidth
        buttonProps={{
          className: cn(
            "w-full justify-start border-neutral-300 px-3",
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
          <span className="text-sm">{defaultWorkspace?.name}</span>
        )}
      </Combobox>
      {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild></PopoverTrigger>
        <PopoverContent className="w-60" align="start">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Dimensions</h4>
              <p className="text-muted-foreground text-sm">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              {workspaces?.map((workspace) => (
                <div key={workspace.id}>{workspace.name}</div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover> */}
    </>
  );
}

"use client";

import useWorkspaces from "@/lib/swr/use-workspaces";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import type { Workspace } from "@prisma/client";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import Link from "next/link";
import { useAddWorkspaceModal } from "@/lib/stores/modal-store";

export default function WorkspaceDropdown({
  matchTriggerWidth = true
}: {
  matchTriggerWidth?: boolean;
}) {
  const { workspaces, loading: workspacesLoading } = useWorkspaces();
  const { data: session, status } = useSession();

  const { slug: workspaceSlug } = useParams() as {
    slug?: string;
  };

  const [openPopover, setOpenPopover] = useState(false);

  const selectedWorkspace = useMemo(() => {
    if (!workspaces) return null;

    const currentWorkspace = workspaces.find(
      (workspace) => workspace.slug === workspaceSlug
    );

    if (!currentWorkspace) {
      return null;
    }

    return currentWorkspace;
  }, [workspaces, workspaceSlug]);

  if (workspacesLoading || !workspaces || status === "loading") {
    return (
      <div className="flex w-full animate-pulse items-center gap-x-1.5 rounded-lg p-1.5">
        <div className="size-7 animate-pulse rounded-full bg-neutral-200" />
        <div className="mb-px mt-0.5 h-8 w-28 grow animate-pulse rounded-md bg-neutral-200" />
        <ChevronsUpDown
          className="h-4 w-4 text-neutral-400"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={() => setOpenPopover(!openPopover)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition-all duration-75 hover:bg-neutral-200/50 active:bg-neutral-200/80 data-[state=open]:bg-neutral-200/80",
            "outline-none focus-visible:ring-2 focus-visible:ring-black/50"
          )}
        >
          <div className="flex items-center gap-x-2 pr-2">
            <div className={cn("block min-w-0")}>
              <div className="truncate text-sm font-medium leading-5 text-neutral-900">
                {selectedWorkspace?.name}
              </div>
              {selectedWorkspace?.slug !== "/" && (
                <div
                  className={cn(
                    "truncate text-xs capitalize leading-tight",
                    getPlanColor(selectedWorkspace?.plan ?? "")
                  )}
                >
                  {selectedWorkspace?.plan}
                </div>
              )}
            </div>
          </div>
          <ChevronsUpDown
            className="size-4 shrink-0 text-neutral-400"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-full p-0", {
          "sm:w-[var(--radix-popover-trigger-width)]": matchTriggerWidth
        })}
        align="start"
      >
        <WorkspaceList
          workspaces={workspaces}
          selectedWorkspace={selectedWorkspace}
          onClose={() => setOpenPopover(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

function WorkspaceList({
  workspaces,
  selectedWorkspace,
  onClose
}: {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { setShow } = useAddWorkspaceModal();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, updateScrollProgress } = useScrollProgress(scrollRef);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        onScroll={updateScrollProgress}
        className="relative max-h-80 w-full space-y-0.5 overflow-auto rounded-lg bg-white text-base  sm:text-sm"
      >
        <div className="flex flex-col gap-0.5 border-b border-neutral-200 p-2">
          <div className="flex items-center gap-x-2">
            <div className={cn("block min-w-0")}>
              <div className="truncate text-sm font-medium leading-5 text-neutral-900">
                {selectedWorkspace?.name}
              </div>
              {selectedWorkspace?.slug !== "/" && (
                <div
                  className={cn(
                    "truncate text-xs capitalize leading-tight",
                    getPlanColor(selectedWorkspace?.plan ?? "")
                  )}
                >
                  {selectedWorkspace?.plan}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 p-2">
          <p className="text-xs font-medium text-neutral-500 pb-1">
            Workspaces
          </p>
          {workspaces.map(({ id, name, slug, plan }) => {
            const isActive = selectedWorkspace?.slug === slug;
            return (
              <Link
                key={slug}
                onClick={onClose}
                shallow={false}
                href={
                  pathname
                    .replace(selectedWorkspace?.slug ?? "", slug)
                    .split("?")[0]
                }
                className={cn(
                  "relative flex w-full items-center gap-x-2 rounded-md px-2 py-1.5 transition-all duration-75",
                  "hover:bg-neutral-200/50 active:bg-neutral-200/80",
                  "outline-none focus-visible:ring-2 focus-visible:ring-black/50",
                  isActive && "bg-neutral-200/50"
                )}
              >
                <div>
                  <span className="block truncate text-sm leading-5 text-neutral-900 sm:max-w-[140px]">
                    {name}
                  </span>
                  {slug !== "/" && (
                    <div
                      className={cn(
                        "truncate text-xs capitalize leading-tight",
                        getPlanColor(plan)
                      )}
                    >
                      {plan}
                    </div>
                  )}
                </div>
                {selectedWorkspace?.slug === slug ? (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                ) : null}
              </Link>
            );
          })}
          <button
            type="button"
            key="add"
            onClick={() => {
              onClose();
              setShow(true);
            }}
            className="group flex w-full cursor-pointer items-center gap-x-2 p-2 rounded-md text-neutral-700 transition-all duration-75 hover:bg-neutral-200/50 active:bg-neutral-200/80"
          >
            <Plus className="mx-1.5 size-4 text-neutral-500" />
            <span className="block truncate">Create new workspace</span>
          </button>
        </div>
      </div>
      {/* Bottom scroll fade */}
      <div
        className="pointer-events-none absolute -bottom-px left-0 h-16 w-full rounded-b-lg bg-gradient-to-t from-white sm:bottom-0"
        style={{ opacity: 1 - scrollProgress ** 2 }}
      />
    </div>
  );
}

const getPlanColor = (plan: string) =>
  plan === "enterprise"
    ? "text-purple-700"
    : plan === "advanced"
      ? "text-amber-800"
      : plan.startsWith("business")
        ? "text-blue-900"
        : plan === "pro"
          ? "text-cyan-900"
          : "text-neutral-500";

"use client";

import AnimatedEmptyState from "@/components/AnimatedEmptyState";
import ReflectionsTable from "@/components/reflections/ReflectionsTable";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/ui/filter/filter-select";
import PaginationControls from "@/components/ui/pagination-controls";
import useReflections from "@/lib/swr/use-reflections";
import { usePagination } from "@/hooks/usePagination";
import { ActivityIcon, FlagIcon, UserIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import type { ComponentProps } from "react";
import useReflectionQueryParams from "@/hooks/nuqs/useReflectionQueryParams";
import useWorkspace from "@/lib/swr/use-workspace";
import { useEffect } from "react";
import { useUsers } from "@/lib/swr/use-users";
import { mutatePrefix } from "@/lib/swr/mutate";

const redFlags = [
  {
    id: 1,
    title: "Putdowns",
  },
  {
    id: 2,
    title: "Gaslighting",
  },
  {
    id: 3,
    title: "Name-calling",
  },
];

export default function ReflectionsClientPage() {
  const router = useRouter();
  const { slug: workspaceSlug } = useParams<{ slug: string }>();
  const { id: workspaceId } = useWorkspace();
  const { members } = useUsers();

  // Pagination state
  const [paginationState, paginationActions, paginationInfo] = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });

  const { filters: activeFilters, setFilters } = useReflectionQueryParams();

  // Fetch reflections with pagination
  const { reflections, pagination, error } = useReflections({
    page: paginationState.page,
    pageSize: paginationState.limit,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
    searchMode: "fuzzy",
    includeAIReport: true,
    includeUser: true,
    includeDashboard: true,
    ...(activeFilters.status && {
      status: activeFilters.status,
    }),
    ...(activeFilters.creators && {
      creators: activeFilters.creators,
    }),
  });

  // Update pagination total when data changesü
  useEffect(() => {
    if (pagination?.total !== undefined) {
      paginationActions.setTotal(pagination.total);
    }
  }, [pagination?.total, paginationActions]);

  // Transform activeFilters into the format expected by FilterSelect
  const transformedActiveFilters = Object.entries(activeFilters)
    .filter(([key, values]) => {
      if (key === "status") {
        return values !== null && values !== undefined;
      }
      return Array.isArray(values) && values.length > 0;
    })
    .flatMap(([key, values]) => {
      if (key === "status" && !Array.isArray(values)) {
        return [{ key, value: values as string }];
      }
      if (Array.isArray(values)) {
        return (values as string[]).map((value: string) => ({
          key,
          value,
        }));
      }
      return [];
    });

  const createReflection = async () => {
    try {
      const response = await fetch(
        `/api/reflections?workspaceId=${workspaceId}`,
        {
          method: "POST",
          body: JSON.stringify({
            title: "Untitled Reflection",
            content: JSON.stringify({
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "" }],
                },
              ],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }),
        }
      );

      if (response.status === 200) {
        toast.success("Reflection created successfully");

        // Invalidate reflection-related cache to show the new reflection
        mutatePrefix([
          `/api/reflections?workspaceId=${workspaceId}`,
          "/api/reflections/popular",
          "/api/workspaces/",
        ]);

        // Redirect to the newly created reflection
        const { id } = await response.json();
        router.push(`/app/${workspaceSlug}/reports/${id}`);
      } else {
        const { error } = await response.json();
        toast.error(error.message);
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create reflection");
    }
  };

  const isLoading = !reflections && !error;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filters: ComponentProps<typeof FilterSelect>["filters"] = [
    {
      key: "status",
      label: "Status",
      icon: <ActivityIcon className="size-4" />,
      separatorAfter: true,
      multiple: false,
      options: [
        {
          label: "Has AI Report",
          value: "has-ai-report",
          icon: <FlagIcon className="size-4" />,
        },
        {
          label: "No AI Report",
          value: "no-ai-report",
          icon: <FlagIcon className="size-4" />,
        },
      ],
    },
    {
      key: "creators",
      label: "Creator",
      icon: <UserIcon className="size-4" />,
      separatorAfter: false,
      multiple: true,
      options: members.map((member) => ({
        label: member.name,
        value: member.id,
        icon: <UserIcon className="size-4" />,
      })),
    },
  ];

  return (
    <div className="p-4 h-full w-full">
      <div className="flex flex-col gap-2 items-start py-10 max-w-6xl mx-auto h-full">
        <div className="flex items-center justify-between w-full">
          <div className="">
            <FilterSelect
              filters={filters}
              activeFilters={transformedActiveFilters}
              onSelect={async (key, value) => {
                console.log("onselecr", {
                  key,
                  value,
                });
                setFilters((prev) => {
                  if (key === "status") {
                    return {
                      ...prev,
                      status: String(value) as "has-ai-report" | "no-ai-report",
                    };
                  }

                  const currentValues = Array.isArray(
                    prev[key as keyof typeof prev]
                  )
                    ? (prev[key as keyof typeof prev] as string[])
                    : [];

                  if (!currentValues.includes(String(value))) {
                    return {
                      ...prev,
                      [key]: [...currentValues, String(value)],
                    };
                  }
                  return prev;
                });
              }}
              onRemove={(key, value) => {
                console.log("onselecr", {
                  key,
                  value,
                });
                setFilters((prev) => {
                  if (key === "status") {
                    return {
                      ...prev,
                      status: null,
                    };
                  }

                  const currentValues = Array.isArray(
                    prev[key as keyof typeof prev]
                  )
                    ? (prev[key as keyof typeof prev] as string[])
                    : [];

                  return {
                    ...prev,
                    [key]: currentValues.filter(
                      (v: string) => v !== String(value)
                    ),
                  };
                });
              }}
            />
          </div>
          <Button onClick={createReflection}>Create Reflection</Button>
        </div>

        {reflections && reflections?.length > 0 ? (
          <>
            <ReflectionsTable reflections={reflections} />

            <div className="w-full absolute bottom-10">
              <PaginationControls
                actions={paginationActions}
                info={paginationInfo}
                total={paginationState.total}
                page={paginationState.page}
                limit={paginationState.limit}
                showItemsPerPage={true}
                itemsPerPageOptions={[10, 20, 50, 100]}
              />
            </div>
          </>
        ) : (
          <AnimatedEmptyState
            className="h-full w-full"
            title="No reflections found"
            description="Start creating daily reflections to track your progress."
            addButton={
              <Button onClick={createReflection}>Create reflection</Button>
            }
            cardContent={(idx) => (
              <div className="flex items-center space-x-4">
                <FlagIcon className="w-6 h-6 text-red-700 shrink-0" />
                <span className="text-sm text-neutral-900 uppercase">
                  {redFlags[idx].title}
                </span>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}

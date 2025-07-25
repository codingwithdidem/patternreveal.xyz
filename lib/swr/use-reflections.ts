import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Prisma } from "@prisma/client";
import useWorkspace from "./use-workspace";
import type z from "@/lib/zod";
import { getReflectionsQuerySchemaExtended } from "../zod/schemas/reflection";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export interface PaginatedReflectionsResponse {
  reflections: Prisma.ReflectionGetPayload<{
    include: {
      analysisReport: true;
    };
  }>[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const partialQuerySchema = getReflectionsQuerySchemaExtended.partial();

export default function useReflections(
  opts: z.infer<typeof partialQuerySchema>,
  swrOpts: SWRConfiguration = {}
) {
  const searchParams = useSearchParams();
  const { id: workspaceId } = useWorkspace();

  const queryString = useMemo(() => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(opts)) {
      newUrlSearchParams.set(key, String(value));
    }

    return newUrlSearchParams.toString();
  }, [opts, searchParams]);

  const { data, error, isLoading, isValidating } =
    useSWR<PaginatedReflectionsResponse>(
      `/api/reflections?workspaceId=${workspaceId}${
        queryString.length > 0 ? `&${queryString}` : ""
      }`,
      fetcher,
      {
        dedupingInterval: 20000,
        revalidateOnFocus: false,
        keepPreviousData: true,
        ...swrOpts,
      }
    );

  return {
    reflections: data?.reflections || [],
    pagination: data?.pagination,
    error,
    isLoading,
    isValidating,
  };
}

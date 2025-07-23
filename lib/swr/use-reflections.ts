import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Prisma } from "@prisma/client";
import useWorkspace from "./use-workspace";

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

export interface UseReflectionsOptions extends SWRConfiguration {
  page?: number;
  limit?: number;
}

export default function useReflections(options: UseReflectionsOptions = {}) {
  const { id: workspaceId } = useWorkspace();
  const { page = 1, limit = 10, ...swrOpts } = options;

  const { data, error, isLoading, isValidating } =
    useSWR<PaginatedReflectionsResponse>(
      `/api/reflections?workspaceId=${workspaceId}&page=${page}&limit=${limit}`,
      fetcher,
      {
        dedupingInterval: 20000,
        revalidateOnFocus: false,
        keepPreviousData: true,
        ...swrOpts
      }
    );

  return {
    reflections: data?.reflections || [],
    pagination: data?.pagination,
    error,
    isLoading,
    isValidating
  };
}

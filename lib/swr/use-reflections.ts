import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Prisma } from "@prisma/client";
import useWorkspace from "./use-workspace";

export default function useReflections(swrOpts: SWRConfiguration = {}) {
  const { id: workspaceId } = useWorkspace();

  const {
    data: reflections,
    error,
    isLoading,
    isValidating
  } = useSWR<
    Prisma.ReflectionGetPayload<{
      include: {
        analysisReport: true;
      };
    }>[]
  >(`/api/reflections?workspaceId=${workspaceId}`, fetcher, {
    dedupingInterval: 20000,
    revalidateOnFocus: false,
    keepPreviousData: true,
    ...swrOpts
  });

  return {
    reflections,
    error,
    isLoading,
    isValidating
  };
}

import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

const partialQuerySchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  workspaceIdOrSlug: z.string(),
});

export default function usePopularReflections(
  opts: z.infer<typeof partialQuerySchema>,
  swrOpts: SWRConfiguration = {}
) {
  const {
    data: reflections,
    error,
    isLoading,
    isValidating,
  } = useSWR<
    Prisma.ReflectionGetPayload<{
      include: {
        analysisReport: true;
      };
    }>[]
  >(
    `/api/reflections/popular?limit=${opts.limit}&workspaceIdOrSlug=${opts.workspaceIdOrSlug}`,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
      ...swrOpts,
    }
  );

  return {
    reflections,
    error,
    isLoading,
    isValidating,
  };
}

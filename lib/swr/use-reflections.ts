import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Prisma } from "@prisma/client";

export default function useReflections(swrOpts: SWRConfiguration = {}) {
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
  >("/api/reflections", fetcher, {
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

import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Prisma, Reflection } from "@prisma/client";

export default function useReflection(
  reflectionId: Reflection["id"],
  swrOpts: SWRConfiguration = {}
) {
  const {
    data: reflection,
    error,
    isLoading,
    isValidating,
  } = useSWR<
    Prisma.ReflectionGetPayload<{
      include: {
        analysisReport: true;
      };
    }>
  >(`/api/reflections/${reflectionId}`, fetcher, {
    dedupingInterval: 20000,
    revalidateOnFocus: false,
    keepPreviousData: true,
    ...swrOpts,
  });

  return {
    reflection,
    error,
    isLoading,
    isValidating,
  };
}

import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Mood } from "@prisma/client";

export default function useMoods(swrOpts: SWRConfiguration = {}) {
  const {
    data: moods,
    error,
    isLoading,
    isValidating
  } = useSWR<Mood[]>("/api/moods", fetcher, {
    dedupingInterval: 20000,
    revalidateOnFocus: false,
    keepPreviousData: true,
    ...swrOpts
  });

  return {
    moods,
    error,
    isLoading,
    isValidating
  };
}

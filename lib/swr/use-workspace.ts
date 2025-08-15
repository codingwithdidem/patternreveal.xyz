import { useParams, useSearchParams } from "next/navigation";
import useSWR, { type SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { WorkspaceWithUsers } from "../types";
import { getNextPlan, PRO_PLAN } from "../constants";

export default function useWorkspace({
  swrOpts,
}: {
  swrOpts?: SWRConfiguration;
} = {}) {
  let { slug } = useParams() as { slug: string | null };
  const searchParams = useSearchParams();
  if (!slug) {
    slug = searchParams.get("slug") || searchParams.get("workspace");
  }

  const {
    data: workspace,
    error,
    mutate,
  } = useSWR<WorkspaceWithUsers>(slug && `/api/workspaces/${slug}`, fetcher, {
    dedupingInterval: 60000,
    ...swrOpts,
  });

  return {
    ...workspace,
    role: workspace?.users?.[0]?.role || "MEMBER",
    isOwner: workspace?.users?.[0]?.role === "OWNER",
    nextPlan: workspace?.plan ? getNextPlan(workspace.plan) : PRO_PLAN,
    mutate,
    loading: !!(slug && !workspace && !error),
    error,
    exceededReflections:
      workspace && workspace.reflectionsUsage >= workspace.reflectionsLimit,
    exceededAI: workspace && workspace.aiUsage >= workspace.aiLimit,
  };
}

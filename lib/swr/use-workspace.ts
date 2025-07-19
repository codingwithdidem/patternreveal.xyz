import { useParams, useSearchParams } from "next/navigation";
import useSWR, { type SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { WorkspaceWithUsers } from "../types";

export default function useWorkspace({
  swrOpts
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
    mutate
  } = useSWR<WorkspaceWithUsers>(slug && `/api/workspaces/${slug}`, fetcher, {
    dedupingInterval: 60000,
    ...swrOpts
  });

  return {
    ...workspace,
    role: workspace?.users?.[0]?.role || "MEMBER",
    isOwner: workspace?.users?.[0]?.role === "OWNER",
    // nextPlan: workspace?.plan ? getNextPlan(workspace.plan) : PRO_PLAN,
    mutate,
    // loading: slug && !workspace && !error ? true : false,
    error
    // exceededClicks: workspace && workspace.usage >= workspace.usageLimit,
    // exceededLinks: workspace && workspace.linksUsage >= workspace.linksLimit,
    // exceededAI: workspace && workspace.aiUsage >= workspace.aiLimit,
    // defaultFolderId: workspace?.users && workspace.users[0].defaultFolderId,
  };
}

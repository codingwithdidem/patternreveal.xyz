import { useParams, useSearchParams } from "next/navigation";
import useSWR, { type SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import type { Workspace } from "@prisma/client";

export default function useWorkspaces({
  swrOpts
}: {
  swrOpts?: SWRConfiguration;
} = {}) {
  const {
    data: workspaces,
    error,
    mutate
  } = useSWR<Workspace[]>("/api/workspaces", fetcher, {
    dedupingInterval: 60000,
    ...swrOpts
  });

  return {
    workspaces,
    error,
    loading: !workspaces && !error
    // nextPlan: workspace?.plan ? getNextPlan(workspace.plan) : PRO_PLAN,
    // role: (workspace?.users && workspace.users[0].role) || "member",
    // isOwner: workspace?.users && workspace.users[0].role === "owner",
    // exceededClicks: workspace && workspace.usage >= workspace.usageLimit,
    // exceededLinks: workspace && workspace.linksUsage >= workspace.linksLimit,
    // exceededAI: workspace && workspace.aiUsage >= workspace.aiLimit,
    // exceededDomains:
    //   workspace?.domains && workspace.domains.length >= workspace.domainsLimit,
    // error,
    // defaultFolderId: workspace?.users && workspace.users[0].defaultFolderId,
    // mutate,
    // loading: slug && !workspace && !error ? true : false
  };
}

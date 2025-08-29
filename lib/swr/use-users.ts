import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "./fetcher";
import type { UserPropsWithRole } from "../types";

interface UseUsersOptions {
  invitesOnly?: boolean;
}

export function useUsers(options: UseUsersOptions = {}) {
  const { invitesOnly = false } = options;
  const { slug } = useParams() as { slug: string };

  const {
    data: members = [],
    isLoading: membersLoading,
    error: membersError,
  } = useSWR<UserPropsWithRole[]>(
    !invitesOnly ? `/api/workspaces/${slug}/members` : null,
    fetcher
  );

  const {
    data: invites = [],
    isLoading: invitesLoading,
    error: invitesError,
  } = useSWR<UserPropsWithRole[]>(`/api/workspaces/${slug}/invites`, fetcher);

  const isLoading = invitesOnly
    ? invitesLoading
    : membersLoading || invitesLoading;
  const error = invitesOnly ? invitesError : membersError || invitesError;

  // Calculate stats
  const totalMembers = members.length;
  const pendingInvites = invites.length;
  const owners = members.filter((m) => m.role === "OWNER").length;
  const regularMembers = members.filter((m) => m.role === "MEMBER").length;

  return {
    members: invitesOnly ? [] : members,
    invites,
    isLoading,
    error,
    stats: {
      totalMembers: invitesOnly ? 0 : totalMembers,
      pendingInvites,
      owners: invitesOnly ? 0 : owners,
      regularMembers: invitesOnly ? 0 : regularMembers,
    },
  };
}

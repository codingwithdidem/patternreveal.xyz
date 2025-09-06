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

  // Ensure we always have safe arrays to work with
  const safeMembers = Array.isArray(members) ? members : [];
  const safeInvites = Array.isArray(invites) ? invites : [];

  // Calculate stats
  const totalMembers = safeMembers.length;
  const pendingInvites = safeInvites.length;
  const owners = safeMembers.filter((m) => m.role === "OWNER").length;
  const regularMembers = safeMembers.filter((m) => m.role === "MEMBER").length;

  return {
    members: invitesOnly ? [] : safeMembers,
    invites: safeInvites,
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

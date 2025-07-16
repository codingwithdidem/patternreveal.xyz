"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useInviteMemberModal } from "@/lib/stores/modal-store";
import InviteForm from "@/app/(dashboard)/(onboarding)/onboarding/(steps)/invite/form";
import useWorkspace from "@/lib/swr/use-workspace";
import useSWR from "swr";
import type { Invite } from "@/lib/zod/schemas/invites";
import { fetcher } from "@/lib/swr/fetcher";
import { Loader2 } from "lucide-react";

export function InviteMemberModal() {
  const { id: workspaceId, plan } = useWorkspace();

  const { show, setShow } = useInviteMemberModal();

  // we only need to fetch saved invites if the workspace is on the free plan
  // (or else we would've already sent the invites)
  const { data: invites, isLoading } = useSWR<Invite[]>(
    show &&
      workspaceId &&
      plan === "free" &&
      `/api/workspaces/${workspaceId}/invites/saved`,
    fetcher
  );

  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col justify-center items-center space-y-2">
          <DialogTitle>Invite Teammates</DialogTitle>
          <DialogDescription className="text-center">
            Invite your teammates to join your workspace. Invites are valid for
            7 days.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <InviteForm onSuccess={() => setShow(false)} invites={invites} />
        )}
      </DialogContent>
    </Dialog>
  );
}

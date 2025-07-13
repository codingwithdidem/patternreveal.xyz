"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import type { ReactNode } from "react";
import {
  useAddWorkspaceModal,
  useDeleteAccountModal,
  useDeleteWorkspaceModal,
  useAcceptInviteModal
} from "@/lib/stores/modal-store";
import useWorkspace from "@/lib/swr/use-workspace";

export function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <ModalProviderClient>{children}</ModalProviderClient>
    </Suspense>
  );
}

function ModalProviderClient({ children }: { children: ReactNode }) {
  const { id: workspaceId, error } = useWorkspace();
  const searchParams = useSearchParams();
  // Modal hooks
  const { AddWorkspaceModal } = useAddWorkspaceModal();
  const { DeleteAccountModal } = useDeleteAccountModal();
  const { DeleteWorkspaceModal } = useDeleteWorkspaceModal();
  const { AcceptInviteModal, setShow: setShowAcceptInviteModal } =
    useAcceptInviteModal();

  useEffect(() => {
    if ((error && error?.status === 409) || error?.status === 410) {
      setShowAcceptInviteModal(true);
    }
  }, [error, setShowAcceptInviteModal]);

  return (
    <>
      <AddWorkspaceModal />
      <DeleteAccountModal />
      <DeleteWorkspaceModal />
      <AcceptInviteModal />
      {children}
    </>
  );
}

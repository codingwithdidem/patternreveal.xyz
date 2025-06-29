"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { ReactNode } from "react";
import {
  useAddWorkspaceModal,
  useDeleteAccountModal
} from "@/lib/stores/modal-store";

export function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <ModalProviderClient>{children}</ModalProviderClient>
    </Suspense>
  );
}

function ModalProviderClient({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  // Modal hooks
  const { AddWorkspaceModal } = useAddWorkspaceModal();
  const { DeleteAccountModal } = useDeleteAccountModal();

  return (
    <>
      <AddWorkspaceModal />
      <DeleteAccountModal />
      {children}
    </>
  );
}

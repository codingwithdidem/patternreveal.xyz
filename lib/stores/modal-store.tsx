import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AddWorkspaceModal } from "@/components/modals/AddWorkspaceModal";
import { DeleteAccountModal } from "@/components/modals/DeleteAccountModal";
import { DeleteWorkspaceModal } from "@/components/modals/DeleteWorkspaceModal";
import { AcceptInviteModal } from "@/components/modals/AcceptInviteModal";
import { InviteMemberModal } from "@/components/modals/InviteMemberModal";
import { RemoveTeammateModal } from "@/components/modals/RemoveTeammateModal";
import { UpgradeToProModal } from "@/components/modals/UpgradeToProModal";
import { useCallback, useMemo } from "react";
import type { UserProps } from "../types";

interface ModalState {
  showAddWorkspaceModal: boolean;
  showDeleteAccountModal: boolean;
  showDeleteWorkspaceModal: boolean;
  showAcceptInviteModal: boolean;
  showInviteMemberModal: boolean;
  showRemoveTeammateModal: boolean;
  showUpgradeToProModal: boolean;
  // Actions
  setShowAddWorkspaceModal: (show: boolean) => void;
  setShowDeleteAccountModal: (show: boolean) => void;
  setShowDeleteWorkspaceModal: (show: boolean) => void;
  setShowAcceptInviteModal: (show: boolean) => void;
  setShowInviteMemberModal: (show: boolean) => void;
  setShowRemoveTeammateModal: (show: boolean) => void;
  setShowUpgradeToProModal: (show: boolean) => void;

  // Utility actions
  closeAllModals: () => void;
  openModal: (
    modalName: keyof Omit<
      ModalState,
      | "setShowAddWorkspaceModal"
      | "setShowDeleteAccountModal"
      | "setShowDeleteWorkspaceModal"
      | "setShowAddEditDomainModal"
      | "setShowLinkBuilder"
      | "setShowAddEditTagModal"
      | "setShowImportBitlyModal"
      | "setShowImportShortModal"
      | "setShowImportRebrandlyModal"
      | "setShowImportCsvModal"
      | "setShowImportRewardfulModal"
      | "setShowAcceptInviteModal"
      | "setShowInviteMemberModal"
      | "setShowRemoveTeammateModal"
      | "setShowUpgradeToProModal"
      | "setShowWelcomeModal"
      | "setShowUpgradedModal"
      | "setShowProgramWelcomeModal"
      | "setShowAcceptInviteModal"
      | "closeAllModals"
      | "openModal"
    >
  ) => void;
}

export const useModalStore = create<ModalState>()(
  devtools(
    (set, get) => ({
      // Initial state
      showAddWorkspaceModal: false,
      showDeleteAccountModal: false,
      showDeleteWorkspaceModal: false,
      showAcceptInviteModal: false,
      showInviteMemberModal: false,
      showRemoveTeammateModal: false,
      showUpgradeToProModal: false,
      // Individual setters
      setShowAddWorkspaceModal: (show) => set({ showAddWorkspaceModal: show }),
      setShowDeleteAccountModal: (show) =>
        set({ showDeleteAccountModal: show }),
      setShowDeleteWorkspaceModal: (show) =>
        set({ showDeleteWorkspaceModal: show }),
      setShowAcceptInviteModal: (show) => set({ showAcceptInviteModal: show }),
      setShowInviteMemberModal: (show) => set({ showInviteMemberModal: show }),
      setShowRemoveTeammateModal: (show) =>
        set({
          showRemoveTeammateModal: show,
        }),
      setShowUpgradeToProModal: (show) => set({ showUpgradeToProModal: show }),

      // Utility actions
      closeAllModals: () =>
        set({
          showAddWorkspaceModal: false,
          showDeleteAccountModal: false,
          showDeleteWorkspaceModal: false,
          showAcceptInviteModal: false,
          showInviteMemberModal: false,
          showRemoveTeammateModal: false,
          showUpgradeToProModal: false,
        }),

      openModal: (modalName) => {
        const setterName = `setShow${
          modalName.charAt(0).toUpperCase() + modalName.slice(1)
        }` as keyof ModalState;
        const setter = get()[setterName] as (show: boolean) => void;
        if (setter) {
          setter(true);
        }
      },
    }),
    {
      name: "modal-store",
    }
  )
);

// Selector hooks for better performance
export const useAddWorkspaceModal = () => {
  const show = useModalStore((state) => state.showAddWorkspaceModal);
  const setShow = useModalStore((state) => state.setShowAddWorkspaceModal);

  return useMemo(
    () => ({
      show,
      setShow,
      AddWorkspaceModal,
    }),
    [show, setShow]
  );
};

export const useDeleteAccountModal = () => {
  const show = useModalStore((state) => state.showDeleteAccountModal);
  const setShow = useModalStore((state) => state.setShowDeleteAccountModal);

  return useMemo(
    () => ({
      show,
      setShow,
      DeleteAccountModal,
    }),
    [show, setShow]
  );
};

export const useDeleteWorkspaceModal = () => {
  const show = useModalStore((state) => state.showDeleteWorkspaceModal);
  const setShow = useModalStore((state) => state.setShowDeleteWorkspaceModal);

  return useMemo(
    () => ({
      show,
      setShow,
      DeleteWorkspaceModal,
    }),
    [show, setShow]
  );
};

export const useAcceptInviteModal = () => {
  const show = useModalStore((state) => state.showAcceptInviteModal);
  const setShow = useModalStore((state) => state.setShowAcceptInviteModal);

  return useMemo(
    () => ({
      show,
      setShow,
      AcceptInviteModal,
    }),
    [show, setShow]
  );
};

export const useInviteMemberModal = () => {
  const show = useModalStore((state) => state.showInviteMemberModal);
  const setShow = useModalStore((state) => state.setShowInviteMemberModal);

  return useMemo(
    () => ({
      show,
      setShow,
      InviteMemberModal,
    }),
    [show, setShow]
  );
};

export const useRemoveTeammateModal = ({
  user,
  invite,
}: {
  user: UserProps;
  invite?: boolean;
}) => {
  const show = useModalStore((state) => state.showRemoveTeammateModal);
  const setShow = useModalStore((state) => state.setShowRemoveTeammateModal);

  const RemoveTeammateModalCallback = useCallback(() => {
    return <RemoveTeammateModal user={user} invite={invite} />;
  }, [user, invite]);

  return useMemo(
    () => ({
      show,
      setShow,
      RemoveTeammateModal: RemoveTeammateModalCallback,
    }),
    [show, setShow, RemoveTeammateModalCallback]
  );
};

export const useUpgradeToProModal = () => {
  const show = useModalStore((state) => state.showUpgradeToProModal);
  const setShow = useModalStore((state) => state.setShowUpgradeToProModal);

  return useMemo(
    () => ({
      show,
      setShow,
      UpgradeToProModal,
    }),
    [show, setShow]
  );
};

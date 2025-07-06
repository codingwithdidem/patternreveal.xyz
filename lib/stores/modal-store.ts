import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AddWorkspaceModal } from "@/components/modals/AddWorkspaceModal";
import { DeleteAccountModal } from "@/components/modals/DeleteAccountModal";
import { DeleteWorkspaceModal } from "@/components/modals/DeleteWorkspaceModal";
import { useMemo } from "react";

interface ModalState {
  showAddWorkspaceModal: boolean;
  showDeleteAccountModal: boolean;
  showDeleteWorkspaceModal: boolean;
  // Actions
  setShowAddWorkspaceModal: (show: boolean) => void;
  setShowDeleteAccountModal: (show: boolean) => void;
  setShowDeleteWorkspaceModal: (show: boolean) => void;
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
      | "setShowWelcomeModal"
      | "setShowUpgradedModal"
      | "setShowProgramWelcomeModal"
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
      // Individual setters
      setShowAddWorkspaceModal: (show) => set({ showAddWorkspaceModal: show }),
      setShowDeleteAccountModal: (show) =>
        set({ showDeleteAccountModal: show }),
      setShowDeleteWorkspaceModal: (show) =>
        set({ showDeleteWorkspaceModal: show }),
      // Utility actions
      closeAllModals: () =>
        set({
          showAddWorkspaceModal: false,
          showDeleteAccountModal: false,
          showDeleteWorkspaceModal: false
        }),

      openModal: (modalName) => {
        const setterName =
          `setShow${modalName.charAt(0).toUpperCase() + modalName.slice(1)}` as keyof ModalState;
        const setter = get()[setterName] as (show: boolean) => void;
        if (setter) {
          setter(true);
        }
      }
    }),
    {
      name: "modal-store"
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
      AddWorkspaceModal
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
      DeleteAccountModal
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
      DeleteWorkspaceModal
    }),
    [show, setShow]
  );
};

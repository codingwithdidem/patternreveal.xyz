import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AddWorkspaceModal } from "@/components/modals/AddWorkspaceModal";
import { useMemo } from "react";

interface ModalState {
  showAddWorkspaceModal: boolean;
  // Actions
  setShowAddWorkspaceModal: (show: boolean) => void;
  // Utility actions
  closeAllModals: () => void;
  openModal: (
    modalName: keyof Omit<
      ModalState,
      | "setShowAddWorkspaceModal"
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
      // Individual setters
      setShowAddWorkspaceModal: (show) => set({ showAddWorkspaceModal: show }),
      // Utility actions
      closeAllModals: () =>
        set({
          showAddWorkspaceModal: false
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

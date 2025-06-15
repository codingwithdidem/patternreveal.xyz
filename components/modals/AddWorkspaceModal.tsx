"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CreateWorkspaceForm from "../workspaces/create-workspace-form";
import { useAddWorkspaceModal } from "@/lib/stores/modal-store";

export function AddWorkspaceModal() {
  const { show, setShow } = useAddWorkspaceModal();

  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <CreateWorkspaceForm
          onSuccess={() => {
            setShow(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { useDeleteWorkspaceModal } from "@/lib/stores/modal-store";
import { Button } from "@/components/ui/button";

export default function DeleteWorkspace() {
  const { setShow } = useDeleteWorkspaceModal();

  return (
    <div className="border border-neutral-200 rounded-lg bg-white p-6">
      <h2 className="font-semibold text-lg text-destructive mb-1">
        Delete Workspace
      </h2>
      <p className="text-muted-foreground mb-4">
        Permanently delete your workspace
      </p>
      <div className="-mx-6 border-t border-neutral-200 my-6" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          This action cannot be undone.
        </span>
        <Button variant="destructive" onClick={() => setShow(true)}>
          Delete Workspace
        </Button>
      </div>
    </div>
  );
}

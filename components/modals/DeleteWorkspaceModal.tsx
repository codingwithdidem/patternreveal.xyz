"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeleteWorkspaceModal } from "@/lib/stores/modal-store";
import useWorkspace from "@/lib/swr/use-workspace";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

export function DeleteWorkspaceModal() {
  const { update } = useSession();
  const { show, setShow } = useDeleteWorkspaceModal();
  const workspace = useWorkspace();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const deleteWorkspace = async () => {
    if (confirmationText !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm workspace deletion");
      return;
    }

    if (!workspace) {
      toast.error("No workspace selected");
      return;
    }

    setIsDeleting(true);

    const response = await fetch(`/api/workspaces/${workspace.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    setIsDeleting(false);
    if (response.status === 200) {
      setShow(false);
      Promise.all([mutate("/api/workspaces"), update()]);
      toast.success("Workspace deleted successfully");
      router.push("/");
    } else {
      const { error } = await response.json();
      console.log({ error });
      throw new Error(error.message);
    }
  };

  const handleClose = () => {
    setConfirmationText("");
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-1 items-center justify-center">
          <DialogTitle className="text-destructive">
            Delete Workspace
          </DialogTitle>
          <DialogDescription className="text-center">
            This will permanently delete the workspace &quot;{workspace?.name}
            &quot; and all its reflections. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Type &quot;DELETE&quot; to confirm
            </Label>
            <Input
              id="confirmation"
              placeholder="DELETE"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="rounded-2xl"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              toast.promise(deleteWorkspace(), {
                loading: "Deleting workspace...",
                success: "Workspace deleted",
                error: (err) => err.message
              });
            }}
            disabled={isDeleting || confirmationText !== "DELETE"}
          >
            {isDeleting ? "Deleting..." : "Delete Workspace"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

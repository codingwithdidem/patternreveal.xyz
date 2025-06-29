"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
import { useDeleteAccountModal } from "@/lib/stores/modal-store";
import UserAvatar from "../UserAvatar";

export function DeleteAccountModal() {
  const { show, setShow } = useDeleteAccountModal();
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const deleteAccount = async () => {
    if (confirmationText !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm account deletion");
      return;
    }

    setIsDeleting(true);

    const response = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    setIsDeleting(false);
    if (response.status === 200) {
      setShow(false);
      await signOut({ callbackUrl: "/" });
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
          <UserAvatar user={session?.user} />
          <DialogTitle className="text-destructive">Delete Account</DialogTitle>
          <DialogDescription className="text-center">
            This will permanently delete your account, all your workspaces, and
            all your reflections. This action cannot be undone.
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
              toast.promise(deleteAccount(), {
                loading: "Deleting account...",
                success: "Account deleted",
                error: (err) => err.message
              });
            }}
            disabled={isDeleting || confirmationText !== "DELETE"}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
import { useRemoveTeammateModal } from "@/lib/stores/modal-store";
import UserAvatar from "../UserAvatar";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { UserMinus, LogOut } from "lucide-react";
import type { UserProps } from "@/lib/types";

type RemoveTeammateModalProps = {
  user: UserProps;
  invite?: boolean;
};

export function RemoveTeammateModal({
  user,
  invite
}: RemoveTeammateModalProps) {
  const { slug } = useParams() as { slug: string };
  const { show, setShow } = useRemoveTeammateModal({ user, invite });
  const { data: session } = useSession();

  const [isRemoving, setIsRemoving] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const isCurrentUser = session?.user?.id === user.id;
  const requiredConfirmation = isCurrentUser ? "LEAVE" : "REMOVE";

  const removeMember = async () => {
    if (confirmationText !== requiredConfirmation) {
      toast.error(`Please type '${requiredConfirmation}' to confirm`);
      return;
    }

    setIsRemoving(true);

    try {
      let response: Response;

      if (invite) {
        // Remove pending invite
        response = await fetch(`/api/workspaces/${slug}/invites`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: user.email })
        });
      } else {
        // Remove existing member
        response = await fetch(`/api/workspaces/${slug}/members`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user.id })
        });
      }

      if (response.ok) {
        setShow(false);
        // Refresh relevant data
        await Promise.all([
          mutate(`/api/workspaces/${slug}/members`),
          mutate(`/api/workspaces/${slug}/invites`),
          mutate("/api/workspaces")
        ]);

        if (isCurrentUser) {
          toast.success("Successfully left the workspace");
          // If user left workspace, redirect to dashboard
          window.location.href = "/";
        } else {
          toast.success(
            invite
              ? "Invitation removed successfully"
              : "Member removed successfully"
          );
        }
      } else {
        const { error } = await response.json();
        throw new Error(error?.message || "Failed to remove member");
      }
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to remove member"
      );
    } finally {
      setIsRemoving(false);
    }
  };

  const handleClose = () => {
    console.log("handleClose");
    setConfirmationText("");
    setShow(false);
  };

  console.log("show", {
    show
  });

  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-3 items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
            {isCurrentUser ? (
              <LogOut className="w-6 h-6 text-red-600" />
            ) : (
              <UserMinus className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div className="text-center space-y-2">
            <DialogTitle className="text-destructive">
              {isCurrentUser
                ? "Leave Workspace"
                : invite
                  ? "Remove Invitation"
                  : "Remove Member"}
            </DialogTitle>
            <div className="flex items-center gap-2 justify-center">
              <UserAvatar user={user} />
              <span className="font-medium">{user.name || user.email}</span>
            </div>
          </div>
          <DialogDescription className="text-center">
            {isCurrentUser
              ? "Are you sure you want to leave this workspace? You'll lose access to all reflections and data in this workspace."
              : invite
                ? "Are you sure you want to remove this invitation? The person will not be able to join the workspace using this invitation."
                : "Are you sure you want to remove this member from the workspace? They'll lose access to all reflections and data in this workspace."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Type &quot;{requiredConfirmation}&quot; to confirm
            </Label>
            <Input
              id="confirmation"
              placeholder={requiredConfirmation}
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="rounded-2xl"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isRemoving}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              toast.promise(removeMember(), {
                loading: isCurrentUser
                  ? "Leaving workspace..."
                  : invite
                    ? "Removing invitation..."
                    : "Removing member...",
                success: isCurrentUser
                  ? "Left workspace"
                  : invite
                    ? "Invitation removed"
                    : "Member removed",
                error: (err) => err.message
              });
            }}
            disabled={isRemoving || confirmationText !== requiredConfirmation}
          >
            {isRemoving
              ? isCurrentUser
                ? "Leaving..."
                : "Removing..."
              : isCurrentUser
                ? "Leave Workspace"
                : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

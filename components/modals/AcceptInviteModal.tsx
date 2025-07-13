"use client";

import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useAcceptInviteModal } from "@/lib/stores/modal-store";
import { useSession } from "next-auth/react";
import useWorkspace from "@/lib/swr/use-workspace";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { toast } from "sonner";
import { mutatePrefix } from "@/lib/swr/mutate";

export function AcceptInviteModal() {
  const router = useRouter();
  const { show, setShow } = useAcceptInviteModal();

  const { slug } = useParams() as { slug: string };
  const { data: session } = useSession();

  const { error } = useWorkspace();

  const [accepting, setAccepting] = useState(false);

  if (!show) {
    return null;
  }

  const isWorkspaceInvitePending = error.status === 409;

  return (
    <Dialog open={show} onOpenChange={setShow} preventDefaultClose>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isWorkspaceInvitePending
              ? "Workspace Invite"
              : "Workspace Invitation Expired"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {isWorkspaceInvitePending ? (
            <p>
              You&apos;ve been invited to join and collaborate on{" "}
              <span className="font-bold">{slug}</span>
              workspace.
            </p>
          ) : (
            <p>
              This workspace invitation has expired or has been revoked. Please
              <Link
                href={`mailto:${session?.user?.email}`}
                className="text-blue-500"
              >
                contact the workspace owner
              </Link>{" "}
              to get a new invitation.
            </p>
          )}
        </DialogDescription>

        {isWorkspaceInvitePending ? (
          <Button
            onClick={() => {
              setAccepting(true);
              fetch(`/api/workspaces/${slug}/invites/accept`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
              }).then(async () => {
                if (session?.user) {
                  posthog.identify(session.user.id, {
                    email: session.user.email,
                    name: session.user.name
                  });
                }
                posthog.capture("accepted_workspace_invite", {
                  workspace: slug
                });
                await mutatePrefix("/api/workspaces");
                router.replace(`/${slug}/links`);
                setShow(false);
                toast.success("You now are a part of this workspace!");
              });
            }}
          >
            Accept Invite
          </Button>
        ) : (
          <Button
            onClick={() => {
              router.push("/");
              setShow(false);
            }}
          >
            Back to dashboard
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

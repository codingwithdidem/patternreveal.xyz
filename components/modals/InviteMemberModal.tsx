"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useInviteMemberModal } from "@/lib/stores/modal-store";
import { mutate } from "swr";
import { toast } from "sonner";

export function InviteMemberModal() {
  const { slug } = useParams() as { slug: string };
  const { show, setShow } = useInviteMemberModal();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"OWNER" | "MEMBER">("MEMBER");
  const [isInviting, setIsInviting] = useState(false);

  // Handle invite member
  const handleInviteMember = async () => {
    if (!inviteEmail.trim()) return;

    setIsInviting(true);
    try {
      const response = await fetch(`/api/workspaces/${slug}/invites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teammates: [{ email: inviteEmail, role: inviteRole }]
        })
      });

      if (response.ok) {
        toast.success("Invitation sent successfully!");
        setInviteEmail("");
        setInviteRole("MEMBER");
        setShow(false);
        mutate(`/api/workspaces/${slug}/invites`);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to send invitation");
      }
    } catch (error) {
      toast.error("Failed to send invitation");
    } finally {
      setIsInviting(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to collaborate on relationship analysis and
            reflections.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={inviteRole}
              onValueChange={(value: "OWNER" | "MEMBER") =>
                setInviteRole(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Member - Can view and collaborate
                  </div>
                </SelectItem>
                <SelectItem value="OWNER">
                  <div className="flex items-center">
                    <Crown className="w-4 h-4 mr-2" />
                    Owner - Full access and management
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleInviteMember}
              disabled={!inviteEmail.trim() || isInviting}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isInviting ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

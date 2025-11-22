import {
  Crown,
  User,
  Mail,
  Calendar,
  Clock,
  MoreHorizontal,
  Shield,
  UserMinus,
  Copy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/UserAvatar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import useWorkspace from "@/lib/swr/use-workspace";
import { useRemoveTeammateModal } from "@/lib/stores/modal-store";
import type { UserPropsWithRole } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";

interface UserCardProps {
  type: "member" | "invite";
  user: UserPropsWithRole;
  className?: string;
}

export default function UserCard({
  type,
  user,
  className = "",
}: UserCardProps) {
  const { data: session } = useSession();
  const { slug: workspaceSlug } = useParams() as { slug: string };
  const { isOwner } = useWorkspace();
  const { setShow: setShowRemoveTeammateModal, RemoveTeammateModal } =
    useRemoveTeammateModal({
      user,
      invite: type === "invite",
    });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCopyInviteLink = () => {
    if (workspaceSlug) {
      navigator.clipboard.writeText(
        `Join my PatternReveal workspace: ${window.location.origin}/app/${workspaceSlug}`
      );
      toast.success("Invite link copied to clipboard!");
    }
  };

  const handleRemoveTeammate = () => {
    setDropdownOpen(false); // Close dropdown first
    setShowRemoveTeammateModal(true);
  };

  const handleCancelInvite = () => {
    setDropdownOpen(false); // Close dropdown first
    setShowRemoveTeammateModal(true);
  };

  return (
    <>
      <RemoveTeammateModal />
      {type === "member" ? (
        <div
          className={`flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors ${className}`}
        >
          <div className="flex items-center space-x-4">
            <UserAvatar user={user} className="w-10 h-10" />
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900">
                  {user.name || "Unknown"}
                </p>
                <Badge
                  variant={user.role === "OWNER" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user.role === "OWNER" ? (
                    <>
                      <Crown className="w-3 h-3 mr-1" />
                      Owner
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 mr-1" />
                      Member
                    </>
                  )}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                Joined {format(new Date(user.createdAt), "MMM d, yyyy")}
              </p>
            </div>
          </div>

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwner && session?.user.id !== user.id && (
                <DropdownMenuItem onClick={() => {}}>
                  <Shield className="w-4 h-4 mr-2" />
                  {session?.user.id === user.id ? "Make Member" : "Make Owner"}
                </DropdownMenuItem>
              )}
              {(isOwner || session?.user.id === user.id) && (
                <DropdownMenuItem
                  onClick={handleRemoveTeammate}
                  className="text-red-600"
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  {session?.user.id === user.id
                    ? "Leave Workspace"
                    : "Remove Teammate"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div
          className={`flex items-center justify-between p-4 rounded-lg border bg-orange-50 border-orange-200 ${className}`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900">{user.email}</p>
                <Badge
                  variant="outline"
                  className="text-xs border-orange-300 text-orange-700"
                >
                  <Crown className="w-3 h-3 mr-1" />
                  Owner
                </Badge>
              </div>
              <p className="text-xs text-gray-600 flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                Invited {format(new Date(user.createdAt), "MMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleCopyInviteLink}>
              <Copy className="w-4 h-4 mr-1" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelInvite}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

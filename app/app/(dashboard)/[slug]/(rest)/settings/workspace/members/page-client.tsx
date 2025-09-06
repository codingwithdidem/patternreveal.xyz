"use client";

import { useParams } from "next/navigation";
import {
  Plus,
  Crown,
  User,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInviteMemberModal } from "@/lib/stores/modal-store";
import NumberFlow from "@number-flow/react";
import UserPlaceholder from "@/components/members/UserPlaceholder";
import UserCard from "@/components/members/user-card";
import { useUsers } from "@/lib/swr/use-users";

export default function MembersPageClient() {
  const { setShow: setShowInviteMemberModal } = useInviteMemberModal();
  const { members, invites, isLoading, stats } = useUsers();

  const { totalMembers, pendingInvites, owners, regularMembers } = stats;
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 font-[family-name:var(--font-satoshi)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Workspace Members
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your team and collaboration settings
          </p>
        </div>
        <Button onClick={() => setShowInviteMemberModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Members
                </p>
                <NumberFlow
                  value={totalMembers}
                  className="tabular-nums text-neutral-700 text-2xl font-bold"
                  format={{
                    maximumFractionDigits: 0
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Owners</p>
                <NumberFlow
                  value={owners}
                  className="tabular-nums text-neutral-700 text-2xl font-bold"
                  format={{
                    maximumFractionDigits: 0
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Members
                </p>
                <NumberFlow
                  value={regularMembers}
                  className="tabular-nums text-neutral-700 text-2xl font-bold"
                  format={{
                    maximumFractionDigits: 0
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Invites
                </p>
                <NumberFlow
                  value={pendingInvites}
                  className="tabular-nums text-neutral-700 text-2xl font-bold"
                  format={{
                    maximumFractionDigits: 0
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Active Members ({totalMembers})</span>
          </TabsTrigger>
          <TabsTrigger value="invites" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Pending Invites ({pendingInvites})</span>
          </TabsTrigger>
        </TabsList>

        {/* Active Members Tab */}
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                People who have access to this workspace and can collaborate on
                reflections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <UserPlaceholder key={`member-skeleton-${i + 1}`} />
                  ))}
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No members yet
                  </h3>
                  <p className="text-gray-600">
                    Start by inviting team members to collaborate.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {members.map((member) => (
                    <UserCard key={member.id} type="member" user={member} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Invites Tab */}
        <TabsContent value="invites">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Invitations that have been sent but not yet accepted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <UserPlaceholder key={`invite-skeleton-${i + 1}`} />
                  ))}
                </div>
              ) : invites.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No pending invitations
                  </h3>
                  <p className="text-gray-600">
                    All invitations have been accepted or there are none to
                    show.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {invites.map((invite) => (
                    <UserCard key={invite.email} type="invite" user={invite} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Collaboration & Privacy
              </h3>
              <p className="text-gray-700 mt-1">
                This workspace is designed for trusted collaboration on
                relationship analysis. Members can view reflections, contribute
                insights, and help identify patterns that support emotional
                well-being and healthier relationship dynamics.
              </p>
              <div className="flex items-center mt-3 text-sm text-blue-700">
                <AlertCircle className="w-4 h-4 mr-2" />
                Only invite people you trust with sensitive relationship
                insights
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

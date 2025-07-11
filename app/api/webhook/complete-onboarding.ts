import { inviteUser } from "@/lib/api/users";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/upstash/redis";
import type { Invite } from "@/lib/zod/schemas/invites";
import type { User } from "@prisma/client";
import type { WorkspaceWithUsers } from "@/lib/types";

export const completeOnboarding = async (
  users: Pick<User, "id" | "name" | "email">[],
  workspaceId: string
) => {
  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId
    },
    include: {
      users: {
        include: {
          user: true
        }
      }
    }
  });

  if (!workspace) {
    console.error(`Workspace ${workspaceId} not found`);
    return;
  }

  await Promise.allSettled([
    // Update the onboarding step to complete
    ...users.map(({ id }) => redis.set(`onboarding-step:${id}`, "complete")),
    // Send invites (Saved in previous step)
    async () => {
      const invites = await redis.get<Invite[]>(`invites:${workspaceId}`);
      if (!invites?.length || !workspace) return;

      await Promise.allSettled(
        invites.map(({ email, role }) => {
          inviteUser({
            email,
            role,
            workspace: workspace as WorkspaceWithUsers
          });
        })
      );
    }
  ]);
};

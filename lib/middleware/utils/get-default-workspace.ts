"use server";

import type { UserProps } from "@/lib/types";

export async function getDefaultWorkspace(user: UserProps) {
  let defaultWorkspace = user.defaultWorkspace;

  if (!defaultWorkspace) {
    // Dynamic import to avoid including prisma in the main bundle
    const { prismaEdge } = await import("@/lib/prisma-edge");

    const userWithDefaultWorkspace = await prismaEdge.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        defaultWorkspace: true,
        workspaces: {
          select: {
            workspace: {
              select: {
                slug: true
              }
            }
          },
          take: 1
        }
      }
    });

    defaultWorkspace =
      userWithDefaultWorkspace?.defaultWorkspace ||
      userWithDefaultWorkspace?.workspaces?.[0]?.workspace.slug ||
      undefined;
  }

  return defaultWorkspace;
}

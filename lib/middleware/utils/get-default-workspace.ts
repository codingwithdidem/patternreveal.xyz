"use server";

// import { prismaEdge } from "@/lib/prisma-edge";
import type { UserProps } from "@/lib/types";

export async function getDefaultWorkspace(user: UserProps) {
  let defaultWorkspace = user.defaultWorkspace;

  if (!defaultWorkspace) {
    // REST call approach to avoid heavy PrismaClient in middleware
    try {
      const baseUrl =
        process.env.NEXTAUTH_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/user/default-workspace`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": user.id
        }
      });

      if (response.ok) {
        const data = await response.json();
        defaultWorkspace = data.defaultWorkspace;
      }
    } catch (error) {
      console.error("Failed to fetch default workspace:", error);
      // Fallback to existing defaultWorkspace from user object
    }

    // COMMENTED OUT: Original PrismaClient approach (causes middleware size issues)
    /*
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
    */
  }

  return defaultWorkspace;
}

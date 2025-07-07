import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import type { UserProps } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    // Get user ID from header (sent by middleware)
    const userIdFromHeader = request.headers.get("X-User-ID");

    // Also get session token to verify
    const token = (await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })) as { user?: UserProps } | null;

    if (!token?.user || !userIdFromHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the user ID matches the token
    if (token.user.id !== userIdFromHeader) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get user's default workspace and first workspace if no default
    const userWithWorkspace = await prisma.user.findUnique({
      where: {
        id: userIdFromHeader
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

    const defaultWorkspace =
      userWithWorkspace?.defaultWorkspace ||
      userWithWorkspace?.workspaces?.[0]?.workspace.slug ||
      null;

    return NextResponse.json({ defaultWorkspace });
  } catch (error) {
    console.error("Error fetching default workspace:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

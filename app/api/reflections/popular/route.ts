import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Get all reflection entries. Requires the `reflection.read` permission.
 */
export const GET = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const { limit, workspaceIdOrSlug } = searchParams;

    const workspace = await prisma.workspace.findUnique({
      where: {
        slug: workspaceIdOrSlug,
      },
    });

    const response = await prisma.reflection.findMany({
      where: {
        userId: session.user.id,
        workspaceId: workspace?.id,
      },
      orderBy: {
        createdAt: "desc", // Sort by createdAt in descending order (newest first)
      },
      take: Number(limit) || 10,
    });

    console.log("response", response);

    return NextResponse.json(response, {
      headers,
    });
  }
);

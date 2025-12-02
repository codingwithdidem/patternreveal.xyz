import { withWorkspace } from "@/lib/auth/withWorkspace";
import prisma from "@/lib/prisma";
import { PatternRevealApiError } from "@/lib/api/errors";
import { NextResponse } from "next/server";

// GET - Fetch chat history for a reflection
export const GET = withWorkspace(
  async ({ params, workspace }) => {
    const { reflectionId } = params;

    // Verify the reflection belongs to this workspace
    const reflection = await prisma.reflection.findFirst({
      where: {
        id: reflectionId,
        workspaceId: workspace.id,
      },
    });

    if (!reflection) {
      throw new PatternRevealApiError({
        code: "not_found",
        message: "Reflection not found",
      });
    }

    const messages = await prisma.chatMessage.findMany({
      where: {
        reflectionId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    });

    return NextResponse.json(messages);
  },
  {
    requiredPlan: ["pro"],
  }
);

// POST - Save new chat messages for a reflection
export const POST = withWorkspace(
  async ({ req, params, workspace }) => {
    const { reflectionId } = params;
    const { messages } = await req.json();

    // Verify the reflection belongs to this workspace
    const reflection = await prisma.reflection.findFirst({
      where: {
        id: reflectionId,
        workspaceId: workspace.id,
      },
    });

    if (!reflection) {
      throw new PatternRevealApiError({
        code: "not_found",
        message: "Reflection not found",
      });
    }

    // Get existing message IDs to avoid duplicates
    const existingMessages = await prisma.chatMessage.findMany({
      where: {
        reflectionId,
      },
      select: {
        id: true,
      },
    });

    const existingIds = new Set(existingMessages.map((m) => m.id));

    // Filter out messages that already exist and system messages
    const newMessages = messages.filter(
      (m: { id: string; role: string }) =>
        !existingIds.has(m.id) &&
        !["reflection", "reflection-content"].includes(m.id)
    );

    if (newMessages.length > 0) {
      await prisma.chatMessage.createMany({
        data: newMessages.map(
          (m: { id: string; role: string; content: string }) => ({
            id: m.id,
            reflectionId,
            role: m.role,
            content: m.content,
          })
        ),
      });
    }

    return NextResponse.json({ success: true });
  },
  {
    requiredPlan: ["pro"],
  }
);

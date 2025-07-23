import { PatternRevealApiError } from "@/lib/api/errors";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { subscribe } from "@/lib/resend/subscribe";
import { unsubscribe } from "@/lib/resend/unsubscribe";
import { NextResponse } from "next/server";

export const GET = withPermissions(async ({ session }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      subscribed: true,
    },
  });

  if (!user) {
    throw new PatternRevealApiError({
      code: "not_found",
      message: "User not found",
    });
  }

  return NextResponse.json(user);
});

export const POST = withPermissions(async ({ session }) => {
  const [user, _] = await Promise.all([
    prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscribed: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subscribed: true,
      },
    }),
    subscribe({
      email: session.user.email,
      name: session.user.name,
    }),
  ]);

  return NextResponse.json(user);
});

export const DELETE = withPermissions(async ({ session }) => {
  const [user, _] = await Promise.all([
    prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscribed: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subscribed: true,
      },
    }),
    unsubscribe({
      email: session.user.email,
    }),
  ]);

  return NextResponse.json(user);
});

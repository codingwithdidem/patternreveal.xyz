import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { redis } from "@/lib/upstash/redis";
import { inviteTeammatesSchema, type Invite } from "@/lib/zod/schemas/invites";
import { NextResponse } from "next/server";

// GET /api/workspaces/:idOrSlug/invites/saved - Get saved invites for a workspace
export const GET = withWorkspace(
  async ({ workspace }) => {
    const invites = (
      (await redis.get<Invite[]>(`invites:${workspace.id}`)) || []
    ).reverse();

    return NextResponse.json(invites);
  },
  {
    requiredPermissions: ["workspaces.read"],
  }
);

// POST /api/workspaces/:idOrSlug/invites/saved - Save invites for a workspace
export const POST = withWorkspace(
  async ({ req, workspace }) => {
    const { teammates } = await inviteTeammatesSchema.parseAsync(
      await parseRequestBody(req)
    );

    if (teammates.length > 4) {
      throw new PatternRevealApiError({
        message: "You can only save up to 4 invites at a time",
        code: "bad_request",
      });
    }

    await redis.set(`invites:${workspace.id}`, teammates, {
      ex: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ message: "Invite(s) saved" });
  },
  {
    requiredPermissions: ["workspaces.write"],
  }
);

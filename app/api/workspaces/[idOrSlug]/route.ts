import { withWorkspace } from "@/lib/auth/withWorkspace";
import { WorkspaceSchema } from "@/lib/zod/schemas/workspace";
import { NextResponse } from "next/server";

export const GET = withWorkspace(
  async ({ workspace, headers }) => {
    return NextResponse.json(
      {
        ...WorkspaceSchema.parse({
          ...workspace
        })
      },
      { headers }
    );
  },
  {
    requiredPermissions: ["mood.read"]
  }
);

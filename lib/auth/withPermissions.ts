import type { PermissionAction } from "@/lib/rbac/permissions";
import { getSession } from "./authOptions";
import type { UserProps } from "../types";
import {
  handleAndReturnErrorResponse,
  PatternRevealApiError,
} from "../api/errors";
import { type AxiomRequest, withAxiom } from "next-axiom";
import { NextRequest } from "next/server";

type WithPermissionsHandler = (args: {
  req: Request;
  params: Record<string, string>;
  searchParams: Record<string, string>;
  headers?: Record<string, string>;
  session: {
    user: UserProps;
  };
  permissions: PermissionAction[];
}) => Promise<Response>;

interface WithPermissionsOptions {
  requiredPermissions: PermissionAction[];
  skipPermissionChecks?: boolean;
}

export const withPermissions = (
  handler: WithPermissionsHandler,
  options: WithPermissionsOptions = { requiredPermissions: [] },
) => {
  return async (
    req: NextRequest,
    { params }: { params: Promise<Record<string, string>> },
  ) => {
    try {
      const headers = {};
      const permissions: PermissionAction[] = [];
      const searchParams = Object.fromEntries(new URL(req.url).searchParams);
      const session = await getSession();
      const awaitedParams = await params;

      if (!session?.user?.id) {
        throw new PatternRevealApiError({
          code: "unauthorized",
          message: "You need to be logged in to access this resource.",
        });
      }

      return await handler({
        req,
        params: awaitedParams,
        searchParams,
        headers,
        session,
        permissions,
      });
    } catch (error) {
      // req.log?.error(error instanceof Error ? error.message : String(error));
      return handleAndReturnErrorResponse(error);
    }
  };
};

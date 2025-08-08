import {
  PatternRevealApiError,
  handleAndReturnErrorResponse,
} from "@/lib/api/errors";
import { getPermissions, type PermissionAction } from "../rbac/permissions";
import { getSession, type Session } from "./authOptions";
import prisma from "../prisma";
import { getSearchParams } from "@/utils/functions/urls";
import type { PlanProps, WorkspaceWithUsers } from "../types";
import { throwIfNoAccess } from "../tokens/permissions";
import { withAxiom } from "next-axiom";
import type { AxiomRequest } from "next-axiom";

type WithWorkspaceHandler = (args: {
  req: Request;
  params: Record<string, string>;
  searchParams: Record<string, string>;
  headers?: Record<string, string>;
  session: Session;
  permissions: PermissionAction[];
  workspace: WorkspaceWithUsers;
}) => Promise<Response>;

export const withWorkspace = (
  handler: WithWorkspaceHandler,
  {
    requiredPlan = ["free", "pro"], // if the action needs a specific plan
    requiredPermissions = [],
    skipPermissionChecks, // if the action doesn't need to check for required permission(s)
  }: {
    requiredPlan?: Array<PlanProps>;
    requiredPermissions?: PermissionAction[];
    skipPermissionChecks?: boolean;
  } = {}
) => {
  return withAxiom(
    async (
      req: AxiomRequest,
      { params }: { params: Promise<Record<string, string>> }
    ) => {
      const searchParams = getSearchParams(req.url);
      const awaitedParams = await params;
      const awaitedSearchParams = await searchParams;

      const headers = {};
      let workspace: WorkspaceWithUsers | undefined;

      try {
        let session: Session | undefined;
        let permissions: PermissionAction[] = [];

        const idOrSlug =
          awaitedParams?.idOrSlug ||
          awaitedSearchParams.workspaceId ||
          awaitedParams?.slug ||
          awaitedSearchParams.projectSlug;

        if (!idOrSlug) {
          throw new PatternRevealApiError({
            code: "bad_request",
            message: "Workspace ID or slug is required.",
          });
        }

        // Check if idOrSlug is a UUID or starts with ws_ (workspace ID) or is a slug
        const isUUID =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            idOrSlug
          );
        const isWorkspaceId = isUUID;
        const workspaceId = isWorkspaceId ? idOrSlug : undefined;
        const workspaceSlug = !isWorkspaceId ? idOrSlug : undefined;

        session = await getSession();

        if (!session?.user?.id) {
          throw new PatternRevealApiError({
            code: "unauthorized",
            message: "You need to be logged in to access this resource.",
          });
        }

        workspace = (await prisma.workspace.findFirst({
          where: workspaceId ? { id: workspaceId } : { slug: workspaceSlug },
          include: {
            users: {
              where: {
                userId: session.user.id,
              },
              select: {
                role: true,
              },
            },
          },
        })) as WorkspaceWithUsers;

        // workspace doesn't exist
        if (!workspace || !workspace.users) {
          throw new PatternRevealApiError({
            code: "not_found",
            message: "Workspace not found.",
          });
        }

        // workspace exists but user is not part of it
        if (workspace.users.length === 0) {
          const pendingInvites = await prisma.workspaceInvite.findUnique({
            where: {
              email_workspaceId: {
                email: session.user.email,
                workspaceId: workspace.id,
              },
            },
            select: {
              expires: true,
            },
          });

          if (!pendingInvites) {
            throw new PatternRevealApiError({
              code: "not_found",
              message: "Workspace not found.",
            });
          }

          if (pendingInvites.expires < new Date()) {
            throw new PatternRevealApiError({
              code: "invite_expired",
              message: "Workspace invite expired.",
            });
          }

          throw new PatternRevealApiError({
            code: "invite_pending",
            message: "Workspace invite pending.",
          });
        }

        permissions = getPermissions(workspace.users[0].role);

        // Check user has permission to make the action
        if (!skipPermissionChecks) {
          throwIfNoAccess({
            permissions,
            requiredPermissions,
          });
        }

        // plan checks
        if (!requiredPlan.includes(workspace.plan)) {
          throw new PatternRevealApiError({
            code: "forbidden",
            message: "Unauthorized: Need higher plan.",
          });
        }

        return await handler({
          req,
          params: awaitedParams,
          searchParams,
          headers,
          session,
          workspace,
          permissions,
        });
      } catch (error) {
        req.log.error(error instanceof Error ? error.message : String(error));
        console.log(
          "error",
          error instanceof Error ? error.stack : String(error)
        );
        return handleAndReturnErrorResponse(error);
      }
    }
  );
};

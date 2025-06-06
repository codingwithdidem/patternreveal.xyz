import { ManipulatedIOApiError } from "@/lib/api/errors";
import type { PermissionAction } from "../rbac/permissions";
import { getSession, type Session } from "./authOptions";
import prisma from "../prisma";
import { getSearchParams } from "@/utils/functions/urls";
import type { PlanProps, WorkspaceWithUsers } from "../types";

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
    skipPermissionChecks // if the action doesn't need to check for required permission(s)
  }: {
    requiredPlan?: Array<PlanProps>;
    requiredPermissions?: PermissionAction[];
    skipPermissionChecks?: boolean;
  } = {}
) => {
  return async (
    req: Request,
    { params = {} }: { params: Record<string, string> | undefined }
  ) => {
    const searchParams = getSearchParams(req.url);
    const awaitedParams = await params;

    let headers = {};
    let workspace: WorkspaceWithUsers | undefined;

    try {
      let session: Session | undefined;
      let workspaceId: string | undefined;
      let workspaceSlug: string | undefined;
      let permissions: PermissionAction[] = [];

      const idOrSlug =
        params?.idOrSlug ||
        searchParams.workspaceId ||
        params?.slug ||
        searchParams.projectSlug;

      if (idOrSlug) {
        workspaceSlug = idOrSlug;
      }

      session = await getSession();

      if (!session?.user?.id) {
        throw new ManipulatedIOApiError({
          code: "unauthorized",
          message: "You need to be logged in to access this resource."
        });
      }

      workspace = (await prisma.workspace.findUnique({
        where: {
          id: workspaceId || undefined,
          slug: workspaceSlug || undefined
        },
        include: {
          users: {
            where: {
              userId: session.user.id
            },
            select: {
              role: true
            }
          }
        }
      })) as WorkspaceWithUsers;

      console.log("workspace is", workspace);

      // workspace doesn't exist
      if (!workspace || !workspace.users) {
        throw new ManipulatedIOApiError({
          code: "not_found",
          message: "Workspace not found."
        });
      }

      // workspace exists but user is not part of it
      if (workspace.users.length === 0) {
        const pendingInvites = await prisma.workspaceInvite.findUnique({
          where: {
            email_workspaceId: {
              email: session.user.email,
              workspaceId: workspace.id
            }
          },
          select: {
            expires: true
          }
        });

        if (!pendingInvites) {
          throw new ManipulatedIOApiError({
            code: "not_found",
            message: "Workspace not found."
          });
        }

        if (pendingInvites.expires < new Date()) {
          throw new ManipulatedIOApiError({
            code: "invite_expired",
            message: "Workspace invite expired."
          });
        }

        throw new ManipulatedIOApiError({
          code: "invite_pending",
          message: "Workspace invite pending."
        });
      }

      // plan checks
      if (!requiredPlan.includes(workspace.plan)) {
        throw new ManipulatedIOApiError({
          code: "forbidden",
          message: "Unauthorized: Need higher plan."
        });
      }

      return await handler({
        req,
        params: awaitedParams,
        searchParams,
        headers,
        session,
        workspace,
        permissions
      });
    } catch (error) {
      throw new ManipulatedIOApiError({
        code: "internal_server_error",
        message: "Failed to process the request."
      });
    }
  };
};

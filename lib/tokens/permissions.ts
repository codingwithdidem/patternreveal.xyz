import { PatternRevealApiError } from "../api/errors";
import type { PermissionAction } from "../rbac/permissions";

export const throwIfNoAccess = ({
  permissions,
  requiredPermissions
}: {
  permissions: PermissionAction[]; // user or token permissions
  requiredPermissions: PermissionAction[];
}) => {
  if (requiredPermissions.length === 0) {
    return;
  }

  const missingPermissions = requiredPermissions.filter(
    (p) => !permissions.includes(p)
  );

  if (missingPermissions.length === 0) {
    return;
  }

  const message =
    "You don't have the necessary permissions to complete this request.";

  throw new PatternRevealApiError({
    code: "forbidden",
    message
  });
};

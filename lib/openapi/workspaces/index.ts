import type { ZodOpenApiPathsObject } from "zod-openapi";

import { getWorkspace } from "./get-workspace";
import { updateWorkspace } from "./update-workspace";

export const workspacesPaths: ZodOpenApiPathsObject = {
  "/workspaces/{idOrSlug}": {
    get: getWorkspace,
    patch: updateWorkspace,
  },
};

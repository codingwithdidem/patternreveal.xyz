import * as yaml from "yaml";
import { WorkspaceSchema } from "@/lib/zod/schemas/workspace";
import { createDocument } from "zod-openapi";
import { workspacesPaths } from "./workspaces";
import { openApiErrorResponses } from "./responses";

export const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "PatternReveal API",
    description:
      "PatternReveal is a platform for revealing patterns in your daily reflections with people you care about.",
    version: "0.0.1",
    contact: {
      name: "PatternReveal Support",
      email: "info@patternreveal.xyz",
      url: "https://patternreveal.com/api",
    },
  },
  servers: [
    {
      url: "https://api.dub.co",
      description: "Production API",
    },
  ],
  paths: {
    ...workspacesPaths,
  },
  components: {
    schemas: {
      WorkspaceSchema,
    },
    securitySchemes: {
      token: {
        type: "http",
        description: "Default authentication mechanism",
        scheme: "bearer",
        "x-speakeasy-example": "PATTERN_REVEAL_API_KEY",
      },
    },
    responses: {
      ...openApiErrorResponses,
    },
  },
});

console.log(yaml.stringify(document));

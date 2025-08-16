import { z } from "zod";
import { planSchema } from "./plan";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .describe("The name of the workspace"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .describe("The unique slug of the workspace"),
});

export const updateWorkspaceSchema = createWorkspaceSchema.partial();

export const WorkspaceSchema = z.object({
  id: z.string().describe("The unique identifier of the workspace"),
  name: z.string().describe("The name of the workspace"),
  slug: z.string().describe("The unique slug of the workspace"),
  logo: z
    .string()
    .nullable()
    .default(null)
    .describe("The logo of the workspace"),
  inviteCode: z
    .string()
    .nullable()
    .describe("The invite code of the workspace"),
  billingCycleStart: z.number().describe("The start date of the billing cycle"),
  paymentFailedAt: z
    .date()
    .nullable()
    .describe("The date and time when the payment failed for the workspace."),
  plan: planSchema,
  totalReflections: z
    .number()
    .describe("The total number of reflections in the workspace"),
  reflectionsUsage: z
    .number()
    .describe("The reflections usage of the workspace"),
  reflectionsLimit: z
    .number()
    .describe("The reflections limit of the workspace"),
  aiUsage: z.number().describe("The AI usage of the workspace"),
  aiLimit: z.number().describe("The AI limit of the workspace"),
  usersLimit: z.number().describe("The users limit of the workspace."),
  store: z.record(z.string(), z.any()).describe("The store of the workspace"),
  users: z
    .array(
      z.object({
        role: z.enum(["OWNER", "MEMBER"]),
      })
    )
    .describe("The role of the authenticated user in the workspace."),
  createdAt: z.date().describe("The date and time the workspace was created"),
  updatedAt: z
    .date()
    .describe("The date and time the workspace was last updated"),
  paddleCustomerId: z
    .string()
    .nullable()
    .describe("The Paddle customer ID of the workspace"),
});

export const WorkspaceSchemaExtended = WorkspaceSchema.extend({
  users: z.array(
    WorkspaceSchema.shape.users.element.extend({
      workspacePreferences: z.record(z.any()).nullish(),
    })
  ),
});

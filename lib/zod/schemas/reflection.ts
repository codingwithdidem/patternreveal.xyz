import { z } from "zod";
import { reportSchema } from "./report";
import { booleanQuerySchema, getPaginationQuerySchema } from "./misc";

const sortBy = z
  .enum(["createdAt"])
  .optional()
  .default("createdAt")
  .describe(
    "The field to sort the reflections by. The default is `createdAt`."
  );

export const createReflectionSchema = z.object({
  title: z.string().max(32).describe("The title of the reflection."),
  initialContent: z
    .string()
    .optional()
    .describe("The initial content of the reflection."),
  content: z.string().describe("The content of the reflection."),
});

export const deleteReflectionSchema = z.object({
  reflectionId: z.string().describe("The ID of the reflection to delete."),
});

export const updateReflectionSchema = z.object({
  title: z.string().max(32).optional().describe("The title of the reflection."),
  content: z.any().describe("The content of the reflection."),
});

export const analyzeReflectionSchema = z.object({
  reflectionId: z.string().describe("The ID of the reflection to analyze."),
  story: z.string().describe("The story to analyze."),
});

export const reflectionSchema = z.object({
  /// Unique identifier for the reflection
  id: z.string(),
  /// Title of the reflection
  title: z.string(),
  /// Initial content of the reflection, can be null
  initialContent: z.string().nullable(),
  /// Main content of the reflection
  content: z.string(),
  /// ID of the user who owns this reflection
  userId: z.string(),
  /// When the reflection was created
  createdAt: z.date(),
  /// Optional report associated with this reflection
  report: reportSchema.optional(),
});

const ReflectionQuerySchema = z.object({
  tagIds: z
    .union([z.string(), z.array(z.string())])
    .transform((v) => (Array.isArray(v) ? v : v.split(",")))
    .optional()
    .describe("The tag IDs to filter the links by.")
    .openapi({
      param: {
        style: "form",
        explode: false,
      },
      anyOf: [
        {
          type: "string",
        },
        {
          type: "array",
          items: {
            type: "string",
          },
        },
      ],
    }),
  search: z
    .string()
    .optional()
    .describe(
      "The search term to filter the reflections by. The search term will be matched against the reflection title"
    ),
  userId: z
    .string()
    .optional()
    .describe("The user ID to filter the reflections by."),
});

export const getReflectionsQuerySchemaBase = ReflectionQuerySchema.merge(
  z.object({
    sortBy,
    sortOrder: z
      .enum(["asc", "desc"])
      .optional()
      .default("desc")
      .describe("The sort order. The default is `desc`."),
  })
).merge(getPaginationQuerySchema({ pageSize: 100 }));

export const getReflectionsQuerySchemaExtended =
  getReflectionsQuerySchemaBase.merge(
    z.object({
      includeUser: booleanQuerySchema.default("false"),
      includeDashboard: booleanQuerySchema.default("false"),
      includeAIReport: booleanQuerySchema.default("false"),
      searchMode: z
        .enum(["fuzzy", "exact"])
        .default("fuzzy")
        .describe("Search mode to filter by."),
    })
  );

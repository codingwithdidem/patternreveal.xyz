import { z } from "zod";

export const reportSettingsSchema = z.object({
  /// Whether the report should be indexed by search engines
  index: z.boolean().default(false),
  /// Optional password to protect the report. If set, users must enter this password to view the report
  password: z.string().nullable().optional()
});

// Helper function to handle date validation
const dateSchema = z.union([
  z.date(),
  z.string().transform((str) => new Date(str)),
  z.null()
]);

export const reportSchema = z.object({
  id: z.string(),
  reflectionId: z.string(),
  linkId: z.string().nullable(),
  shortLink: z.string().nullable(),
  expiresAt: dateSchema.nullable(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
  /// Whether the report should be indexed by search engines
  index: z.boolean().default(false),
  /// Optional password to protect the report. If set, users must enter this password to view the report
  password: z.string().nullable().optional()
});

export const updateReportSchema = reportSchema.pick({
  index: true,
  password: true
});

import z from "@/lib/zod/index";

export const ErrorCode = z.enum([
  "bad_request",
  "unauthorized",
  "forbidden",
  "not_found",
  "conflict",
  "internal_server_error",
  "service_unavailable",
  "rate_limit_exceeded"
]);

const errorCodeToHttpStatus: Record<z.infer<typeof ErrorCode>, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  internal_server_error: 500,
  service_unavailable: 503,
  rate_limit_exceeded: 429
};

const ErrorSchema = z.object({
  error: z.object({
    code: ErrorCode.openapi({
      description: "A short code indicating the type of error.",
      example: "not_found"
    }),
    message: z.string().openapi({
      description: "A human-readable message describing the error.",
      example: "The requested resource was not found."
    })
  })
});

export type ErrorResponse = z.infer<typeof ErrorSchema>;
export type ErrorCodes = z.infer<typeof ErrorCode>;

export class ManipulatedIOApiError extends Error {
  public readonly code: ErrorCodes;

  constructor({
    code,
    message
  }: {
    code: ErrorCodes;
    message: string;
  }) {
    super(message);
    this.name = "ManipulatedIOApiError";
    this.code = code;
  }
}

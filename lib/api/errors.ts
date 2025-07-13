import z from "@/lib/zod/index";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";
import { PlanProps } from "../types";
import { capitalizeFirstChar } from "@/utils/functions/capitalize-first-char";
import { currencyFormatter } from "@/utils/functions/currency-formatter";

export const ErrorCode = z.enum([
  "bad_request",
  "unauthorized",
  "forbidden",
  "not_found",
  "conflict",
  "internal_server_error",
  "service_unavailable",
  "rate_limit_exceeded",
  "exceeded_limit",
  "invite_expired",
  "invite_pending",
  "unprocessable_entity"
]);

const errorCodeToHttpStatus: Record<z.infer<typeof ErrorCode>, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  internal_server_error: 500,
  service_unavailable: 503,
  rate_limit_exceeded: 429,
  exceeded_limit: 400,
  invite_expired: 400,
  invite_pending: 400,
  unprocessable_entity: 422
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

export class PatternRevealApiError extends Error {
  public readonly code: ErrorCodes;

  constructor({
    code,
    message
  }: {
    code: ErrorCodes;
    message: string;
  }) {
    super(message);
    this.name = "PatternRevealApiError";
    this.code = code;
  }
}

export function fromZodError(error: ZodError): ErrorResponse {
  return {
    error: {
      code: "unprocessable_entity",
      message: generateErrorMessage(error.issues, {
        maxErrors: 1,
        delimiter: {
          component: ": "
        },
        path: {
          enabled: true,
          type: "objectNotation",
          label: ""
        },
        code: {
          enabled: true,
          label: ""
        },
        message: {
          enabled: true,
          label: ""
        }
      })
    }
  };
}

export function handleApiError(
  error: unknown
): ErrorResponse & { status: number } {
  // Zod errors
  if (error instanceof ZodError) {
    return {
      ...fromZodError(error),
      status: errorCodeToHttpStatus.unprocessable_entity
    };
  }

  // PatternRevealApiError errors
  if (error instanceof PatternRevealApiError) {
    return {
      error: {
        code: error.code,
        message: error.message
      },
      status: errorCodeToHttpStatus[error.code]
    };
  }

  // Prisma record not found error
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "P2025"
  ) {
    const prismaError = error as {
      code: string;
      meta?: { cause?: string };
      message?: string;
    };
    return {
      error: {
        code: "not_found",
        message:
          prismaError?.meta?.cause ||
          prismaError?.message ||
          "The requested resource was not found."
      },
      status: 404
    };
  }

  // Fallback
  // Unhandled errors are not user-facing, so we don't expose the actual error
  return {
    error: {
      code: "internal_server_error",
      message:
        "An internal server error occurred. Please contact our support if the problem persists."
    },
    status: 500
  };
}

export function handleAndReturnErrorResponse(
  err: unknown,
  headers?: Record<string, string>
) {
  const { error, status } = handleApiError(err);

  return NextResponse.json<ErrorResponse>({ error }, { headers, status });
}

export const exceededLimitError = ({
  plan,
  limit,
  type
}: {
  plan: PlanProps;
  limit: number;
  type:
    | "clicks"
    | "links"
    | "AI"
    | "domains"
    | "tags"
    | "users"
    | "folders"
    | "payouts";
}) => {
  return `You've reached your ${
    ["links", "AI", "payouts"].includes(type) ? "monthly" : ""
  } limit of ${
    type === "payouts"
      ? currencyFormatter(limit / 100)
      : `${limit} ${limit === 1 ? type.slice(0, -1) : type}`
  } on the ${capitalizeFirstChar(plan)} plan. Please upgrade for higher limits.`;
};

import { ManipulatedIOApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import { NextResponse } from "next/server";
import { analyzeReflectionSchema } from "@/lib/zod/schemas/reflection";

export const POST = withPermissions(
  async ({ req, headers, session, searchParams, permissions }) => {
    const { success, data } = await analyzeReflectionSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new ManipulatedIOApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { reflectionId, story } = data;

    console.log({
      reflectionId,
      story
    });

    try {
      const response = await fetch(
        "https://cr7ldmkxrv6a7eai.us-east-1.aws.endpoints.huggingface.cloud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`
          },
          body: JSON.stringify({
            inputs: story
          })
        }
      );

      const result = await response.json();

      console.log(result);

      return NextResponse.json(result, {
        headers
      });
    } catch (error) {
      console.log("smth", error);
      throw new ManipulatedIOApiError({
        code: "internal_server_error",
        message: "Failed to create mood."
      });
    }
  },
  {
    requiredPermissions: ["mood.write"]
  }
);

import { ManipulatedIOApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import { NextResponse } from "next/server";
import { analyzeReflectionSchema } from "@/lib/zod/schemas/reflection";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { analysisSchema } from "@/lib/zod/schemas/analysis";
import prisma from "@/lib/prisma";

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
      const { object, usage } = await generateObject({
        model: openai("gpt-4-turbo"),
        system: `
         You are an expert in the field of psychology. Based on the reflection provided,
         generate a detailed analysis of the user's reflection. 
        `,
        prompt: `
          The following is the user's reflection that needs to be analyzed:
          ${story}
        `,
        schema: analysisSchema
      });

      if (!object) {
        throw new ManipulatedIOApiError({
          code: "internal_server_error",
          message: "Failed to generate analysis."
        });
      }

      // Save the analysis to the database
      const response = await prisma.reflection.update({
        where: {
          id: reflectionId
        },
        data: {
          analysisReport: {
            upsert: {
              create: {
                report: object
              },
              update: {
                report: object
              }
            }
          }
        }
      });

      console.log({
        response,
        object,
        usage
      });

      return NextResponse.json(object, {
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

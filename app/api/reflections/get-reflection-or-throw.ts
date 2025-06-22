import { PatternRevealApiError } from "@/lib/api/errors";
import prisma from "@/lib/prisma";
import type { Reflection } from "@prisma/client";

type GetReflectionOrThrowParams = {
  reflectionId: string;
};

// Get reflection or throw error if not found
export async function getReflectionOrThrow({
  reflectionId
}: GetReflectionOrThrowParams) {
  console.log("Getting reflection with ID:", reflectionId);

  const reflection = await prisma.reflection.findUnique({
    where: {
      id: reflectionId
    }
  });

  console.log("Found reflection:", reflection);

  if (!reflection) {
    throw new PatternRevealApiError({
      code: "not_found",
      message: "Reflection not found"
    });
  }

  return reflection;
}

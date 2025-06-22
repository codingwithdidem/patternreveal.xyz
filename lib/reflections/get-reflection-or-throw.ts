import { PatternRevealApiError } from "@/lib/api/errors";
import prisma from "@/lib/prisma";

type GetReflectionOrThrowParams = {
  reflectionId: string;
};

export async function getReflectionOrThrow({
  reflectionId
}: GetReflectionOrThrowParams) {
  const reflection = await prisma.reflection.findUnique({
    where: {
      id: reflectionId
    }
  });

  if (!reflection) {
    throw new PatternRevealApiError({
      code: "not_found",
      message: "Reflection not found"
    });
  }

  return reflection;
}

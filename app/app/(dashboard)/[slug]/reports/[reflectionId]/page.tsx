import ReflectionEditorClientPage from "./page-client";
import { constructMetadata } from "@/utils/functions/construct-metadata";
import prisma from "@/lib/prisma";

export async function generateMetadata({
  params
}: { params: Promise<{ reflectionId: string }> }) {
  const { reflectionId } = await params;

  try {
    const reflection = await prisma.reflection.findUnique({
      where: { id: reflectionId },
      select: { title: true }
    });

    if (!reflection) {
      return constructMetadata({
        title: "Reflection Not Found - PatternReveal",
        description: "The requested reflection could not be found.",
        noIndex: true
      });
    }

    return constructMetadata({
      title: `${reflection.title} - PatternReveal Analysis`,
      description: `Analyze your reflection: "${reflection.title}". Get AI-powered insights into your relationship patterns and emotional dynamics.`,
      noIndex: true
    });
  } catch (error) {
    return constructMetadata({
      title: "Reflection Analysis - PatternReveal",
      description:
        "Analyze your relationship reflection with AI-powered insights and pattern recognition.",
      noIndex: true
    });
  }
}

export default function ReflectionEditorPage() {
  return <ReflectionEditorClientPage />;
}

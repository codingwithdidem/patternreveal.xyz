import { createInitialReflectionAction } from "@/lib/actions/create-initial-reflection";
import NextButton from "../../next-button";
import CreateReflectionForm from "./form";
import { notFound } from "next/navigation";
import LaterButton from "../../later-button";

export default async function ReflectionPage() {
  const result = await createInitialReflectionAction({});

  if (!result?.data) {
    notFound();
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent md:text-5xl font-bold">
        Create your first reflection
      </h1>
      <p className="text-neutral-400 text-md mt-3 mb-6 max-w-md text-center">
        Reflect on your day and share an event that happened with your spouse,
        family, or friends. Later, you can analyze your reflections and see how
        they impact your relationship.
      </p>
      <CreateReflectionForm reflectionId={result.data.reflectionId} />
      <div className="mt-4">
        <NextButton step="plan" text="Continue" />
        <LaterButton next="plan" />
      </div>
    </div>
  );
}

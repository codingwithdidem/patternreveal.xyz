"use client";

import AnimatedEmptyState from "@/components/AnimatedEmptyState";
import ReflectionsTable from "@/components/reflections/ReflectionsTable";
import { Button } from "@/components/ui/button";
import useReflections from "@/lib/swr/use-reflections";
import { FlagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const redFlags = [
  {
    id: 1,
    title: "Putdowns"
  },
  {
    id: 2,
    title: "Gaslighting"
  },
  {
    id: 3,
    title: "Name-calling"
  }
];

export default function ReflectionsClientPage() {
  const router = useRouter();
  const { reflections, error } = useReflections();

  console.log(reflections);

  const createReflection = async () => {
    try {
      const response = await fetch("/api/reflections", {
        method: "POST",
        body: JSON.stringify({
          title: "Untitled Reflection",
          content: ""
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        toast.success("Reflection created successfully");
        // Redirect to the newly created reflection
        const { id } = await response.json();
        router.push(`/dashboard/reflections/${id}`);
      } else {
        const { error } = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create reflection");
    }
  };

  const isLoading = !reflections && !error;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 h-full w-full">
      {reflections && reflections?.length > 0 ? (
        <ReflectionsTable reflections={reflections} />
      ) : (
        <AnimatedEmptyState
          title="No reflections found"
          description="Start creating daily reflections to track your progress."
          addButton={
            <Button onClick={createReflection}>Create reflection</Button>
          }
          cardContent={(idx) => (
            <div className="flex items-center space-x-4">
              <FlagIcon className="w-6 h-6 text-red-700 shrink-0" />
              <span className="text-sm text-neutral-900 uppercase">
                {redFlags[idx].title}
              </span>
            </div>
          )}
        />
      )}
    </div>
  );
}

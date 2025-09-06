import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Reflection } from "@prisma/client";
import { toast } from "sonner";
import { mutatePrefix } from "@/lib/swr/mutate";
import useWorkspace from "@/lib/swr/use-workspace";

type DeleteReflectionDialogProps = {
  reflectionId: Reflection["id"];
  reflectionTitle: Reflection["title"];
  children: React.ReactNode;
};

export default function DeleteReflectionDialog({
  reflectionId,
  reflectionTitle,
  children,
}: DeleteReflectionDialogProps) {
  const { id: workspaceId } = useWorkspace();

  const deleteReflection = async () => {
    if (!workspaceId) {
      toast.error("Workspace not found");
      return;
    }

    try {
      const response = await fetch(
        `/api/reflections?workspaceId=${workspaceId}&reflectionId=${reflectionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        toast.success(`"${reflectionTitle}" deleted successfully`);

        // Invalidate all reflection-related cache entries
        mutatePrefix([
          `/api/reflections?workspaceId=${workspaceId}`,
          "/api/reflections/popular",
          `/api/reflections/${reflectionId}`,
          "/api/workspaces/",
          "/api/analytics",
        ]);
      } else {
        const { error } = await response.json();
        console.error(error);
        toast.error(error?.message || "Failed to delete reflection");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the reflection");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete the reflection titled{" "}
            <strong>{reflectionTitle}</strong>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              deleteReflection();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

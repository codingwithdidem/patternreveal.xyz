"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";
import React, { useEffect, useState } from "react";
import WorkspaceSelector from "../workspaces/workspace-selector";

export default function UpdateDefaultWorkspaceForm() {
  const { data: session, update } = useSession();
  const [defaultWorkspace, setDefaultWorkspace] = useState<string | null>(null);

  useEffect(() => {
    console.log({ session });
    if (session?.user?.defaultWorkspace) {
      setDefaultWorkspace(session.user.defaultWorkspace);
    }
  }, [session]);

  const updateDefaultWorkspace = async (defaultWorkspace: string) => {
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ defaultWorkspace })
      });

      if (response.status === 200) {
        update();
      } else {
        const { error } = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update default workspace");
    }
  };

  return (
    <div className="flex items-center gap-10 w-full py-4">
      <div className="flex flex-col gap-0.5 mb-4 w-full">
        <h2 className="font-semibold text-lg">Your Default Workspace</h2>
        <p className="text-muted-foreground">
          This is the workspace that will be selected by default when you log
          in.
        </p>
      </div>
      <div className="w-full flex items-center justify-start">
        <div className="max-w-sm w-full">
          <WorkspaceSelector
            selectedWorkspace={defaultWorkspace}
            setSelectedWorkspace={(workspace) => {
              setDefaultWorkspace(workspace);
              toast.promise(updateDefaultWorkspace(workspace), {
                loading: "Updating default workspace...",
                success: "Default workspace updated",
                error: "Failed to update default workspace"
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

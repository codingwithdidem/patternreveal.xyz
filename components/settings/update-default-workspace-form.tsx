"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import WorkspaceSelector from "../workspaces/workspace-selector";

export default function UpdateDefaultWorkspaceForm() {
  const { data: session, update } = useSession();
  const [defaultWorkspace, setDefaultWorkspace] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    console.log({ session });
    if (session?.user?.defaultWorkspace) {
      setDefaultWorkspace(session.user.defaultWorkspace);
    }
  }, [session]);

  const updateDefaultWorkspace = async () => {
    if (!defaultWorkspace) return;

    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ defaultWorkspace })
      });

      if (response.status === 200) {
        toast.success("Default workspace updated");
        setHasChanges(false);
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
    <div className="border border-neutral-200 rounded-lg bg-white p-6">
      <h2 className="font-semibold text-lg mb-1">Default Workspace</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        This is the workspace that will be selected by default when you log in.
      </p>
      <div className="max-w-sm w-full mb-4">
        <WorkspaceSelector
          selectedWorkspace={defaultWorkspace}
          setSelectedWorkspace={(workspace) => {
            setDefaultWorkspace(workspace);
            setHasChanges(true);
          }}
        />
      </div>
      <div className="-mx-6 border-t border-neutral-200 my-6" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Select your preferred default workspace.
        </span>
        <Button onClick={updateDefaultWorkspace} disabled={!hasChanges}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

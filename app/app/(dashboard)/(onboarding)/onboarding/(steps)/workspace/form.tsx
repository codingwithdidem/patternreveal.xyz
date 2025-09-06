"use client";

import CreateWorkspaceForm from "@/components/workspaces/create-workspace-form";
import { useOnboardingFlow } from "@/lib/onboarding/useOnboardingFlow";

export default function WorkspaceForm() {
  const { moveToStep } = useOnboardingFlow();
  return (
    <CreateWorkspaceForm
      onSuccess={(workspace) => {
        console.log(workspace);
        moveToStep("invite", workspace.slug);
      }}
    />
  );
}

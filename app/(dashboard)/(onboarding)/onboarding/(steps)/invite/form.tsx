"use client";

import CreateInvitesForm from "@/components/workspaces/create-invites-form";
import { useOnboardingFlow } from "@/lib/onboarding/useOnboardingFlow";

export default function InviteForm() {
  const { moveToStep } = useOnboardingFlow();
  return <CreateInvitesForm onSuccess={() => moveToStep("plan")} />;
}

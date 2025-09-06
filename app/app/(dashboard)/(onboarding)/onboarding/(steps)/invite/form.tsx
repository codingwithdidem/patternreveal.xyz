"use client";

import CreateInvitesForm from "@/components/workspaces/create-invites-form";
import { useOnboardingFlow } from "@/lib/onboarding/useOnboardingFlow";
import type { Invite } from "@/lib/zod/schemas/invites";

interface InviteFormProps {
  onSuccess?: () => void;
  invites?: Invite[];
}

export default function InviteForm({ onSuccess, invites }: InviteFormProps) {
  const { moveToStep } = useOnboardingFlow();

  const handleSuccess = () => {
    onSuccess?.();
    moveToStep("plan");
  };

  return <CreateInvitesForm onSuccess={handleSuccess} invites={invites} />;
}

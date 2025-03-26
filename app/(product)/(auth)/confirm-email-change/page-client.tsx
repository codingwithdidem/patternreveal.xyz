"use client";
import { EmptyState } from "@/components/EmptyState";
import { KeyRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ConfirmEmailChangePageClient() {
  const router = useRouter();
  const { update, status } = useSession();
  const hasUpdatedSession = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || hasUpdatedSession.current) {
      return;
    }

    async function updateSession() {
      hasUpdatedSession.current = true;
      await update();
      toast.success("Successfully updated your email!");
      // Wait 5 seconds before redirecting to the settings page
      setTimeout(() => {
        router.replace("/dashboard/settings");
      }, 5000);
    }

    updateSession();
  }, [status, update]);

  return (
    <EmptyState
      icon={KeyRound}
      title="Verifying Email Change"
      description="Verifying your email change request. This might take a few seconds..."
    />
  );
}

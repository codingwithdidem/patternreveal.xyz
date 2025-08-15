"use client";
import { identifyUser } from "@/lib/posthog/identify-user";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function TrackSignUp() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email && session?.user?.name) {
      identifyUser({
        userId: session.user.id,
        email: session.user.email ?? "",
        name: session.user.name ?? "",
      });
      posthog.capture("user_signed_up");
    }
  }, [session?.user]);

  return null;
}

"use client";

import { identifyUser } from "@/lib/posthog/identify-user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      identifyUser({
        userId: "123",
        email: session.user.email ?? "",
        name: session.user.name ?? ""
      });
    }
  }, [session]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  gap-16 font-[family-name:var(--font-satoshi)]">
      Get started {session?.user?.email}
    </div>
  );
}

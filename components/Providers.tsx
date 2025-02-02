"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({
  session,
  children
}: Readonly<{
  session: Session | null;
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}

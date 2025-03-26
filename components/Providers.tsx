"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import SuspendedPostHogPageView from "./PostHogPageView";

export default function Providers({
  session,
  children
}: Readonly<{
  session: Session | null;
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      console.warn("PostHog key not found, skipping initialization.");
      return;
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true // Enable automatic pageleave capture
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <PHProvider client={posthog}>
        <TooltipProvider>
          <SuspendedPostHogPageView />
          {children}
        </TooltipProvider>
      </PHProvider>
    </SessionProvider>
  );
}

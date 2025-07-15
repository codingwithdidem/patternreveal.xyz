import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { constructMetadata } from "@/utils/functions/construct-metadata";

import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard - PatternReveal Workspace",
  description:
    "Your personal relationship analysis dashboard. Track patterns, analyze reflections, and gain insights into your relationships with AI-powered tools.",
  noIndex: true
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}

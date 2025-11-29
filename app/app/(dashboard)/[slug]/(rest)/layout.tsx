import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { constructMetadata } from "@/utils/functions/construct-metadata";

import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard - PatternReveal",
  description: "Your PatternReveal dashboard with sidebar navigation.",
  noIndex: true,
});

export default async function WithSidebarLayout({
  children,
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

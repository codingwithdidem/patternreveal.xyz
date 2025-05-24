import AppSidebar from "@/components/AppSidebar";
import Providers from "@/components/Providers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth/authOptions";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manipulated.io | An AI-powered journal",
  description: "A tool for tracking your mood and reflections"
};

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

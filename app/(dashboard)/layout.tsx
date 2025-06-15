import Providers from "@/components/Providers";
import { authOptions } from "@/lib/auth/authOptions";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return <Providers session={session}>{children}</Providers>;
}

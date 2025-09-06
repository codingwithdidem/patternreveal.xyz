import Providers from "@/components/Providers";
import { authOptions } from "@/lib/auth/authOptions";
import { constructMetadata } from "@/utils/functions/construct-metadata";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = constructMetadata({
  title: "Admin Knowledge Management - PatternReveal",
  description:
    "Administrative interface for managing PatternReveal's knowledge base, AI training data, and relationship abuse pattern documentation.",
  noIndex: true
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <Providers session={session}>
      <main className="w-full">{children}</main>
    </Providers>
  );
}

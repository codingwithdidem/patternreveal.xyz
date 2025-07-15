import Providers from "@/components/Providers";

import { authOptions } from "@/lib/auth/authOptions";
import { constructMetadata } from "@/utils/functions/construct-metadata";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = constructMetadata({
  title: "Reflection Analysis - PatternReveal",
  description:
    "Analyze your relationship reflections with AI-powered insights. Identify patterns, understand dynamics, and receive personalized guidance for healthier relationships.",
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
      <main className="w-full font-[family-name:var(--font-satoshi)]">
        {children}
      </main>
    </Providers>
  );
}

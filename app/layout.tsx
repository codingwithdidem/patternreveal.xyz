import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AxiomWebVitals } from "next-axiom";

import "./globals.css";
import { constructMetadata } from "@/utils/functions/construct-metadata";

const satoshi = localFont({
  src: "./fonts/Satoshi.ttf",
  variable: "--font-satoshi",
});
const erode = localFont({
  src: "./fonts/Erode.ttf",
  variable: "--font-erode",
});

export const metadata: Metadata = constructMetadata({
  title: "AI-Powered Relationship Pattern Analysis | PatternReveal.xyz",
  fullTitle:
    "PatternReveal.xyz - Identify Manipulative Patterns & Build Healthier Relationships",
  description:
    "AI-powered relationship analysis platform that helps you identify manipulative behaviors, emotional abuse patterns, and toxic dynamics. Create daily reflections, get expert insights, and build stronger personal boundaries to protect your well-being.",
  image: "/images/example-report.png",
  url: "https://patternreveal.xyz",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${erode.variable} antialiased h-screen`}
      >
        <Toaster />
        <NuqsAdapter>{children}</NuqsAdapter>
        <AxiomWebVitals />
      </body>
    </html>
  );
}

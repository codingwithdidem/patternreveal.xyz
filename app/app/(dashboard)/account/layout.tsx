import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Account Settings - PatternReveal",
  description:
    "Manage your PatternReveal account settings and privacy options.",
  noIndex: true,
});

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link
          href="/app"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Analytics - PatternReveal",
  description:
    "Insights from your reflection patterns and relationship dynamics.",
  noIndex: true,
});

export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 h-full w-full font-[family-name:var(--font-satoshi)]">
      <div>{children}</div>
    </div>
  );
}

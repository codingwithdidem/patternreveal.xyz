import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Settings - PatternReveal",
  description:
    "Manage your PatternReveal account settings, workspace preferences, and privacy options.",
  noIndex: true
});

export default async function SettingsLayout({
  children
}: { children: React.ReactNode }) {
  return (
    <div className="p-4 h-full w-full font-[family-name:var(--font-satoshi)]">
      <div>{children}</div>
    </div>
  );
}

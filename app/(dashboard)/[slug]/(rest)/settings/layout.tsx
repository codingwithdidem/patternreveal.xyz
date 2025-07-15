import { NavigationMenu } from "@/components/NavigationMenu";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Settings - PatternReveal",
  description:
    "Manage your PatternReveal account settings, workspace preferences, and privacy options.",
  noIndex: true
});

export default async function SettingsLayout({
  children,
  params
}: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const navItems = [
    { label: "Account", href: `/${slug}/settings` },
    { label: "Workspace", href: `/${slug}/settings/workspace` }
  ];

  return (
    <div className="p-4 h-full w-full font-[family-name:var(--font-satoshi)]">
      <NavigationMenu items={navItems} />
      <div className="mt-8">{children}</div>
    </div>
  );
}

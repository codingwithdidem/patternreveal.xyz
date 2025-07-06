import { NavigationMenu } from "@/components/NavigationMenu";

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

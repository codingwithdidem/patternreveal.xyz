import { NavigationMenu } from "@/components/NavigationMenu";

export default function SettingsLayout({
  children,
  params
}: { children: React.ReactNode; params: { slug: string } }) {
  const navItems = [
    { label: "Account", href: `/${params.slug}/settings` },
    { label: "Workspace", href: `/${params.slug}/settings/workspace` }
  ];

  return (
    <div className="p-4 h-full w-full font-[family-name:var(--font-satoshi)]">
      <NavigationMenu items={navItems} />
      <div className="mt-8">{children}</div>
    </div>
  );
}

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@components/ui/sidebar";
import { BellRing, ChevronLeft, LucideIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import UserPopover from "@components/UserPopover";
import Logo from "@components/Logo";
import MoodTracker from "@components/mood-tracker/MoodTracker";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ComponentType,
  ForwardRefExoticComponent,
  SVGProps,
  useMemo
} from "react";
import { cn } from "@/lib/utils";
import { ActivityIcon } from "./ui/activity";
import { BookTextIcon } from "./ui/book-text";
import { SettingsGearIcon } from "./ui/settings-gear";
import type { Session } from "next-auth";
import { BellIcon } from "./ui/bell";

export type NavItemCommon = {
  name: string;
  href: string;
  exact?: boolean;
};

export type NavSubItemType = NavItemCommon;

export type NavItemType = NavItemCommon & {
  icon:
    | LucideIcon
    | ComponentType<SVGProps<SVGSVGElement>>
    | ForwardRefExoticComponent<any>;
  items?: NavSubItemType[];
};

type SidebarNavAreas<T extends Record<any, any>> = Record<
  string,
  (args: T) => {
    title?: string;
    backHref?: string;
    showNews?: boolean;
    direction?: "left" | "right";
    content: {
      name?: string;
      items: NavItemType[];
    }[];
  }
>;

const NAV_AREAS: SidebarNavAreas<{
  pathname: string;
  queryString: string;
  showNews?: boolean;
  session?: Session | null;
}> = {
  dashboard: ({ pathname, queryString, showNews }) => ({
    showNews,
    direction: "left",
    content: [
      {
        name: "Dashboard",
        items: [
          {
            name: "Moods",
            icon: ActivityIcon,
            href: `/dashboard/moods${pathname === "/dashboard/moods" ? "" : queryString}`
          },
          {
            name: "Reflections",
            icon: BookTextIcon,
            href: `/dashboard/reflections${pathname === "/dashboard/reflections" ? "" : queryString}`
          },
          {
            name: "Settings",
            icon: SettingsGearIcon,
            href: `/dashboard/settings${pathname === "/settings" ? "" : queryString}`
          }
        ]
      }
    ]
  }),
  settings: ({ session }) => ({
    title: "Settings",
    backHref: "/dashboard",
    content: [
      {
        name: "Account",
        items: [
          {
            name: "Profile",
            icon: User2Icon,
            href: "/dashboard/settings/profile"
          },
          {
            name: "Notifications",
            icon: BellRing,
            href: "/dashboard/settings/notifications"
          }
        ]
      }
    ]
  })
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentArea = useMemo(() => {
    return pathname.startsWith("/dashboard/settings")
      ? "settings"
      : "dashboard";
  }, [pathname]);

  return (
    <Sidebar className="font-[family-name:var(--font-satoshi)]">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          {Object.entries(NAV_AREAS).map(([area, areaConfig]) => {
            const areaProps = areaConfig({
              pathname,
              session,
              showNews: false,
              queryString: ""
            });
            const { title, backHref } = areaProps;

            return (
              <Link
                key={area}
                href={backHref ?? "/"}
                className={cn(
                  "rounded-md px-1 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-black/50",
                  area === currentArea
                    ? "relative opacity-100"
                    : "pointer-events-none absolute opacity-0"
                )}
                aria-hidden={area !== currentArea ? true : undefined}
                {...{ inert: area !== currentArea ? true : undefined }}
              >
                {title && backHref ? (
                  <div className="py group -my-1 -ml-1 flex items-center gap-2 py-2 pr-1 text-sm font-medium text-neutral-900">
                    <ChevronLeft className="size-4 text-neutral-500 transition-transform duration-100 group-hover:-translate-x-0.5" />
                    {title}
                  </div>
                ) : (
                  <Logo />
                )}
              </Link>
            );
          })}
          <UserPopover />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-1">
        {Object.entries(NAV_AREAS).map(([area, areaConfig]) => {
          const { content, showNews, direction } = areaConfig({
            pathname,
            session,
            queryString: "",
            showNews: false
          });
          return (
            <div
              key={area}
              className={cn(
                "left-0 top-0 transition-[opacity,transform] duration-300",
                area === currentArea
                  ? "opacity-1 relative"
                  : `opacity-0 pointer-events-none absolute ${
                      direction === "left"
                        ? "-translate-x-full"
                        : "translate-x-full"
                    }`
              )}
              {...{ inert: area !== currentArea ? true : undefined }}
            >
              {content.map(({ name, items }) => (
                <SidebarGroup key={name}>
                  <SidebarGroupContent>
                    {name && <SidebarGroupLabel>{name}</SidebarGroupLabel>}
                    <SidebarMenu>
                      {items.map(({ name, href, icon: Icon }) => (
                        <SidebarMenuItem key={name}>
                          <SidebarMenuButton asChild>
                            <Link href={href}>
                              <Icon className="w-8 h-8" />
                              <span>{name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </div>
          );
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

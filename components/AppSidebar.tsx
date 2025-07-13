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
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@components/ui/sidebar";
import {
  BellRing,
  ChevronDown,
  ChevronLeft,
  LucideIcon,
  User2Icon
} from "lucide-react";
import Link from "next/link";
import UserPopover from "@components/UserPopover";
import Logo from "@components/Logo";
import MoodTracker from "@components/mood-tracker/MoodTracker";
import { useParams, usePathname } from "next/navigation";
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
import usePopularReflections from "@/lib/swr/use-popular-reflections";
import { truncate } from "@/utils/functions/truncate";
import { capitalizeFirstChar } from "@/utils/functions/capitalize-first-char";
import WorkspaceDropdown from "./workspaces/workspace-dropdown";

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
  subItems?: NavSubItemType[];
};

type SidebarNavAreas<T extends Record<any, any>> = Record<
  string,
  (args: T) => {
    title?: string;
    backHref?: string;
    showNews?: boolean;
    showWorkspaceDropdown?: boolean;
    direction?: "left" | "right";
    content: {
      name?: string;
      items: NavItemType[];
    }[];
  }
>;

const NAV_AREAS: SidebarNavAreas<{
  slug: string;
  pathname: string;
  queryString: string;
  showNews?: boolean;
  showWorkspaceDropdown?: boolean;
  session?: Session | null;
  topReflections?: Array<{ id: string; title: string }>;
}> = {
  dashboard: ({ slug, pathname, queryString, showNews, topReflections }) => ({
    showNews,
    showWorkspaceDropdown: true,
    direction: "left",
    content: [
      {
        name: "",
        items: [
          {
            name: "Reflections",
            icon: BookTextIcon,
            href: `/${slug}/reflections${pathname === `/${slug}/reflections` ? "" : queryString}`,
            subItems: topReflections?.map((reflection) => ({
              name: reflection.title,
              href: `/${slug}/reflections/${reflection.id}`
            }))
          },
          {
            name: "Moods",
            icon: ActivityIcon,
            href: `/${slug}/moods${pathname === `/${slug}/moods` ? "" : queryString}`
          },
          {
            name: "Settings",
            icon: SettingsGearIcon,
            href: `/${slug}/settings${pathname === `/${slug}/settings` ? "" : queryString}`
          }
        ]
      }
    ]
  }),
  settings: ({ slug, session }) => ({
    title: "Settings",
    backHref: `/${slug}`,
    content: [
      {
        name: "Account",
        items: [
          {
            name: "Profile",
            icon: User2Icon,
            href: `/${slug}/settings/profile`
          },
          {
            name: "Notifications",
            icon: BellRing,
            href: `/${slug}/settings/notifications`
          }
        ]
      }
    ]
  })
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();

  console.log("slug", slug);

  const { reflections: topReflections, isLoading: isTopReflectionsLoading } =
    usePopularReflections();

  const currentArea = useMemo(() => {
    return pathname.startsWith(`/${slug}/settings`) ? "settings" : "dashboard";
  }, [pathname, slug]);

  return (
    <Sidebar className="font-[family-name:var(--font-satoshi)]">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          {Object.entries(NAV_AREAS).map(([area, areaConfig]) => {
            const areaProps = areaConfig({
              slug,
              pathname,
              session,
              showNews: false,
              queryString: "",
              topReflections
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
          const { content, showNews, showWorkspaceDropdown, direction } =
            areaConfig({
              slug,
              pathname,
              session,
              queryString: "",
              showNews: false,
              topReflections
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
              <div className="mx-2 mt-2">
                {showWorkspaceDropdown && <WorkspaceDropdown />}
              </div>
              {content.map(({ name, items }) => (
                <SidebarGroup key={name}>
                  <SidebarGroupContent>
                    {name && <SidebarGroupLabel>{name}</SidebarGroupLabel>}
                    <SidebarMenu>
                      {items.map(
                        ({ name, href, icon: Icon, exact, subItems }) => {
                          const isActive = useMemo(() => {
                            const hrefWithoutQuery = href.split("?")[0];
                            return exact
                              ? pathname === hrefWithoutQuery
                              : pathname.startsWith(hrefWithoutQuery);
                          }, [pathname, href, exact]);
                          return (
                            <SidebarMenuItem key={name}>
                              <SidebarMenuButton asChild isActive={isActive}>
                                <Link href={href}>
                                  <Icon className="w-8 h-8" />
                                  <span>{name}</span>
                                </Link>
                              </SidebarMenuButton>
                              {subItems && (
                                <SidebarMenuSub>
                                  {subItems.map(({ name, href }) => (
                                    <SidebarMenuSubItem key={href}>
                                      <SidebarMenuSubButton>
                                        {capitalizeFirstChar(
                                          truncate(name, 24) ?? ""
                                        )}
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              )}
                            </SidebarMenuItem>
                          );
                        }
                      )}
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

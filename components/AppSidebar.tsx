"use client";

import React from "react";
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
  SidebarMenuSubItem,
} from "@components/ui/sidebar";
import {
  ChevronLeft,
  CogIcon,
  CreditCardIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import UserPopover from "@components/UserPopover";
import Logo from "@components/Logo";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { ComponentType } from "react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ActivityIcon } from "./ui/activity";
import { BookTextIcon } from "./ui/book-text";
import { SettingsGearIcon } from "./ui/settings-gear";
import type { Session } from "next-auth";
import usePopularReflections from "@/lib/swr/use-popular-reflections";
import { truncate } from "@/utils/functions/truncate";
import { capitalizeFirstChar } from "@/utils/functions/capitalize-first-char";
import WorkspaceDropdown from "./workspaces/workspace-dropdown";
import WorkspaceUsage from "./workspaces/workspace-usage";
import { motion } from "motion/react";
import { AnimatePresence } from "framer-motion";

export type NavItemCommon = {
  name: string;
  href: string;
  exact?: boolean;
};

export type NavSubItemType = NavItemCommon;

export type NavItemType = NavItemCommon & {
  icon: ComponentType<{ className?: string }>;
  items?: NavSubItemType[];
  subItems?: NavSubItemType[];
};

type SidebarNavAreas<T extends Record<string, unknown>> = Record<
  string,
  (args: T) => {
    title?: string;
    backHref?: string;
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
  session?: Session | null;
  topReflections?: Array<{ id: string; title: string }>;
}> = {
  dashboard: ({ slug, pathname, queryString, topReflections }) => ({
    showWorkspaceDropdown: true,
    direction: "left",
    content: [
      {
        name: "",
        items: [
          {
            name: "Reflections",
            icon: BookTextIcon,
            href: `/${slug}/reflections${
              pathname === `/${slug}/reflections` ? "" : queryString
            }`,
            subItems: (topReflections || []).map((reflection) => ({
              name: reflection.title,
              href: `/app/${slug}/reports/${reflection.id}`,
            })),
          },
          {
            name: "Analytics",
            icon: ActivityIcon,
            href: `/${slug}/analytics`,
          },
          {
            name: "Settings",
            icon: SettingsGearIcon,
            href: `/${slug}/settings${
              pathname === `/${slug}/settings` ? "" : queryString
            }`,
          },
        ],
      },
    ],
  }),
  settings: ({ slug }) => ({
    title: "Settings",
    backHref: `/${slug}`,
    content: [
      {
        name: "Account",
        items: [
          {
            name: "General",
            icon: CogIcon,
            href: `/${slug}/settings`,
            exact: true,
          },
        ],
      },
      {
        name: "Workspace",
        items: [
          {
            name: "General",
            icon: CogIcon,
            href: `/${slug}/settings/workspace`,
            exact: true,
          },
          {
            name: "Billing",
            icon: CreditCardIcon,
            href: `/${slug}/settings/workspace/billing`,
          },
          {
            name: "Members",
            icon: UsersRoundIcon,
            href: `/${slug}/settings/workspace/members`,
          },
        ],
      },
    ],
  }),
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();

  const { reflections: topReflections } = usePopularReflections({
    workspaceIdOrSlug: slug,
    limit: 10,
  });

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
              queryString: "",
              topReflections,
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
                  <div className="py group -my-1 -ml-1 flex items-center gap-2 py-2 pr-1 text-md font-medium text-neutral-900">
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
          const { content, showWorkspaceDropdown, direction } = areaConfig({
            slug,
            pathname,
            session,
            queryString: "",
            topReflections,
          });
          return (
            <React.Fragment key={area}>
              <div
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
                            const hrefWithoutQuery = href.split("?")[0];
                            const isActive = exact
                              ? pathname === hrefWithoutQuery
                              : pathname.startsWith(hrefWithoutQuery);
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
                                        <SidebarMenuSubButton href={href}>
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
            </React.Fragment>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <AnimatePresence>
          {currentArea === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            >
              <WorkspaceUsage />
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarFooter>
    </Sidebar>
  );
}

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
import { Activity, Home, Settings } from "lucide-react";
import Link from "next/link";
import UserPopover from "@components/UserPopover";
import Logo from "@components/Logo";
import MoodTracker from "@components/mood-tracker/MoodTracker";

const menuItems = [
  {
    title: "Moods",
    icon: Activity,
    url: "dashboard/moods"
  },
  {
    title: "Reflections",
    icon: Activity,
    url: "dashboard/reflections"
  },
  {
    title: "Settings",
    icon: Settings,
    url: "dashboard/settings"
  }
];

export default function AppSidebar() {
  return (
    <Sidebar className="font-[family-name:var(--font-satoshi)]">
      <SidebarHeader>
        <div className="flex gap-3 items-center justify-between px-2">
          <Logo />
          <UserPopover />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <MoodTracker />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

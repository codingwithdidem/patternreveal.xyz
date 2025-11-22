"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { truncate } from "@/utils/functions/truncate";
import UserAvatar from "@components/UserAvatar";
import { LogOut, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

export default function UserPopover() {
  const { data: session } = useSession();

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={() => setOpenPopover(!openPopover)}
          className={cn(
            "group relative rounded-full ring-0 transition-all hover:ring-1 hover:ring-black/10 active:ring-black/15 data-[state='open']:ring-black/15",
            "outline-none focus-visible:ring-1 focus-visible:ring-black/50"
          )}
        >
          {session?.user ? (
            <UserAvatar user={session.user} />
          ) : (
            <div className="animate-pulse w-8 h-8 bg-gray-100 rounded-full" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="sm:w-64 p-0">
        <div className="flex flex-col w-full gap-1 rounded-md bg-white p-2">
          <div className="p-2">
            {session?.user ? (
              <div className="">
                <h3 className="text-sm text-neutral-900">
                  {truncate(session.user.name, 30)}
                </h3>
                <p className="text-sm text-neutral-600">
                  {truncate(session.user.email, 30)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-32 h-4 bg-gray-200 rounded-full animate-pulse" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <PopoverOption
              as="a"
              href="/app/account/settings"
              icon={User}
              label="Account Settings"
            />
            <PopoverOption
              as="button"
              icon={LogOut}
              label="Log Out"
              onClick={() => {
                signOut({
                  callbackUrl: "/app/login",
                });
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

type PopoverOptionProps<T extends React.ElementType> = {
  as?: T;
  icon: LucideIcon;
  label: string;
};

function PopoverOption<T extends React.ElementType = "button">({
  as,
  icon: Icon,
  label,
  ...rest
}: PopoverOptionProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PopoverOptionProps<T>>) {
  const Component = as || "button";
  return (
    <Component
      className="flex items-center gap-x-2 px-2.5 py-2 text-sm rounded-md transition-all duration-75 hover:bg-gray-200/50 active:bg-gray-200/80 cursor-pointer"
      {...rest}
    >
      <Icon className="size-4 text-gray-600" />
      <span className="block truncate text-gray-700">{label}</span>
    </Component>
  );
}

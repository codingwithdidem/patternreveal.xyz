"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavigationMenuProps = {
  items: {
    label: string;
    href: string;
  }[];
};

export function NavigationMenu({ items }: NavigationMenuProps) {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-x-4">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            prefetch
            key={item.href}
            href={item.href}
            className={cn(
              "text-gray-500 text-sm font-medium transition-colors hover:text-primary",
              isActive && "text-gray-900"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

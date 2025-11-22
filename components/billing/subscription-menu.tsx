"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CreditCard,
  Loader2,
  MoreHorizontal,
  SquareXIcon,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useWorkspace from "@/lib/swr/use-workspace";
import { Command, CommandList } from "cmdk";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SubscriptionMenu() {
  const { id: workspaceId } = useWorkspace();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    setIsOpen(false);
    setIsLoading(true);
    try {
      // Redirect to Paddle's customer portal
      const response = await fetch(
        `/api/workspaces/${workspaceId}/billing/portal`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        router.push(data.url);
      } else {
        toast.error("Failed to open customer portal. Please try again.");
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast.error("Failed to open customer portal. Please try again.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsOpen(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/workspaces/${workspaceId}/billing/cancel`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(
          "Your subscription will be cancelled at the end of the current billing period. You will be able to use the workspace until the end of the current billing period."
        );
        console.log({ data });
      } else {
        const { error } = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      alert("Failed to cancel subscription. Please try again.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="size-4 shrink-0 animate-spin" />
          ) : (
            <MoreHorizontal className="size-4 shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0">
        <Command tabIndex={0} loop className="pointer-events-auto">
          <CommandList className="flex w-screen flex-col gap-1 p-1.5 text-sm focus-visible:outline-none sm:w-auto">
            <MenuItem
              disabled={isLoading}
              onSelect={handleManageSubscription}
              icon={CreditCard}
              label="Manage Subscription"
            />
            <MenuItem
              disabled={isLoading}
              onSelect={handleCancelSubscription}
              icon={SquareXIcon}
              label="Cancel Subscription"
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function MenuItem({
  icon: IconComp,
  label,
  onSelect,
  disabled,
}: {
  icon: LucideIcon;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <Command.Item
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-md p-2 text-sm text-neutral-600",
        "data-[selected=true]:bg-neutral-100",
        disabled && "cursor-not-allowed opacity-50"
      )}
      onSelect={onSelect}
      disabled={disabled}
    >
      <IconComp className="size-4 shrink-0 text-neutral-700" />
      {label}
    </Command.Item>
  );
}

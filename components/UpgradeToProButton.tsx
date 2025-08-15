"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useUpgradeToProModal } from "@/lib/stores/modal-store";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface UpgradeToProButtonProps
  extends Omit<ComponentProps<typeof Button>, "variant" | "onClick"> {
  variant?: "default" | "gradient";
  size?: "default" | "sm" | "lg";
}

export default function UpgradeToProButton({
  className,
  children,
  variant = "gradient",
  size = "default",
  ...buttonProps
}: UpgradeToProButtonProps) {
  const { setShow } = useUpgradeToProModal();

  const handleClick = () => {
    setShow(true);
  };

  const baseClasses = cn(
    "font-medium transition-all duration-200 flex items-center gap-2",
    {
      "bg-gradient-to-r from-blue-600 to-black hover:from-blue-700 hover:to-gray-900 text-white shadow-lg":
        variant === "gradient",
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-2": size === "default",
      "px-8 py-3": size === "lg",
    }
  );

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      className={cn(baseClasses, className)}
      variant={variant === "gradient" ? "default" : "default"}
    >
      <Sparkles className="w-4 h-4" />
      {children || "Upgrade to Pro"}
    </Button>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LiftedTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export interface LiftedTabsListProps {
  children: React.ReactNode;
  className?: string;
}

export interface LiftedTabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface LiftedTabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const LiftedTabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

export function LiftedTabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: LiftedTabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  return (
    <LiftedTabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
      }}
    >
      <div className={cn("w-full", className)}>{children}</div>
    </LiftedTabsContext.Provider>
  );
}

export function LiftedTabsList({ children, className }: LiftedTabsListProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-0 bg-gray-50/80 border-b border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export function LiftedTabsTrigger({
  value,
  children,
  className,
  disabled = false,
}: LiftedTabsTriggerProps) {
  const context = React.useContext(LiftedTabsContext);
  if (!context) {
    throw new Error("LiftedTabsTrigger must be used within LiftedTabs");
  }

  const { value: selectedValue, onValueChange } = context;
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isSelected
          ? [
              // Active state - lifted appearance (like the image)
              "bg-white text-gray-900 border-l border-r border-t border-gray-200",
              "rounded-t-lg shadow-sm",
              "relative z-10", // Above other tabs
              "transform translate-y-0",
            ]
          : [
              // Inactive state - subtle and clean
              "text-gray-600 hover:text-gray-900",
              "hover:bg-white/60",
              "border border-transparent",
              "rounded-t-lg",
            ],
        className
      )}
    >
      {children}
    </button>
  );
}

export function LiftedTabsContent({
  value,
  children,
  className,
}: LiftedTabsContentProps) {
  const context = React.useContext(LiftedTabsContext);
  if (!context) {
    throw new Error("LiftedTabsContent must be used within LiftedTabs");
  }

  const { value: selectedValue } = context;
  const isSelected = selectedValue === value;

  if (!isSelected) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-white border border-gray-200 border-t-0 rounded-b-lg shadow-sm",
        "px-6 py-6",
        "animate-in fade-in-0 slide-in-from-top-1 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
const frameworks = [
  {
    value: "next.js",
    label: "Next.js"
  },
  {
    value: "sveltekit",
    label: "SvelteKit"
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js"
  },
  {
    value: "remix",
    label: "Remix"
  },
  {
    value: "astro",
    label: "Astro"
  }
];

type ComboboxProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  caret?: boolean | React.ReactNode;
  matchTriggerWidth?: boolean;
  buttonProps?: ButtonProps;
  shouldFilter?: boolean;
}>;

export function Combobox({
  open,
  onOpenChange,
  caret,
  matchTriggerWidth,
  buttonProps,
  shouldFilter = false,
  children
}: ComboboxProps) {
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          {...buttonProps}
          variant="ghost"
          aria-expanded={open}
          className={cn("w-full justify-between", buttonProps?.className)}
        >
          <div className="min-w-0 grow truncate text-left">{children}</div>
          {caret && caret === true ? (
            <ChevronsUpDown className="opacity-50" />
          ) : (
            caret
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-full p-0", {
          "sm:w-[var(--radix-popover-trigger-width)]": matchTriggerWidth
        })}
      >
        <Command loop shouldFilter={shouldFilter}>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onOpenChange?.(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

"use client";
import * as React from "react";
import { Check, ChevronsUpDown, type LucideIcon } from "lucide-react";
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
import type { ReactNode } from "react";

export type ComboboxOption<TMeta = unknown> = {
  label: string | ReactNode;
  value: string;
  icon?:
    | LucideIcon
    | ReactNode
    | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabledTooltip?: ReactNode;
  meta?: TMeta;
  separatorAfter?: boolean;
  first?: boolean;
};

type ComboboxProps<
  TMultiple extends boolean | undefined,
  TMeta
> = React.PropsWithChildren<{
  multiple?: TMultiple;
  selected: TMultiple extends true
    ? ComboboxOption<TMeta>[]
    : ComboboxOption<TMeta> | null;
  setSelected: TMultiple extends true
    ? (value: ComboboxOption<TMeta>[]) => void
    : (value: ComboboxOption<TMeta> | null) => void;
  options: ComboboxOption<TMeta>[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  searchPlaceholder?: string;
  placeholder?: string;
  caret?: boolean | React.ReactNode;
  matchTriggerWidth?: boolean;
  buttonProps?: ButtonProps;
  shouldFilter?: boolean;
  hideSearch?: boolean;
}>;

export function Combobox({
  multiple,
  selected,
  setSelected,
  options,
  open,
  onOpenChange,
  searchPlaceholder = "Search...",
  placeholder = "Select...",
  caret,
  matchTriggerWidth,
  buttonProps,
  shouldFilter = false,
  hideSearch = false,
  children
}: ComboboxProps<boolean | undefined, unknown>) {
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [shouldSortOptions, setShouldSortOptions] = React.useState(false);
  const [sortedOptions, setSortedOptions] = React.useState<
    ComboboxOption[] | undefined
  >(undefined);

  // Convert selected to array for consistent handling
  const selectedArray = Array.isArray(selected)
    ? selected
    : selected
      ? [selected]
      : [];

  console.log({ selectedArray });
  const sortOptions = React.useCallback(
    (options: ComboboxOption[], search: string) => {
      if (search !== "") {
        return options;
      }

      return [
        ...options.filter(
          (option) =>
            option.first && !selectedArray.some((s) => s.value === option.value)
        ),
        ...selectedArray,
        ...options.filter(
          (option) =>
            !option.first &&
            !selectedArray.some((s) => s.value === option.value)
        )
      ];
    },
    [selectedArray]
  );

  // Actually sort the options when needed
  React.useEffect(() => {
    if (shouldSortOptions) {
      setSortedOptions(options ? sortOptions(options, search) : options);
      setShouldSortOptions(false);
    }
  }, [shouldSortOptions, options, sortOptions, search]);

  // Sort options when the options prop changes
  React.useEffect(() => {
    setShouldSortOptions(true);
  }, [options]);

  // Reset search and sort options when the popover closes
  React.useEffect(() => {
    if (open) return;

    setSearch("");
    setShouldSortOptions(true);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          {...buttonProps}
          variant="ghost"
          aria-expanded={open}
          className={cn("w-full justify-between", buttonProps?.className)}
        >
          <div className="min-w-0 grow truncate text-left">
            {children ||
              (Array.isArray(selected)
                ? selected.map((option) => option.label).join(", ")
                : selected?.label) ||
              placeholder}
          </div>
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
          {!hideSearch && (
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
              className="h-9"
            />
          )}
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup>
              {sortedOptions?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label + option.value}
                  onSelect={(currentValue) => {
                    const selectedOption = options.find(
                      (opt) =>
                        opt.value === currentValue ||
                        currentValue.includes(opt.value)
                    );
                    if (selectedOption) {
                      if (multiple) {
                        // Handle multiple selection
                        const currentSelected = Array.isArray(selected)
                          ? selected
                          : [];
                        const isAlreadySelected = currentSelected.some(
                          (s) => s.value === selectedOption.value
                        );
                        const newSelected = isAlreadySelected
                          ? currentSelected.filter(
                              (s) => s.value !== selectedOption.value
                            )
                          : [...currentSelected, selectedOption];
                        (setSelected as (value: ComboboxOption[]) => void)(
                          newSelected
                        );
                      } else {
                        // Handle single selection
                        (setSelected as (value: ComboboxOption | null) => void)(
                          selectedOption
                        );
                      }
                    }
                    setValue(currentValue === value ? "" : currentValue);
                    onOpenChange?.(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
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

import { Command } from "cmdk";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { CheckIcon, ChevronDownIcon, FilterIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  forwardRef,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type {
  ComponentType,
  PropsWithChildren,
  ReactNode,
  RefObject,
  SVGProps,
} from "react";
import { cn } from "@/lib/utils";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { truncate } from "@/utils/functions/truncate";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export type FilterOption = {
  value: string | number | boolean;
  label: string;
  right?: ReactNode;
  icon?: LucideIcon | ReactNode | ComponentType<SVGProps<SVGSVGElement>>;
  hideDuringSearch?: boolean;
  data?: Record<string, unknown>;
};

export type Filter = {
  key: string;
  icon: LucideIcon | ReactNode | ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  separatorAfter?: boolean;
  options: FilterOption[] | null;
  multiple?: boolean;
};

function FilterSelect({
  filters,
  activeFilters,
  children,
  className,
  onSelect,
  onRemove,
}: {
  filters: Filter[];
  activeFilters?: {
    key: Filter["key"];
    value: FilterOption["value"];
  }[];
  children?: React.ReactNode;
  className?: string;
  onSelect: (key: string, value: FilterOption["value"]) => void;
  onRemove: (key: string, value: FilterOption["value"]) => void;
}) {
  // Track main list container/dimensions to maintain size for loading spinner
  const listContainer = useRef<HTMLDivElement>(null);
  const listDimensions = useRef<
    | {
        width: number;
        height: number;
      }
    | undefined
  >(undefined);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFilterKey, setSelectedFilterKey] = useState<
    Filter["key"] | null
  >(null);

  useKeyboardShortcut(
    "f",
    () => {
      setIsOpen(true);
    },
    {
      enabled: !isOpen,
    }
  );
  const reset = useCallback(() => {
    setSearch("");
    setSelectedFilterKey(null);
  }, []);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const selectedFilter = selectedFilterKey
    ? filters.find(({ key }) => key === selectedFilterKey)
    : null;

  const isOptionSelected = useCallback(
    (value: FilterOption["value"]) => {
      if (!selectedFilter || !activeFilters) return false;

      return activeFilters.some(
        (filter) => filter.key === selectedFilterKey && filter.value === value
      );
    },
    [selectedFilter, activeFilters, selectedFilterKey]
  );

  const selectOption = useCallback(
    (value: FilterOption["value"]) => {
      if (selectedFilter) {
        const isSelected = isOptionSelected(value);

        if (isSelected) {
          onRemove(selectedFilter.key, value);
        } else {
          onSelect(selectedFilter.key, value);
        }

        if (!selectedFilter.multiple) setIsOpen(false);
      }
    },
    [selectedFilter, isOptionSelected, onSelect, onRemove]
  );

  const openFilter = useCallback((key: Filter["key"]) => {
    // Maintain dimensions for loading options
    if (listContainer.current) {
      listDimensions.current = {
        width: listContainer.current.clientWidth,
        height: listContainer.current.clientHeight,
      };
    }

    setSearch("");
    setSelectedFilterKey(key);
    // onOpenFilter?.(key);
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "group flex h-10 items-center cursor-pointer appearance-none gap-x-2 rounded-md border px-3 text-sm outline-none transition-all",
            "border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400",
            "focus-visible:border-neutral-500 data-[state=open]:border-neutral-500 data-[state=open]:ring-4 data-[state=open]:ring-neutral-200",
            className
          )}
        >
          <FilterIcon className="size-4" />
          <span className="whitespace-nowrap">{children ?? "Filter"}</span>
          {(activeFilters?.length ?? 0) > 0 ? (
            <div className="flex items-center justify-center size-4 shrink-0 rounded-full bg-black text-white text-[0.625rem]">
              {activeFilters?.length}
            </div>
          ) : (
            <ChevronDownIcon className="size-4 shrink-0 text-neutral-400 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-0 w-52"
        onEscapeKeyDown={(e) => {
          if (selectedFilterKey) {
            e.preventDefault();
            reset();
          }
        }}
      >
        <Command loop shouldFilter={!selectedFilter}>
          <div className="flex items-center justify-between border-b border-neutral-200 rounded-t-lg overflow-hidden">
            <CommandInput
              placeholder={`${selectedFilter?.label || "Filter"}...`}
              value={search}
              onValueChange={setSearch}
              onKeyDown={(e) => {
                if (e.key === "Escape" || (e.key === "Backspace" && !search)) {
                  e.preventDefault();
                  e.stopPropagation();

                  if (selectedFilterKey) {
                    reset();
                  } else {
                    setIsOpen(false);
                  }
                }
              }}
            />
            {!selectedFilter && (
              <kbd className="mr-2 hidden shrink-0 rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs font-light text-neutral-500 md:block">
                F
              </kbd>
            )}
          </div>
          <FilterScroll key={selectedFilterKey} ref={listContainer}>
            <Command.List className={cn("flex w-full flex-col gap-1 p-1")}>
              {!selectedFilter ? (
                filters.map((filter) => (
                  <Command.Group key={filter.key}>
                    <div className="flex items-center gap-2">
                      <CommandItem
                        filter={filter}
                        onSelect={() => {
                          openFilter(filter.key);
                        }}
                      />
                      {filter.separatorAfter && (
                        <Command.Separator className="-mx-1 my-1 border-b border-neutral-200" />
                      )}
                    </div>
                  </Command.Group>
                ))
              ) : selectedFilter.options ? (
                <Command.Group>
                  {selectedFilter.options
                    .filter((option) => {
                      if (option.hideDuringSearch) return false;
                      if (!search) return true;
                      return option.label
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    })
                    .map((option) => {
                      const isSelected = isOptionSelected(option.value);

                      return (
                        <CommandItem
                          key={option.label}
                          filter={selectedFilter}
                          option={option}
                          right={
                            isSelected ? (
                              <CheckIcon className="h-4 w-4" />
                            ) : (
                              option.right
                            )
                          }
                          onSelect={() => selectOption(option.value)}
                        />
                      );
                    })}
                </Command.Group>
              ) : (
                <Command.Loading>
                  <div
                    className="-m-1 flex items-center justify-center"
                    style={listDimensions.current}
                  >
                    spinner
                  </div>
                </Command.Loading>
              )}

              {(!selectedFilter || selectedFilter.options) && (
                <Command.Empty>
                  <div className="flex h-full w-full items-center justify-center p-4 text-sm text-neutral-500">
                    No results found.
                  </div>
                </Command.Empty>
              )}
            </Command.List>
          </FilterScroll>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const FilterScroll = forwardRef(
  ({ children }: PropsWithChildren, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current);

    const { scrollProgress, updateScrollProgress } = useScrollProgress(
      ref as RefObject<HTMLElement>
    );

    return (
      <>
        <div
          className="scrollbar-hide max-h-[30vh] w-screen overflow-y-scroll sm:w-auto"
          ref={ref}
          onScroll={updateScrollProgress}
        >
          {children}
        </div>
        {/* Bottom scroll fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 hidden h-16 w-full bg-gradient-to-t from-white sm:block"
          style={{ opacity: 1 - scrollProgress ** 2 }}
        />
      </>
    );
  }
);

FilterScroll.displayName = "FilterScroll";

const CommandInput = (
  props: React.ComponentProps<typeof Command.Input> & {}
) => {
  return (
    <Command.Input
      {...props}
      size={1}
      className={cn(
        "grow outline-none border-0 py-3 pl-4 pr-2 text-sm placeholder:text-neutral-400 focus:ring-0",
        props.className
      )}
      autoCapitalize="none"
    />
  );
};

const CommandItem = ({
  filter,
  option,
  right,
  onSelect,
}: {
  filter: Filter;
  option?: FilterOption;
  right?: ReactNode;
  onSelect: () => void;
}) => {
  const Icon = option ? option.icon ?? filter.icon : filter.icon;

  const label = option ? option.label ?? filter.label : filter.label;

  return (
    <Command.Item
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm",
        "data-[selected=true]:bg-neutral-100"
      )}
      onSelect={onSelect}
    >
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-neutral-600">
          {isReactNode(Icon) ? Icon : <Icon className="h-4 w-4" />}
        </span>
        {truncate(label, 48)}
        <div className="ml-1 flex shrink-0 grow justify-end text-neutral-500">
          {right}
        </div>
      </div>
    </Command.Item>
  );
};

const isReactNode = (element: unknown): element is ReactNode =>
  isValidElement(element);

export { FilterSelect };

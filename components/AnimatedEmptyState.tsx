import { cn } from "@/lib/utils";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

type AnimatedEmptyStateProps = {
  title: string;
  description: string;
  className?: string;
  addButton?: ReactNode;
  cardContent: ReactNode | ((index: number) => ReactNode);
};

export default function AnimatedEmptyState({
  title,
  description,
  className,
  addButton,
  cardContent
}: AnimatedEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 rounded-lg border border-gray-200 md:min-h-[500px] px-4 py-10",
        className
      )}
    >
      <div className="animate-fade-in h-36 w-full max-w-64 px-4 [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)]">
        <div
          style={{ "--scroll": "-50%" } as CSSProperties}
          className="animate-infinite-scroll-y flex flex-col [animation-duration:10s]"
        >
          {[...Array(6)].map((_, idx) => (
            <Card key={idx}>
              {typeof cardContent === "function"
                ? cardContent(idx % 3)
                : cardContent}
            </Card>
          ))}
        </div>
      </div>
      <div className="max-w-xs text-pretty text-center">
        <span className="text-base font-medium text-neutral-900">{title}</span>
        <p className="mt-2 text-pretty text-sm text-neutral-500">
          {description}
        </p>
      </div>
      {addButton}
    </div>
  );
}

function Card({ children }: PropsWithChildren) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-[0_4px_12px_0_#0000000D]">
      {children}
    </div>
  );
}

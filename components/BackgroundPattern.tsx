import { cn } from "@/lib/utils";

type BackgroundPatternProps = {
  className?: string;
};

export default function BackgroundPattern({
  className,
}: BackgroundPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full overflow-hidden bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px]",
        className
      )}
    >
      <div className="absolute h-[500px] w-[500px] translate-x-[20%] translate-y-[50%] rounded-full bg-[rgba(109,125,244,0.5)] opacity-30 blur-[90px]" />
      <div className="absolute h-[500px] w-[500px] translate-x-[80%] translate-y-[10%] rounded-full bg-[rgba(109,244,228,0.5)] opacity-30 blur-[90px]" />
      <div className="absolute h-[500px] w-[500px] translate-x-[10%] translate-y-[10%] rounded-full bg-[rgba(244,109,244,0.5)] opacity-30 blur-[90px]" />
    </div>
  );
}

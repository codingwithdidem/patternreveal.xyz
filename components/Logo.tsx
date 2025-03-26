import { LogoIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};
export default function Logo({ className }: LogoProps) {
  return <LogoIcon className={cn("w-36 h-auto", className)} />;
}

import { LogoIcon } from "@/components/icons";
import Link from "next/link";

type LogoProps = {
  className?: string;
};
export default function Logo({ className }: LogoProps) {
  return (
    <Link href={"/"} className={className}>
      <LogoIcon className="w-36 h-auto" />
    </Link>
  );
}

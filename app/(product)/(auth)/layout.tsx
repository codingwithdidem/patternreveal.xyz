import BackgroundPattern from "@/components/BackgroundPattern";
import Logo from "@/components/Logo";

export default async function Layout({
  children
}: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <BackgroundPattern />
      <div className="relative flex min-h-screen w-full justify-center">
        <Logo className="absolute left-4 top-3 z-10" />
        <div className="grid grid-cols-5 w-full">
          <div className="col-span-3">{children}</div>
          <div className="col-span-2 bg-red-400" />
        </div>
      </div>
    </div>
  );
}

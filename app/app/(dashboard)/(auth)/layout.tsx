import Logo from "@/components/Logo";
import BackgroundPattern from "@/components/BackgroundPattern";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <BackgroundPattern />
      <div className="relative flex h-full w-full justify-center">
        <Logo className="absolute left-4 top-3 z-10" />
        <div className="grid grid-cols-5 w-full">
          <div className="col-span-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

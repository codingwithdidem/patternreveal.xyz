import { BackgroundBeams } from "@/components/BackgroundBeams";

export default function OnboardingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      {children}
      <BackgroundBeams />
    </div>
  );
}

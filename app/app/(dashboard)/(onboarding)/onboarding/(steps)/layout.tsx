import Logo from "@/components/Logo";

export default function OnboardingStepLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative flex flex-col items-center z-20 text-white">
        <Logo />
        <div className="mt-8 flex w-full flex-col items-center px-3 pb-16 md:mt-10 lg:px-8">
          {children}
        </div>
      </div>
    </>
  );
}

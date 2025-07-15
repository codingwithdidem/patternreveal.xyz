import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Link from "next/link";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Page Not Found (404) - PatternReveal",
  description:
    "The page you're looking for doesn't exist. Return to PatternReveal to continue your relationship analysis journey.",
  noIndex: true
});

export default function NotFound() {
  return (
    <div className="relative size-[600px] w-screen h-screen overflow-hidden">
      <FlickeringGrid
        className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={2800}
        width={2800}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col space-y-4">
          <h1 className="text-6xl font-bold">404</h1>
          <Link
            href="/"
            className="flex h-9 w-fit items-center justify-center rounded-md border border-black bg-black px-4 text-sm text-white hover:bg-neutral-800"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

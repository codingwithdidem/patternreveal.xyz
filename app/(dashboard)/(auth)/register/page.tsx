import RegisterFlow from "@/components/RegisterFlow";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Create your patternreveal.xyz account",
  canonicalUrl: "https://patternreveal.xyz/register"
});

export default function RegisterPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-[family-name:var(--font-satoshi)]">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
        <RegisterFlow />
      </div>
    </div>
  );
}

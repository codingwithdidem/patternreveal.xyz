import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Sign in to patternreveal.xyz",
  canonicalUrl: "https://patternreveal.xyz/login"
});

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-[family-name:var(--font-satoshi)]">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold">Welcome Back</h1>
          <h3 className="text-sm text-gray-500">
            {`Don't have an account yet?`}
            <Link
              href="/register"
              className="ml-1 underline-offset-2 underline font-semibold hover:text-blue-500 transition-colors duration-400"
            >
              Sign up
            </Link>
          </h3>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

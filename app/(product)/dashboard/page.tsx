import { getSession } from "@/lib/auth/authOptions";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  gap-16 font-[family-name:var(--font-satoshi)]">
      Get started {session?.user?.name}
    </div>
  );
}

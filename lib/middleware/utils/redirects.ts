import { RESERVED_SLUGS } from "@/lib/constants/reserved-slugs";

export const DEFAULT_REDIRECTS: Record<string, string> = {
  "/app/onboarding": "/app/onboarding/welcome",
};

export const redirect = (path: string) => {
  if (DEFAULT_REDIRECTS[path]) {
    return DEFAULT_REDIRECTS[path];
  }

  // Redirect '/[slug]' to '/[slug]/reflections'
  const rootRegex = /^\/([^\/]+)$/;
  if (rootRegex.test(path) && !RESERVED_SLUGS.includes(path.split("/")[1]))
    return path.replace(rootRegex, "/$1/reflections");

  return null;
};

import { mutate } from "swr";

export const mutatePrefix = (prefix: string | string[]) =>
  mutate(
    (key) =>
      typeof key === "string" &&
      (Array.isArray(prefix)
        ? prefix.some((p) => key.startsWith(p))
        : key.startsWith(prefix)),
    undefined,
    { revalidate: true }
  );

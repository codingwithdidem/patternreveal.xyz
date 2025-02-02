import type { NextRequest } from "next/server";

export const parse = (req: NextRequest) => {
  const domain = req.headers.get("host") || "localhost";

  const path = req.nextUrl.pathname;

  const searchParamsString = new URLSearchParams(
    req.nextUrl.searchParams
  ).toString();
  const fullPath = searchParamsString ? `${path}?${searchParamsString}` : path;

  return {
    domain,
    path,
    fullPath,
    searchParamsString
  };
};

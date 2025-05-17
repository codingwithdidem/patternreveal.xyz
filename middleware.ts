import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "./lib/middleware/parse";
import { getUserViaToken } from "./lib/middleware/utils/get-user-via-token";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|public|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};

export default async function middleware(request: NextRequest) {
  const { domain, path, fullPath, searchParamsString } = parse(request);

  const user = await getUserViaToken(request);

  if (
    !user &&
    !path.startsWith("/login") &&
    !path.startsWith("/register") &&
    !path.startsWith("/forgot-password") &&
    !path.startsWith("/reset-password") &&
    !path.startsWith("/api")
  ) {
    return NextResponse.redirect(
      new URL(
        `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
        request.url
      )
    );
  } else if (user) {
    if (
      [
        "/",
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password"
      ].includes(path)
    )
      return NextResponse.redirect(
        new URL("/dashboard/reflections", request.url)
      );
  }

  return NextResponse.next();
}

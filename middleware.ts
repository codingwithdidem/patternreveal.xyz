import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { parse } from "./lib/middleware/parse";
import { getUserViaToken } from "./lib/middleware/utils/get-user-via-token";
import { getDefaultWorkspace } from "./lib/middleware/utils/get-default-workspace";
import { getOnboardingStep } from "./lib/middleware/utils/get-onboarding-step";
import { redirect } from "./lib/middleware/utils/redirects";
import WorkspacesMiddleware from "./lib/middleware/workspaces";
import AxiomMiddleware from "./lib/middleware/axiom";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|public|favicon.ico|sitemap.xml|robots.txt|monitoring).*)",
  ],
};

export default async function middleware(
  request: NextRequest,
  ev: NextFetchEvent
) {
  const { path, fullPath, searchParamsString } = parse(request);

  AxiomMiddleware(request, ev);

  const user = await getUserViaToken(request);

  // Allow access to the landing page without authentication
  if (path === "/") {
    return NextResponse.next();
  }

  // Handle direct workspace URLs without /app prefix (for unauthenticated users)
  // e.g., /mom/reflections -> /app/mom/reflections (which will then redirect to login)
  const workspacePattern =
    /^\/([^\/]+)\/(reflections|analytics|settings|reports)(?:\/.*)?$/;
  if (workspacePattern.test(path)) {
    return NextResponse.redirect(new URL(`/app${fullPath}`, request.url));
  }

  // Check if the path is under /app (protected routes)
  if (path.startsWith("/app")) {
    if (
      !user &&
      !path.startsWith("/app/login") &&
      !path.startsWith("/app/register") &&
      !path.startsWith("/app/forgot-password") &&
      !path.startsWith("/app/reset-password")
    ) {
      return NextResponse.redirect(
        new URL(
          `/app/login${
            path === "/app" ? "" : `?next=${encodeURIComponent(fullPath)}`
          }`,
          request.url
        )
      );
    }
  }

  if (user) {
    /**
     * Onboarding flow
     * If the user is created in the last 24 hours, and has no default workspace,
     * and has not completed the onboarding flow, redirect to the onboarding flow
     *
     * If the user has a default workspace, redirect to the onboarding flow
     *
     * If the user has completed the onboarding flow, redirect to the dashboard
     *
     */

    const isUserCreatedInLast24Hours =
      new Date(user.createdAt).getTime() > Date.now() - 60 * 60 * 24 * 1000;
    const defaultWorkspace = await getDefaultWorkspace(user);
    let onboardingStep = await getOnboardingStep(user);

    if (
      isUserCreatedInLast24Hours &&
      !path.startsWith("/app/onboarding") &&
      !defaultWorkspace &&
      onboardingStep !== "complete"
    ) {
      if (!onboardingStep) {
        return NextResponse.redirect(new URL("/app/onboarding", request.url));
      }

      if (defaultWorkspace) {
        onboardingStep =
          onboardingStep === "workspace" ? "reflection" : onboardingStep;
        return NextResponse.redirect(
          new URL(
            `/app/onboarding/${onboardingStep}?workspace=${defaultWorkspace}`,
            request.url
          )
        );
      }

      return NextResponse.redirect(new URL("/app/onboarding", request.url));
    }

    if (
      [
        "/app",
        "/app/login",
        "/app/register",
        "/app/refletions",
        "/app/settings",
      ].includes(path)
    )
      return WorkspacesMiddleware(request, user);

    if (redirect(path)) {
      return NextResponse.redirect(
        new URL(`${redirect(path)}${searchParamsString}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

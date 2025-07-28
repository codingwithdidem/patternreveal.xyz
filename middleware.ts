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
    "/((?!api|_next/static|_next/image|public|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default async function middleware(
  request: NextRequest,
  ev: NextFetchEvent
) {
  const { path, fullPath, searchParamsString } = parse(request);

  AxiomMiddleware(request, ev);

  const user = await getUserViaToken(request);

  if (
    !user &&
    !path.startsWith("/login") &&
    !path.startsWith("/register") &&
    !path.startsWith("/forgot-password") &&
    !path.startsWith("/reset-password")
  ) {
    return NextResponse.redirect(
      new URL(
        `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
        request.url
      )
    );
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
      !path.startsWith("/onboarding") &&
      !defaultWorkspace &&
      onboardingStep !== "complete"
    ) {
      if (!onboardingStep) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }

      if (defaultWorkspace) {
        onboardingStep =
          onboardingStep === "workspace" ? "reflection" : onboardingStep;
        return NextResponse.redirect(
          new URL(
            `/onboarding/${onboardingStep}?workspace=${defaultWorkspace}`,
            request.url
          )
        );
      }

      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (["/", "/login", "/register", "/refletions", "/settings"].includes(path))
      return WorkspacesMiddleware(request, user);

    if (redirect(path)) {
      return NextResponse.redirect(
        new URL(`${redirect(path)}${searchParamsString}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

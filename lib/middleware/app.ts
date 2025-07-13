import { NextResponse, type NextRequest } from "next/server";
import { parse } from "./parse";
import { AUTH_ROUTES } from "../constants";
import { getUserViaToken } from "./utils/get-user-via-token";

export default async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req);

  const user = await getUserViaToken(req);

  // If the path is not an auth route and the user is not logged in, redirect to the login page
  if (!AUTH_ROUTES.has(path) && !user) {
    return NextResponse.redirect(
      new URL(
        `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
        req.url
      )
    );
  }

  if ((user && path === "/login") || path === "/register") {
    // If the user is logged in and tries to access the login or register page, redirect to the dashboard
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

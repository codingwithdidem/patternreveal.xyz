import { NextResponse, type NextRequest } from "next/server";
import type { UserProps } from "../types";
import { parse } from "@/lib/middleware/parse";
import { getDefaultWorkspace } from "./utils/get-default-workspace";

export default async function WorkspacesMiddleware(
  request: NextRequest,
  user: UserProps
) {
  const { path, searchParamsObj, searchParamsString } = parse(request);

  // Special case to handle ?next=...
  if (searchParamsObj.next?.startsWith("/")) {
    return NextResponse.redirect(new URL(searchParamsObj.next, request.url));
  }

  const defaultWorkspace = await getDefaultWorkspace(user);

  if (!defaultWorkspace) {
    return NextResponse.redirect(new URL("/onboarding/workspace", request.url));
  }

  return NextResponse.redirect(
    new URL(
      `/${defaultWorkspace}/reflections${searchParamsString}`,
      request.url
    )
  );
}

import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { RESERVED_SLUGS } from "@/lib/constants/reserved-slugs";
import { NextResponse } from "next/server";
import { DEFAULT_REDIRECTS } from "@/lib/middleware/utils/redirects";

export const GET = withPermissions(async ({ params }) => {
  const { idOrSlug: slug } = params;

  if (RESERVED_SLUGS.includes(slug) || DEFAULT_REDIRECTS[slug]) {
    return NextResponse.json(1);
  }
  const workspace = await prisma.workspace.findUnique({
    where: {
      slug,
    },
    select: {
      slug: true,
    },
  });

  if (workspace) {
    return NextResponse.json(1);
  }

  return NextResponse.json(0);
});

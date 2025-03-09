import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): MetadataRoute.Robots {
  const headersList = await headers();
  const host = headersList.get("host");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/reports/",
    },
    sitemap: `https://${host}/sitemap.xml`,
  };
}

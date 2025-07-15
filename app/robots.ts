import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/register"],
        disallow: [
          "/*/reports/",
          "/*/settings/",
          "/*/reflections/",
          "/admin/",
          "/api/",
          "/onboarding/",
          "/confirm-email-change/"
        ]
      }
    ],
    sitemap: `https://${host}/sitemap.xml`
  };
}

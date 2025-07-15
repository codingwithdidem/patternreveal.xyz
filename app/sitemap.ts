import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://patternreveal.xyz";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${BASE_URL}/forgot-password`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${BASE_URL}/reset-password`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${BASE_URL}/verify-email`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];

  try {
    // Dynamic routes - Public reports that are indexed
    const publicReports = await prisma.report.findMany({
      where: {
        index: true, // Only include reports that should be indexed
        password: null // Only include non-password protected reports
      },
      select: {
        id: true,
        updatedAt: true
      },
      take: 1000 // Limit to prevent huge sitemaps
    });

    const publicReportRoutes: MetadataRoute.Sitemap = publicReports.map(
      (report) => ({
        url: `${BASE_URL}/public/report/${report.id}`,
        lastModified: report.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6
      })
    );

    // Shared reports (these might be public)
    const sharedReports = await prisma.report.findMany({
      where: {
        index: true, // Only include reports that should be indexed
        password: null, // Only include non-password protected reports
        linkId: { not: null } // Must have a link ID (shared)
      },
      select: {
        linkId: true,
        updatedAt: true
      },
      take: 500 // Limit to prevent huge sitemaps
    });

    const sharedReportRoutes: MetadataRoute.Sitemap = sharedReports
      .filter((report) => report.linkId)
      .map((report) => ({
        url: `${BASE_URL}/share/${report.linkId}`,
        lastModified: report.updatedAt,
        changeFrequency: "monthly",
        priority: 0.5
      }));

    return [...staticRoutes, ...publicReportRoutes, ...sharedReportRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return just static routes if database query fails
    return staticRoutes;
  }
}

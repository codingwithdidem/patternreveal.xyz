import type { Metadata } from "next";

type ConstructMetadataProps = {
  title?: string;
  fullTitle?: string;
  description?: string;
  noIndex?: boolean;
  image?: string;
  video?: string;
  url?: string;
  canonicalUrl?: string;
};

export function constructMetadata({
  title,
  fullTitle,
  description = "An AI-powered tool for analyzing your daily reflections with loved ones.",
  noIndex = false,
  image,
  video,
  url,
  canonicalUrl
}: ConstructMetadataProps): Metadata {
  return {
    metadataBase: new URL("https://patternreveal.xyz"),
    ...((url || canonicalUrl) && {
      canonical: url || canonicalUrl
    }),
    title:
      fullTitle ||
      (title
        ? `${title} | patternreveal.xyz`
        : "patternreveal.xyz - AI-powered reflections"),
    description,
    icons: {
      icon: "/favicon.ico"
    },
    openGraph: {
      title,
      description,
      url,
      ...(image && {
        images: [image]
      }),
      ...(video && {
        videos: [video]
      })
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image]
      }),
      ...(video && {
        player: video
      }),
      creator: "@patternreveal_xyz"
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };
}

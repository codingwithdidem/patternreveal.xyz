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
    metadataBase: new URL("https://manipulated.io"),
    ...((url || canonicalUrl) && {
      canonical: url || canonicalUrl
    }),
    title:
      fullTitle ||
      (title
        ? `${title} | Manipulated.io`
        : "Manipulated.io - AI-powered reflections"),
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
      creator: "@manipulated_io"
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };
}

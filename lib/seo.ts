import type { Metadata } from "next";

import { site, siteUrl } from "@/config/site";
import { localeTags, defaultLocale } from "@/config/i18n";

type PageMetaInput = {
  /** Page title without the brand suffix. Omit on the homepage. */
  title?: string;
  description: string;
  /** Route path, always starting with "/". Drives the canonical URL. */
  path: string;
  /** Set to false for pages that should not be indexed. */
  index?: boolean;
};

/**
 * Builds per-page metadata: canonical, Open Graph and Twitter cards.
 * `metadataBase` is declared once in the root layout, so relative image paths
 * resolve to absolute URLs automatically.
 */
export function buildMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/+$/, "");
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — Software pentru business-uri`;

  return {
    title: title ?? undefined,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeTags[defaultLocale].openGraph,
      url: canonical,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: index
      ? undefined
      : {
          index: false,
          follow: true,
        },
  };
}

/** Absolute URL for a route path. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

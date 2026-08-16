import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";
import { serviceSlugs } from "@/config/services";

/** Every indexable route, derived from the same config the navigation uses. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/servicii", priority: 0.9, changeFrequency: "monthly" },
    { path: "/proiecte", priority: 0.7, changeFrequency: "monthly" },
    { path: "/despre", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${siteUrl}/servicii/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

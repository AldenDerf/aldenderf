import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aldenderf.com/",
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

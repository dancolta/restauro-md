import type { MetadataRoute } from "next";

const BASE_URL = "https://restauro.md";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ro", "ru"] as const;
  const now = new Date();

  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/servicii/interior-auto", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/servicii/mobila", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/servicii/alte-servicii", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/portofoliu", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
        ),
      },
    }))
  );
}

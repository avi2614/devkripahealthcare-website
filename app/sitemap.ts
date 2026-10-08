import type { MetadataRoute } from "next";
import { site, treatmentGroups, treatmentHref, treatments } from "@/data/site";
import { sortedPosts } from "@/data/blog";

/** Bump when page content changes, so crawlers see a stable, meaningful lastModified. */
const contentUpdated = new Date("2026-10-08");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = sortedPosts();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: contentUpdated,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page(treatmentGroups.dental.path, 0.9),
    page(treatmentGroups.skin.path, 0.9),
    ...treatments.map((t) => page(treatmentHref(t.id), 0.8)),
    page("/treatments", 0.7),
    page("/doctor", 0.9),
    page("/book", 0.9),
    page("/contact", 0.8),
    page("/blog", 0.8, "weekly"),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [`${site.url}${p.image}`],
    })),
    page("/your-visit", 0.6),
    page("/clinic", 0.6),
    page("/gallery", 0.5),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}

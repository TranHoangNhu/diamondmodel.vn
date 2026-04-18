import type { MetadataRoute } from "next";
import { ALL_ARTICLES, SITE_BUILD_DATE_ISO, SITE_PAGES, SITE_URL } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = SITE_PAGES.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: SITE_BUILD_DATE_ISO,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = ALL_ARTICLES.map((article) => {
    const collectionPath = article.categoryHref === "/gioi-thieu" ? "/gioi-thieu" : article.categoryHref;
    const path = article.slug === "gioi-thieu" ? "/gioi-thieu" : `${collectionPath}/${article.slug}`;

    return {
      url: new URL(path, SITE_URL).toString(),
      lastModified: article.publishedAt,
      changeFrequency: "monthly",
      priority: article.categoryHref === "/gioi-thieu" ? 0.9 : 0.7,
    };
  });

  return [...staticEntries, ...articleEntries];
}

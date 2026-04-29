import {
  ABOUT_ARTICLE,
  NEWS_COLLECTION,
  PROJECT_COLLECTION,
  SERVICE_COLLECTION,
  SITE_BUILD_DATE_ISO,
  type ArchiveCollection,
  type ArticleItem,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/site-content";

type CollectionSlug = "gioi-thieu" | "du-an" | "dich-vu" | "tin-tuc";

type CmsListResponse<T> = {
  data?: T[];
};

type CmsCategory = {
  name?: string | null;
};

type CmsContentBase = {
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  heroImageUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  tags?: string[] | null;
  category?: CmsCategory | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
};

type CmsProject = CmsContentBase & {
  client?: string | null;
  location?: string | null;
  area?: string | null;
  scale?: string | null;
  materials?: string | null;
  completedAt?: string | null;
  gallery?: Array<{
    mediaUrl?: string | null;
    section?: "hero" | "gallery" | null;
    altText?: string | null;
  }> | null;
};

type CmsPage = {
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
};

const CMS_BASE_URL =
  process.env.CMS_API_URL ||
  process.env.NEXT_PUBLIC_CMS_API_URL ||
  "https://admin.minnam.asia";

const CMS_API_KEY =
  process.env.CMS_API_KEY ||
  process.env.NEXT_PUBLIC_CMS_API_KEY ||
  "";

const CMS_TIMEOUT_MS = 3500;

function cmsUrl(path: string) {
  return `${CMS_BASE_URL.replace(/\/$/, "")}${path}`;
}

async function cmsFetch<T>(path: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);

  try {
    const headers: HeadersInit = {};
    if (CMS_API_KEY) headers["x-api-key"] = CMS_API_KEY;

    const response = await fetch(cmsUrl(path), {
      headers,
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDisplayDate(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Đang cập nhật";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function estimateReadTime(html: string) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 220))} phút`;
}

function dateValue(item: CmsContentBase | CmsPage) {
  return ("publishedAt" in item ? item.publishedAt : null) || item.updatedAt || item.createdAt || SITE_BUILD_DATE_ISO;
}

function contentValue(item: CmsContentBase) {
  return item.content || item.description || "";
}

function projectHeroImage(item: CmsProject, fallback: string) {
  return (
    item.thumbnailUrl ||
    item.gallery?.find((galleryItem) => galleryItem.section === "hero" && galleryItem.mediaUrl)?.mediaUrl ||
    item.gallery?.find((galleryItem) => galleryItem.mediaUrl)?.mediaUrl ||
    fallback
  );
}

function toArticleItem(
  item: CmsContentBase | CmsProject,
  collection: Exclude<CollectionSlug, "gioi-thieu">,
  fallback: ArticleItem,
): ArticleItem {
  const content = contentValue(item);
  const publishedAt = dateValue(item);
  const summary = item.excerpt || item.seoDescription || stripHtml(content).slice(0, 180) || fallback.summary;
  const categoryHref = `/${collection}`;
  const categoryLabel = item.category?.name || fallback.categoryLabel;
  const heroImage =
    collection === "du-an"
      ? projectHeroImage(item as CmsProject, fallback.heroImage)
      : item.heroImageUrl || item.thumbnailUrl || fallback.heroImage;

  const meta =
    collection === "du-an"
      ? buildProjectMeta(item as CmsProject, categoryLabel, publishedAt)
      : [
          { label: "Chuyên mục", value: categoryLabel },
          { label: "Đăng ngày", value: formatDisplayDate(publishedAt) },
          { label: "Đọc", value: estimateReadTime(content || summary) },
        ];

  return {
    ...fallback,
    slug: item.slug || fallback.slug,
    categoryLabel,
    categoryHref,
    title: item.title || fallback.title,
    summary,
    heroImage,
    heroAlt: item.title || fallback.heroAlt,
    publishedAt,
    dateLabel: formatDisplayDate(publishedAt),
    readTime: estimateReadTime(content || summary),
    meta,
    tags: item.tags?.length ? item.tags : fallback.tags,
    contentHtml: content || fallback.contentHtml,
    sections: [{ id: "noi-dung", title: "Nội dung", paragraphs: [summary] }],
    relatedSlugs: fallback.relatedSlugs,
  };
}

function buildProjectMeta(item: CmsProject, categoryLabel: string, publishedAt: string) {
  const values = [
    { label: "Chuyên mục", value: categoryLabel },
    item.client ? { label: "Khách hàng", value: item.client } : null,
    item.location ? { label: "Địa điểm", value: item.location } : null,
    item.area ? { label: "Diện tích", value: item.area } : null,
    item.scale ? { label: "Tỷ lệ", value: item.scale } : null,
    item.materials ? { label: "Vật liệu", value: item.materials } : null,
    { label: "Cập nhật", value: formatDisplayDate(item.completedAt || publishedAt) },
  ];

  return values.filter((value): value is { label: string; value: string } => Boolean(value));
}

function fallbackCollection(collection: Exclude<CollectionSlug, "gioi-thieu">) {
  switch (collection) {
    case "du-an":
      return PROJECT_COLLECTION;
    case "dich-vu":
      return SERVICE_COLLECTION;
    case "tin-tuc":
      return NEWS_COLLECTION;
  }
}

function endpointForCollection(collection: Exclude<CollectionSlug, "gioi-thieu">) {
  switch (collection) {
    case "du-an":
      return "/api/public/projects";
    case "dich-vu":
      return "/api/public/services";
    case "tin-tuc":
      return "/api/public/articles";
  }
}

export async function getCmsCollection(
  collection: Exclude<CollectionSlug, "gioi-thieu">,
): Promise<ArchiveCollection> {
  const fallback = fallbackCollection(collection);
  const response = await cmsFetch<CmsListResponse<CmsContentBase | CmsProject>>(
    `${endpointForCollection(collection)}?limit=100`,
  );

  if (!response?.data?.length) return fallback;

  const items = response.data.map((item, index) =>
    toArticleItem(item, collection, fallback.items[index % fallback.items.length] || fallback.items[0]),
  );

  return {
    ...fallback,
    heroImage: items[0]?.heroImage || fallback.heroImage,
    heroAlt: items[0]?.heroAlt || fallback.heroAlt,
    featuredSlug: items[0]?.slug || fallback.featuredSlug,
    items,
  };
}

export async function getCmsArticleBySlug(
  collection: Exclude<CollectionSlug, "gioi-thieu">,
  slug: string,
): Promise<ArticleItem | null> {
  const fallback = getArticleBySlug(collection, slug);
  const response = await cmsFetch<CmsContentBase | CmsProject>(
    `${endpointForCollection(collection)}/${encodeURIComponent(slug)}`,
  );

  if (!response?.slug) return fallback;
  return toArticleItem(response, collection, fallback || fallbackCollection(collection).items[0]);
}

export async function getCmsAboutArticle(): Promise<ArticleItem> {
  const response = await cmsFetch<CmsPage>("/api/public/pages/gioi-thieu");
  if (!response?.slug) return ABOUT_ARTICLE;

  const publishedAt = dateValue(response);
  const content = response.content || "";
  const summary = response.seoDescription || stripHtml(content).slice(0, 180) || ABOUT_ARTICLE.summary;

  return {
    ...ABOUT_ARTICLE,
    slug: response.slug,
    title: response.title || ABOUT_ARTICLE.title,
    summary,
    heroImage: response.ogImage || ABOUT_ARTICLE.heroImage,
    heroAlt: response.title || ABOUT_ARTICLE.heroAlt,
    publishedAt,
    dateLabel: formatDisplayDate(publishedAt),
    readTime: estimateReadTime(content || summary),
    meta: [
      { label: "Chuyên mục", value: "Giới thiệu" },
      { label: "Cập nhật", value: formatDisplayDate(publishedAt) },
      { label: "Đọc", value: estimateReadTime(content || summary) },
    ],
    contentHtml: content || ABOUT_ARTICLE.contentHtml,
    sections: [{ id: "noi-dung", title: "Nội dung", paragraphs: [summary] }],
  };
}

export async function getCmsRelatedArticles(article: ArticleItem, collection?: Exclude<CollectionSlug, "gioi-thieu">) {
  if (!collection) return getRelatedArticles(article);

  const cmsCollection = await getCmsCollection(collection);
  const related = cmsCollection.items.filter((item) => item.slug !== article.slug).slice(0, 3);
  return related.length ? related : getRelatedArticles(article);
}

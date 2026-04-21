import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleJsonLd,
  ArticleLayout,
  BreadcrumbJsonLd,
} from "@/components/content/PageLayouts";
import {
  NEWS_ARTICLES,
  SITE_URL,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("tin-tuc", slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Tin tức Diamond Model`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Tin tức Diamond Model`,
      description: article.summary,
      url: `/tin-tuc/${article.slug}`,
      type: "article",
    },
  };
}

export default async function TinTucDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug("tin-tuc", slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: article.title, href: `/tin-tuc/${article.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd article={article} url={`/tin-tuc/${article.slug}`} />
      <ArticleLayout
        article={article}
        breadcrumbs={breadcrumbs}
        relatedItems={getRelatedArticles(article)}
        shareUrl={`${SITE_URL}/tin-tuc/${article.slug}`}
        ctaHref="/lien-he"
        ctaLabel="Đặt lịch tư vấn"
      />
    </>
  );
}

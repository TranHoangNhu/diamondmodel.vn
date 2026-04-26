import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleJsonLd,
  ArticleLayout,
  BreadcrumbJsonLd,
} from "@/components/content/PageLayouts";
import {
  PROJECT_ARTICLES,
  SITE_URL,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("du-an", slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Dự án Diamond Model`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Dự án Diamond Model`,
      description: article.summary,
      url: `/du-an/${article.slug}`,
      type: "article",
    },
  };
}

export default async function DuAnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug("du-an", slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Dự án", href: "/du-an" },
    { label: article.title, href: `/du-an/${article.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd article={article} url={`/du-an/${article.slug}`} />
      <ArticleLayout
        article={article}
        breadcrumbs={breadcrumbs}
        relatedItems={getRelatedArticles(article)}
        shareUrl={`${SITE_URL}/du-an/${article.slug}`}
        ctaHref="/lien-he"
        ctaLabel="Đặt lịch tư vấn"
      />
    </>
  );
}

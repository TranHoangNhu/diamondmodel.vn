import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleJsonLd,
  ArticleLayout,
  BreadcrumbJsonLd,
} from "@/components/content/PageLayouts";
import {
  SERVICE_ARTICLES,
  SITE_URL,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("dich-vu", slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Dịch vụ Diamond Model`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Dịch vụ Diamond Model`,
      description: article.summary,
      url: `/dich-vu/${article.slug}`,
      type: "article",
    },
  };
}

export default async function DichVuDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug("dich-vu", slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Dịch vụ", href: "/dich-vu" },
    { label: article.title, href: `/dich-vu/${article.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd article={article} url={`/dich-vu/${article.slug}`} />
      <ArticleLayout
        article={article}
        breadcrumbs={breadcrumbs}
        relatedItems={getRelatedArticles(article)}
        shareUrl={`${SITE_URL}/dich-vu/${article.slug}`}
        ctaHref="/lien-he"
        ctaLabel="Đặt lịch tư vấn"
      />
    </>
  );
}

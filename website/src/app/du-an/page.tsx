import type { Metadata } from "next";
import {
  CollectionJsonLd,
  ArchiveLayout,
  BreadcrumbJsonLd,
} from "@/components/content/PageLayouts";
import { getCmsCollection } from "@/lib/cms-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dự án | Diamond Model",
  description:
    "Danh mục dự án sa bàn và mô hình kiến trúc Diamond Model được trình bày theo dạng blog/portfolio với các card chi tiết, phù hợp cho SEO và điều hướng nội dung.",
  openGraph: {
    title: "Dự án | Diamond Model",
    description:
      "Danh mục dự án sa bàn và mô hình kiến trúc Diamond Model được trình bày theo dạng blog/portfolio với các card chi tiết, phù hợp cho SEO và điều hướng nội dung.",
    url: "/du-an",
    type: "website",
  },
};

export default async function DuAnPage() {
  const collection = await getCmsCollection("du-an");
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Dự án", href: "/du-an" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CollectionJsonLd collection={collection} url="/du-an" />
      <ArchiveLayout collection={collection} items={collection.items} breadcrumbs={breadcrumbs} />
    </>
  );
}


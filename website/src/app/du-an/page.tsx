import type { Metadata } from "next";
import {
  CollectionJsonLd,
  ArchiveLayout,
  BreadcrumbJsonLd,
} from "@/components/content/PageLayouts";
import { PROJECT_COLLECTION } from "@/lib/site-content";

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

export default function DuAnPage() {
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Dự án", href: "/du-an" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CollectionJsonLd collection={PROJECT_COLLECTION} url="/du-an" />
      <ArchiveLayout collection={PROJECT_COLLECTION} items={PROJECT_COLLECTION.items} breadcrumbs={breadcrumbs} />
    </>
  );
}


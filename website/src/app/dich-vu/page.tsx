import type { Metadata } from "next";
import {
  ArchiveLayout,
  BreadcrumbJsonLd,
  CollectionJsonLd,
} from "@/components/content/PageLayouts";
import { SERVICE_COLLECTION } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Dịch vụ | Diamond Model",
  description:
    "Danh mục dịch vụ Diamond Model gồm tư vấn, thiết kế, thi công và bảo hành, được trình bày theo dạng blog/portfolio rõ ràng.",
  openGraph: {
    title: "Dịch vụ | Diamond Model",
    description:
      "Danh mục dịch vụ Diamond Model gồm tư vấn, thiết kế, thi công và bảo hành, được trình bày theo dạng blog/portfolio rõ ràng.",
    url: "/dich-vu",
    type: "website",
  },
};

export default function DichVuPage() {
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Dịch vụ", href: "/dich-vu" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CollectionJsonLd collection={SERVICE_COLLECTION} url="/dich-vu" />
      <ArchiveLayout collection={SERVICE_COLLECTION} items={SERVICE_COLLECTION.items} breadcrumbs={breadcrumbs} />
    </>
  );
}


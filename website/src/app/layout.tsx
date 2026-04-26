import type { Metadata } from "next";
import localFont from "next/font/local";
import { Mulish } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const headingFont = localFont({
  src: [
    { path: "./fonts/svn-moneta/SVN-Moneta-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/svn-moneta/SVN-Moneta-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/svn-moneta/SVN-Moneta-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/svn-moneta/SVN-Moneta-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Mulish({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diamondmodel.vn"),
  title: "Diamond Model | Thiết kế và thi công nội thất",
  description:
    "Thiết kế và thi công nội thất Diamond Model mang những nét đẹp tinh tế và hoàn toàn mới lạ đến với không gian sống cho gia đình bạn.",
  keywords: [
    "diamond model",
    "thiết kế nội thất",
    "thi công nội thất",
    "diamondmodel.vn",
    "nội thất cao cấp",
  ],
  openGraph: {
    title: "Diamond Model | Thiết kế và thi công nội thất",
    description:
      "Thiết kế và thi công nội thất Diamond Model mang những nét đẹp tinh tế và hoàn toàn mới lạ đến với không gian sống cho gia đình bạn.",
    url: "https://diamondmodel.vn",
    siteName: "Diamond Model",
    images: [
      {
        url: "/diamond-vn/home/banner-lf.jpg",
        width: 1920,
        height: 1358,
        alt: "Diamond Model Decor",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}


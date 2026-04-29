import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bizweb.dktcdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "bizweb.dktcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "diamondmodel.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.diamondmodel.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.minnam.asia",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.looms.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.looms.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tinnhiemmang.vn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

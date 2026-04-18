import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "phogiadecor.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.phogiadecor.vn",
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

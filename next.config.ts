import type { NextConfig } from "next";

const MEDIA_BROWSER_CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";
const MEDIA_EDGE_CACHE_CONTROL =
  "public, s-maxage=31536000, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/site-images/**",
      },
      {
        pathname: "/plasmaster-logo.png",
      },
      {
        pathname: "/plasmaster-logo-hero.png",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/site-images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: MEDIA_BROWSER_CACHE_CONTROL,
          },
          {
            key: "CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
        ],
      },
      {
        source: "/frames/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: MEDIA_BROWSER_CACHE_CONTROL,
          },
          {
            key: "CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
        ],
      },
      {
        source: "/Industrial_animation_assembly.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: MEDIA_BROWSER_CACHE_CONTROL,
          },
          {
            key: "CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
        ],
      },
      {
        source: "/Industrial_animation_assembly_mobile.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: MEDIA_BROWSER_CACHE_CONTROL,
          },
          {
            key: "CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: MEDIA_EDGE_CACHE_CONTROL,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  outputFileTracingIncludes: {
    "/api/**/*": ["./lib/dictionary.db"],
  },
  async rewrites() {
    return [
      // Sitemap index: /sitemap.xml -> /sitemap
      {
        source: '/sitemap.xml',
        destination: '/sitemap',
      },
      // Individual sitemaps: /sitemap/0.xml -> /sitemap/0
      {
        source: '/sitemap/:id.xml',
        destination: '/sitemap/:id',
      },
    ];
  },
} as NextConfig;

export default nextConfig;

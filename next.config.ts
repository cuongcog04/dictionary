import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  outputFileTracingIncludes: {
    "/api/**/*": ["./lib/dictionary.db"],
  },
  async headers() {
    return [
      {
        source: '/word/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=31536000',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=31536000',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, 
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          { key: "Access-Control-Expose-Headers", value: "Content-Length, Content-Range" },
          { key: "Accept-Ranges", value: "bytes" }
        ]
      },
    ];
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

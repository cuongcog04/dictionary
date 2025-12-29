import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  experimental: {
    outputFileTracingIncludes: {
      "/api/**/*": ["./lib/dictionary.db"],
    },
  },
} as NextConfig;

export default nextConfig;

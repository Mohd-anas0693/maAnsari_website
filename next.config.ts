import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Pin the workspace root. Without this, Turbopack walks up the filesystem
   * looking for a lockfile and can settle on one outside the repository.
   */
  turbopack: {
    root: path.join(__dirname),
  },

  images: {
    /**
     * Next 16 coerces any `quality` prop to the nearest value in this list,
     * so every quality the site actually uses has to be declared.
     */
    qualities: [70, 75, 80, 90],
    formats: ["image/avif", "image/webp"],
    // No remote images: all photography is served from /public so it can be
    // versioned with the site and swapped without a deploy-time fetch.
    remotePatterns: [],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        // Generated imagery and the suit-construction layers are immutable
        // for the life of a deployment.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

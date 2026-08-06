import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  trailingSlash: false,

  // Emits a self-contained server bundle so the runtime Docker image does not
  // need node_modules. See Dockerfile.
  output: "standalone",

  images: {
    // AVIF first, WebP fallback. Next picks per Accept header.
    formats: ["image/avif", "image/webp"],
    // Trimmed from the defaults to the widths this layout actually requests,
    // so the optimizer generates fewer variants per source image.
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    // Rewrites barrel imports to deep paths so a single icon does not pull in
    // the whole package. Mantine is listed for the admin bundle; it will drop
    // off this list once the marketing side stops importing it.
    optimizePackageImports: [
      "@tabler/icons-react",
      "lucide-react",
      "@mantine/core",
      "@mantine/hooks",
    ],
  },

  async redirects() {
    return [
      // /our-work was the live, indexed portfolio route. /work replaced it at
      // the M7.2 cutover, so this preserves the inbound links and passes the
      // ranking signal on. 308 rather than 302: the move is permanent.
      { source: '/our-work', destination: '/work', permanent: true },
      {
        source: '/our-work/:path*',
        destination: '/work/:path*',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  nextConfig,
);

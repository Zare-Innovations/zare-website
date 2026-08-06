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

  // NOTE: the /our-work -> /work 308 redirect is deliberately NOT here yet.
  // /work does not exist and /our-work is live and indexed, so adding it now
  // would break a working page. It goes in with M4, in the same commit that
  // creates /work.
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  nextConfig,
);

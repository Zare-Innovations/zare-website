import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    matcher: [
    '/admin/:path*', // Only run middleware for admin routes
  ],
};

export default nextConfig;

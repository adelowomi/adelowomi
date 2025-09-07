import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      "docs.google.com",
    ],
  },
  eslint: {
    // Skip ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript type checking during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

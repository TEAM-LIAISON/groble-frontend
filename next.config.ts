import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://image.dev.groble.im/**")],
    domains: ["image.groble.im"],
  },
  experimental: {
    viewTransition: true,
    authInterrupts: true,
  },
};

export default nextConfig;

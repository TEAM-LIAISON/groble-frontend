import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://image.dev.groble.im/**")],
    domains: ["via.placeholder.com"],
  },
  experimental: {
    viewTransition: true,
    authInterrupts: true,
  },
};

export default nextConfig;

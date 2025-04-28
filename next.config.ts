import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    authInterrupts: true,
  },
};

export default nextConfig;

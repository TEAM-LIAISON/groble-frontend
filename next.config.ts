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
  typescript: {
    // 개발 중에는 타입 체크를 수행하지만, 빌드 시에는 타입 체크 오류를 무시합니다
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

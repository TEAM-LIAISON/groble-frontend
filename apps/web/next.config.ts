import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 임시 조치
  eslint: {
    // 빌드 중 ESLint 오류·경고 모두 무시
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || "localhost",
        pathname: "/**",
      },
    ],
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "localhost",
      process.env.NEXT_PUBLIC_CDN_DOMAIN || "cdn.example.com",
    ],
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

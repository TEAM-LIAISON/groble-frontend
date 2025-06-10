import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 임시 조치Add commentMore actions
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
  turbopack: {
    resolveAlias: {
      "@": "./",
      "@/components": "./components",
      "@/lib": "./lib",
      "@/app": "./app",
      "@/third-party": "./third-party",
    },
  },
  typescript: {
    // 개발 중에는 타입 체크를 수행하지만, 빌드 시에는 타입 체크 오류를 무시합니다
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // Vercel 모노레포 환경에서 경로 해결을 위한 alias 설정
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
};

export default nextConfig;

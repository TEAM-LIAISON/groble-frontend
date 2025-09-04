import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import path from "node:path";

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
    // 모노레포에서 Turbopack 안정성을 위한 설정
    turbo: {
      root: path.resolve(__dirname, "../.."),
    },
  },
  turbopack: {
    resolveAlias: {
      "@": "./",
      "@/components": "./components",
      "@/lib": "./lib",
      "@/app": "./app",
      "@/third-party": "./third-party",
    },
    // 모노레포 환경을 위한 추가 설정
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  typescript: {
    // 개발 중에는 타입 체크를 수행하지만, 빌드 시에는 타입 체크 오류를 무시합니다
    ignoreBuildErrors: true,
  },
  // Turbopack 사용 시에는 webpack 설정을 조건부로 적용
  webpack: process.env.TURBOPACK
    ? undefined
    : (config) => {
        // Vercel 모노레포 환경에서 경로 해결을 위한 alias 설정
        config.resolve.alias = {
          ...config.resolve.alias,
          "@": path.resolve(__dirname),
        };
        return config;
      },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "liaison",

  project: "groble",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI || process.env.NODE_ENV === "development",

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

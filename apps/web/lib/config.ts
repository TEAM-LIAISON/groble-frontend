const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    baseUrl: "http://localhost:3000",
    apiBaseUrl: "http://localhost:8080",
    imageHostname: "localhost",
    cookieDomain: "localhost",
  },
  production: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000",
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE || "https://localhost:8080",
    imageHostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || "localhost",
    cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost",
  },
  test: {
    baseUrl: "http://localhost:3000",
    apiBaseUrl: "http://localhost:8080",
    imageHostname: "localhost",
    cookieDomain: "localhost",
  },
};

type Environment = keyof typeof config;

export const appConfig = config[env as Environment];

// 환경변수 검증 (경고만 출력)
if (env === "production") {
  const requiredEnvVars = [
    "NEXT_PUBLIC_BASE_URL",
    "NEXT_PUBLIC_API_BASE",
    "NEXT_PUBLIC_IMAGE_HOSTNAME",
    "NEXT_PUBLIC_COOKIE_DOMAIN",
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`⚠️  환경변수 ${envVar}가 설정되지 않았습니다.`);
    }
  }
}

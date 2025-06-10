const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    baseUrl: "http://localhost:3000",
    apiBaseUrl: "http://localhost:8080",
    imageHostname: "localhost",
    cookieDomain: "localhost",
  },
  production: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
    imageHostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME!,
    cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
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

// 환경변수 검증
if (env === "production") {
  const requiredEnvVars = [
    "NEXT_PUBLIC_BASE_URL",
    "NEXT_PUBLIC_API_BASE_URL",
    "NEXT_PUBLIC_IMAGE_HOSTNAME",
    "NEXT_PUBLIC_COOKIE_DOMAIN",
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`필수 환경변수 ${envVar}가 설정되지 않았습니다.`);
    }
  }
}

export const PAGE_TITLES = {
  "auth/sign-in": "그로블 - 로그인",
  "auth/sign-up": "그로블 - 회원가입",
  "auth/reset-password": "그로블 - 비밀번호 재설정",
  "users/profile": "그로블 - 마이페이지",
  "users/maker": "그로블 - 메이커 인증",
  "manage/store/dashboard": "그로블 - 대시보드",
  "manage/store/info": "그로블 - 마켓 관리",
  "manage/store/products": "그로블 - 상품 관리",
  "manage/store/settlement": "그로블 - 정산 관리",
  "manage/store/customers": "그로블 - 고객 관리",
  "manage/purchase": "그로블 - 내 콘텐츠",
  "products/register": "그로블 - 상품 등록 및 수정",
} as const;

export type PageTitleKey = keyof typeof PAGE_TITLES;

export function generatePageTitle(
  pathname: string,
  additionalInfo?: {
    marketName?: string;
    productName?: string;
  }
): string {
  const normalizedPath = pathname.replace(/^\//, "");

  if (isMarketPage(normalizedPath)) {
    const marketName =
      additionalInfo?.marketName || extractMarketName(normalizedPath);
    return marketName ? `${marketName}님의 마켓` : "마켓";
  }

  if (isProductDetailPage(normalizedPath)) {
    const productName = additionalInfo?.productName || "상품";
    return productName;
  }

  for (const [pattern, title] of Object.entries(PAGE_TITLES)) {
    if (normalizedPath.startsWith(pattern)) {
      return title;
    }
  }

  return "그로블";
}

function isMarketPage(path: string): boolean {
  const segments = path.split("/");
  if (segments.length === 1 && segments[0]) {
    const commonPrefixes = [
      "auth",
      "users",
      "manage",
      "products",
      "settlements",
      "account",
      "intro",
    ];
    return !commonPrefixes.some((prefix) => segments[0].startsWith(prefix));
  }
  return false;
}

function isProductDetailPage(path: string): boolean {
  return /^products\/\d+/.test(path);
}

function extractMarketName(path: string): string {
  return path.split("/")[0] || "";
}

export function getTitleForRoute(
  pathname: string,
  searchParams?: Record<string, string | string[] | undefined>
): string {
  const normalizedPath = pathname.replace(/^\//, "");

  if (normalizedPath === "manage/store/products") {
    const tab = searchParams?.tab;
    if (tab === "ACTIVE") {
      return "그로블 - 상품 관리 (판매중)";
    }
    if (tab === "DRAFT") {
      return "그로블 - 상품 관리 (작성중)";
    }
    return "그로블 - 상품 관리";
  }

  if (/^manage\/store\/products\/\d+/.test(normalizedPath)) {
    return "그로블 - 판매 관리";
  }

  return generatePageTitle(pathname);
}

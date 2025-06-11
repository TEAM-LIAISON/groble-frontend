// File: src/shared/api/fetch-ssr.ts

import { cookies } from "next/headers";
import { unauthorized, forbidden } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://api.groble.im";

/**
 * SSR 전용 Fetch 유틸
 * - `next/headers`의 쿠키를 헤더에 실어 보냄
 * - JSON / PDF / text 응답 지원
 * - 401 → `unauthorized()`, 403 → `forbidden()` 호출
 *
 * @param endpoint 전체 URL이거나 `/api/...` 같은 상대경로
 * @param init fetch 옵션 (cache 같은)
 * @returns body를 파싱한 결과 (`T`)
 */
export async function fetchServerSide<T>(
  endpoint: string,
  init: RequestInit = {},
): Promise<T> {
  // 1) URL 결정
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  // 2) 쿠키 헤더 수집
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookieHeader = [
    accessToken && `accessToken=${accessToken}`,
    refreshToken && `refreshToken=${refreshToken}`,
  ]
    .filter(Boolean)
    .join("; ");

  // 3) 최종 헤더 병합
  const headers = new Headers(init.headers);
  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  // 4) 요청 실행
  const response = await fetch(url, {
    ...init,
    headers,
  });

  // 5) 응답 바디 파싱
  const contentType = response.headers.get("content-type") ?? "";
  let body: any;
  if (contentType.includes("application/json")) {
    body = await response.json();
  } else if (contentType.includes("application/pdf")) {
    body = await response.blob();
  } else {
    body = await response.text();
  }

  // 6) 인증 오류 처리
  if (response.status === 401) {
    unauthorized(); // Next.js가 클라이언트를 /login 등으로 리다이렉트
  } else if (response.status === 403) {
    forbidden(); // Next.js가 403 페이지 렌더링
  }

  // 7) 정상/기타 응답은 그대로 반환
  return body as T;
}

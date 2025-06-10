import type { ApiResponse } from "@/shared/types/api-types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || process.env.INTERNAL_API_BASE;

/**
 * CSR 전용 JSON Fetch 클라이언트
 * @param endpoint 경로 또는 전체 URL
 * @param init fetch 옵션
 * @throws 네트워크/HTTP 오류를 throw
 */
export async function fetchClient<T>(
  endpoint: string,
  init: RequestInit = {},
): Promise<ApiResponse<T>> {
  // 기본 URL 처리
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  // 헤더 병합
  const defaultHeaders = new Headers({ "Content-Type": "application/json" });
  const customHeaders = new Headers(init.headers);
  defaultHeaders.forEach((v, k) => {
    if (!customHeaders.has(k)) customHeaders.set(k, v);
  });

  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers: customHeaders,
  });

  const contentType = response.headers.get("Content-Type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Unexpected Content-Type: ${contentType}`);
  }

  const json = (await response.json()) as ApiResponse<T>;

  // 인증 오류 이벤트 발행
  if (response.status === 401 || response.status === 403) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("auth:logout", { detail: { status: response.status } }),
      );
    }
  }

  // HTTP 에러 시 메시지와 함께 throw
  if (!response.ok) {
    throw new Error(
      json.message || `Request failed with status ${response.status}`,
    );
  }

  return json;
}

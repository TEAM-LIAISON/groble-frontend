import type { ApiResponse } from '@/shared/types/api-types';
import { showToast } from '@/shared/ui/Toast';

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
  init: RequestInit = {}
): Promise<ApiResponse<T>> {
  // 기본 URL 처리
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  // 헤더 병합
  const defaultHeaders = new Headers({ 'Content-Type': 'application/json' });
  const customHeaders = new Headers(init.headers);
  defaultHeaders.forEach((v, k) => {
    if (!customHeaders.has(k)) customHeaders.set(k, v);
  });

  const response = await fetch(url, {
    credentials: 'include',
    ...init,
    headers: customHeaders,
  });

  // 204 No Content 응답은 본문이 없으므로 바로 성공 처리
  if (response.status === 204) {
    return {} as ApiResponse<T>;
  }

  const contentType = response.headers.get('Content-Type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Unexpected Content-Type: ${contentType}`);
  }

  const json = (await response.json()) as ApiResponse<T>;

  // 인증 오류 이벤트 발행
  if (response.status === 401 || response.status === 403) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('auth:logout', { detail: { status: response.status } })
      );
    }
  }

  // HTTP 에러 시 토스트 표시 및 에러 throw
  if (!response.ok) {
    const errorMessage =
      json.message || `Request failed with status ${response.status}`;

    // 클라이언트 사이드에서만 토스트 표시
    if (typeof window !== 'undefined') {
      showToast.error(errorMessage);
    }

    throw new Error(errorMessage);
  }

  return json;
}

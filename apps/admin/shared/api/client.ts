// shared/api/client.ts
import type { ApiResponse } from '@/shared/api/type';

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new Error(`Invalid JSON response from ${url}`);
  }

  if (!res.ok) {
    // API 에러 메시지 우선, 없으면 HTTP 상태 메시지 사용
    const { message } = (json as Partial<ApiResponse<T>>) || {};
    throw new Error(message ?? res.statusText);
  }

  return json as ApiResponse<T>;
}

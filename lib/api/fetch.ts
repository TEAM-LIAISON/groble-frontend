// API 기본 URL
import { ApiResponse } from "../types/apiTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.dev.groble.im";

/**
 * API 요청을 처리하는 공용 함수
 * @param endpoint API 엔드포인트 경로
 * @param options fetch 옵션
 * @returns API 응답
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get("Content-Type");

    if (!contentType?.includes("application/json")) {
      throw new Error(`Unexpected Content-Type: ${contentType}`);
    }

    const json = await response.json();

    // 인증 오류 감지
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("auth:logout", {
            detail: { status: response.status },
          }),
        );
      }
    }

    return json as ApiResponse<T>;
  } catch (err: any) {
    console.error("API 요청 실패:", err);
    return {
      status: "FAIL",
      code: 0,
      message: err.message ?? "알 수 없는 오류",
      data: {} as T,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * useAuthError 훅 - 인증 오류 처리를 위한 React 훅
 */
export function useAuthError() {
  // 컴포넌트에서 사용할 때 호출
  const handleAuthError = () => {
    if (typeof window !== "undefined") {
      // 로그아웃 이벤트 핸들러 등록
      const handleLogout = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log("인증 오류로 로그아웃됨:", customEvent.detail);
      };

      window.addEventListener("auth:logout", handleLogout);

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        window.removeEventListener("auth:logout", handleLogout);
      };
    }
  };

  return { handleAuthError };
}

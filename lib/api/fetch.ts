import { useRouter } from "next/navigation";

// API 기본 URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.dev.groble.im";

export interface ApiResponse<T> {
  status: number;
  data: T;
  ok?: boolean;
  error?: {
    message?: string;
    code?: string;
    field?: string;
  };
}

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

  // 기본 옵션 설정
  const defaultOptions: RequestInit = {
    credentials: "include", // 쿠키 포함 설정
    headers: {
      "Content-Type": "application/json",
    },
  };

  // 옵션 병합
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
  };

  try {
    console.log(`API 요청: ${url}`);
    const response = await fetch(url, fetchOptions);

    // 응답 데이터 처리
    let data: any;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else if (contentType?.includes("application/pdf")) {
      data = await response.blob();
    } else {
      data = await response.text();
    }

    // 401 또는 403 에러 발생 시 처리
    if (response.status === 401 || response.status === 403) {
      console.log("인증 오류 발생:", response.status);
      // 클라이언트 컴포넌트에서 사용 시 로그아웃 처리를 위한 이벤트 발생
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("auth:logout", {
            detail: { status: response.status },
          }),
        );
      }
    }

    return {
      status: response.status,
      data,
      ok: response.ok,
      error: !response.ok
        ? data.error || { message: "요청 처리 중 오류가 발생했습니다." }
        : undefined,
    };
  } catch (error) {
    console.error("API 요청 오류:", error);
    return {
      status: 0,
      data: {} as T,
      ok: false,
      error: {
        message: "네트워크 오류가 발생했습니다. 연결을 확인해주세요.",
      },
    };
  }
}

/**
 * useAuthError 훅 - 인증 오류 처리를 위한 React 훅
 */
export function useAuthError() {
  const router = useRouter();

  // 컴포넌트에서 사용할 때 호출
  const handleAuthError = () => {
    if (typeof window !== "undefined") {
      // 로그아웃 이벤트 핸들러 등록
      const handleLogout = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log("인증 오류로 로그아웃됨:", customEvent.detail);
        router.push("/auth/sign-in");
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

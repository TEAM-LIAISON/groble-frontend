import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/useUserStore";
import { fetchClient } from "@/shared/api/api-fetch";

export interface User {
  isLogin: boolean;
  nickname?: string;
  profileImageUrl?: string;
  canSwitchToSeller?: boolean;
  unreadNotificationCount?: number;
}

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

/**
 * 사용자 정보를 가져오는 API 함수
 */
const fetchUserInfo = async (): Promise<User> => {
  // Zustand 스토어에서 현재 사용자 정보 가져오기
  const currentUser = useUserStore.getState().user;
  const lastUpdated = useUserStore.getState().lastUpdated;
  const now = Date.now();

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/me`, {
      method: "GET",
      credentials: "include", // 쿠키를 포함하여 요청
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // 인증 실패 시 비로그인 상태로 반환
        const notLoggedInUser = { isLogin: false };

        // 이전에 로그인 상태였다면 로그아웃 처리로 간주
        if (currentUser?.isLogin) {
          useUserStore.getState().setUser(notLoggedInUser);
        }

        return notLoggedInUser;
      }
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    const userData = data.data || data;

    // zustand 스토어 업데이트
    useUserStore.getState().setUser(userData);

    return userData;
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);

    // 네트워크 오류 등의 일시적 문제일 경우 이전 상태 유지
    if (currentUser) {
      return currentUser;
    }

    // 이전 상태가 없으면 기본 비로그인 상태 반환
    return { isLogin: false };
  }
};

/**
 * 로그인 API 요청
 * @param email 사용자 이메일
 * @param password 사용자 비밀번호
 * @returns 로그인 응답
 */
export async function login(email: string, password: string) {
  const loginUrl =
    process.env.NODE_ENV === "development"
      ? "/api/v1/auth/sign-in/local/test" // 개발용: body로 토큰 반환
      : "/api/v1/auth/sign-in"; // 배포용: 쿠키로만 설정

  const response = await fetchClient<any>(loginUrl, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (process.env.NODE_ENV === "development") {
    // 개발환경: body에서 토큰 추출해서 쿠키 설정
    try {
      const { accessToken, refreshToken } = await response.data;
      document.cookie = `accessToken=${accessToken}; path=/`;
      document.cookie = `refreshToken=${refreshToken}; path=/`;
    } catch (error) {
      return response;
    }
  } else {
    // 배포환경: 외부 서버가 쿠키 자동 설정 (기존 방식)
  }

  return response;
}

/**
 * 로그아웃 처리
 */
export async function logout() {
  return apiFetch<any>("/api/v1/auth/logout", {
    method: "POST",
  });
}

/**
 * 소셜 로그인 URL 생성
 * @param provider 소셜 로그인 제공자 (google, kakao 등)
 * @returns 소셜 로그인 URL
 */
export function getSocialLoginUrl(provider: string) {
  return `https://www.groble.im/auth/oauth2/${provider}`;
}

/**
 * 회원가입 처리 함수
 */
export const register = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include", // 쿠키를 포함
  });

  if (!response.ok) {
    throw new Error(`회원가입 실패: ${response.status}`);
  }

  const data = await response.json();

  // 회원가입 성공 시 사용자 정보 업데이트
  if (data.data) {
    useUserStore.getState().setUser(data.data);
  }

  return data;
};

/**
 * 사용자 정보를 가져오는 React Query 훅
 */
export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: true,
  });
}

/**
 * 사용자 정보 다시 가져오기 (캐시 강제 갱신)
 * @param queryClient - React Query Client 인스턴스
 */
export const refetchUserInfo = (queryClient: any) => {
  return queryClient.invalidateQueries({ queryKey: ["userInfo"] });
};

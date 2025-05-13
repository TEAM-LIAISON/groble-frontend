import { useQuery } from "@tanstack/react-query";

export interface User {
  isLogin: boolean;
  nickname?: string;
  profileImageUrl?: string;
  canSwitchToSeller?: boolean;
  unreadNotificationCount?: number;
}

// API 기본 URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.groble.im";

/**
 * 사용자 정보를 가져오는 API 함수
 */
const fetchUserInfo = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/me`, {
    method: "GET",
    credentials: "include", // 쿠키를 포함하여 요청
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // 인증 실패 시 비로그인 상태로 반환
      return { isLogin: false };
    }
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

/**
 * 로그인 처리 함수
 * @param email - 이메일
 * @param password - 비밀번호
 */
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include", // 쿠키를 포함
  });

  if (!response.ok) {
    throw new Error(`로그인 실패: ${response.status}`);
  }

  return await response.json();
};

/**
 * 소셜 로그인 URL 생성
 * @param provider - 소셜 제공자 (kakao, naver, google 등)
 * @param redirectUri - 리다이렉트 URI
 */
export const getSocialLoginUrl = (provider: string, redirectUri: string) => {
  const encodedRedirectUri = encodeURIComponent(redirectUri);
  return `${API_BASE_URL}/api/v1/oauth2/authorize?provider=${provider}&redirect_uri=${encodedRedirectUri}`;
};

/**
 * 로그아웃 처리 함수
 */
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include", // 쿠키를 포함
  });

  if (!response.ok) {
    throw new Error(`로그아웃 실패: ${response.status}`);
  }

  return true;
};

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

  return await response.json();
};

/**
 * 사용자 정보를 가져오는 React Query 훅
 */
export const useUserInfo = () => {
  return useQuery<User, Error>({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    // staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true, // 창 포커스 시 재요청
    retry: 1, // 실패 시 1회 재시도
    initialData: { isLogin: false }, // 초기 상태는 비로그인으로 설정
  });
};

/**
 * 사용자 정보 다시 가져오기 (캐시 강제 갱신)
 * @param queryClient - React Query Client 인스턴스
 */
export const refetchUserInfo = (queryClient: any) => {
  return queryClient.invalidateQueries({ queryKey: ["userInfo"] });
};

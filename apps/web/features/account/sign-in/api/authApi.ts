import { fetchClient } from '@/shared/api/api-fetch';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UserData {
  nickname: string | null;
  email: string;
  // 다른 사용자 데이터...
}

/**
 * 이메일 로그인 API
 */
export async function signInWithEmail(data: SignInRequest) {
  // 로컬환경일때 로컬환경 주소로 요청
  if (process.env.NODE_ENV === 'development') {
    alert('로컬환경');
    const response = await fetchClient<{
      accessToken: string;
      refreshToken: string;
    }>('/api/v1/auth/sign-in/local/test', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });

    const { accessToken, refreshToken } = await response.data;
    document.cookie = `accessToken=${accessToken}; path=/`;
    document.cookie = `refreshToken=${refreshToken}; path=/`;
    return response.data;
  } else {
    alert('프로덕션환경');
    const response = await fetchClient('/api/v1/auth/integrated/sign-in', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }
}

/**
 * 사용자 정보 조회 API
 */
export async function getUserInfo(): Promise<UserData> {
  const response = await fetchClient<UserData>('/api/v1/me');
  return response.data;
}

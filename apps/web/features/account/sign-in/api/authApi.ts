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
  const response = await fetchClient('/api/v1/auth/integrated/sign-in', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.data;
}

/**
 * 사용자 정보 조회 API
 */
export async function getUserInfo(): Promise<UserData> {
  const response = await fetchClient<UserData>('/api/v1/me');
  return response.data;
}

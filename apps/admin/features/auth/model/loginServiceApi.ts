import { apiClient } from '@/shared/api/client';

export async function login(email: string, password: string) {
  const res = await apiClient('/api/v1/admin/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || '로그인 실패');
  }
}

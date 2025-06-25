import { fetchClient } from '@/shared/api/api-fetch';

/**
 * 로그아웃 API
 */
export const logout = async (): Promise<void> => {
  await fetchClient('/api/v1/auth/logout', {
    method: 'POST',
  });
};

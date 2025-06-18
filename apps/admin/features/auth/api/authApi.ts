import { apiClient } from '@/shared/api/client';

export const fetchMe = async () => {
  const response = await apiClient<{
    isLogin: boolean;
    nickname?: string;
  }>('/api/v1/me');

  if (response.code !== 200) {
    throw new Error('Failed to fetch user data');
  }

  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await apiClient('/api/v1/admin/auth/logout');

  if (response.code !== 200) {
    throw new Error('Logout failed');
  }
};

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../api/authApi';

export function useUserInfo() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getUserInfo,
    retry: false, // 인증 실패 시 재시도하지 않음
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (이전 cacheTime)
  });
}

export function useUserInfoSync() {
  const { data, isLoading, error } = useUserInfo();

  return {
    user: data || null,
    isLoading,
    isAuthenticated: !!data && !error,
    error: error?.message || null,
  };
}

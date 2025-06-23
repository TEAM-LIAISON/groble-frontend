import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';

export const profileKeys = {
  all: ['profile'] as const,
  userDetail: () => [...profileKeys.all, 'userDetail'] as const,
};

export const useUserDetail = () => {
  return useQuery({
    queryKey: profileKeys.userDetail(),
    queryFn: () => profileApi.getUserDetail(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { fetchMe, logout } from '../api/authApi';
import { useAdminAuthStore, AdminUser } from '../model/authStore';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Zustand 스토어에서 상태 관리
  const {
    user,
    isLoading: isStoreLoading,
    setUser,
    setLoading,
    clearUser,
  } = useAdminAuthStore();

  // React Query를 통한 사용자 정보 가져오기
  const {
    data,
    isLoading: isQueryLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-me'],
    queryFn: fetchMe,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: true,
  });

  // 로그아웃 Mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 로그아웃 성공 시 상태 클리어
      clearUser();
      queryClient.clear(); // 모든 쿼리 캐시 클리어
      router.push('/login');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      // 에러가 발생해도 클라이언트 상태는 클리어
      clearUser();
      queryClient.clear();
      router.push('/login');
    },
  });

  // React Query 결과 처리
  useEffect(() => {
    if (data) {
      setUser(data as AdminUser);
    } else if (error) {
      clearUser();
    }
  }, [data, error, setUser, clearUser]);

  // 로딩 상태 계산
  const isLoading = isQueryLoading || isStoreLoading;
  const isLoggedIn = !!user && user.isLogin === true;

  // 사용자 정보 갱신 함수
  const refreshUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      await refetch();
    } catch (error) {
      console.error('사용자 정보 갱신 실패:', error);
      clearUser();
    }
  }, [refetch, setLoading, clearUser]);

  // 로그아웃 처리 함수
  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  // 실시간 업데이트 메커니즘
  useEffect(() => {
    // 초기 로드 시 사용자 정보 가져오기
    refreshUserInfo();

    // 브라우저 포커스 변경 감지 함수
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshUserInfo();
      }
    };

    // 주기적인 사용자 정보 갱신 (로그인 상태일 때만)
    const intervalId = setInterval(() => {
      if (isLoggedIn) {
        refreshUserInfo();
      }
    }, 60 * 1000); // 1분마다

    // 브라우저 포커스 변경 이벤트 리스너 등록
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 클린업 함수
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshUserInfo, isLoggedIn]);

  return {
    nickname: user?.nickname,
    isLoading,
    error,
    isLoggedIn,
    logout: handleLogout,
    refreshUserInfo,
    user,
    isLoggingOut: logoutMutation.isPending,
  };
};

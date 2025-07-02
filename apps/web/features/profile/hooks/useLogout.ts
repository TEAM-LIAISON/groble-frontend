import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { logout } from '../api/logoutApi';
import { showToast } from '@/shared/ui/Toast';

/**
 * 쿠키 삭제 함수
 */
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

/**
 * 로그아웃 훅
 */
export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 쿠키에서 accessToken 삭제
      deleteCookie('accessToken');

      // 성공 토스트
      showToast.success('로그아웃되었습니다.');

      // 홈페이지로 이동
      router.push('/intro');
    },
    onError: (error: any) => {
      console.error('로그아웃 실패:', error);

      // API 실패해도 클라이언트 쿠키는 삭제하고 로그아웃 처리
      deleteCookie('accessToken');
      showToast.info('로그아웃되었습니다.');
      router.push('/intro');
    },
  });
};

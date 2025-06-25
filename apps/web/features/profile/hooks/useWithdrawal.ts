import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchClient } from '@/shared/api/api-fetch';
import { showToast } from '@/shared/ui/Toast';

/**
 * 회원탈퇴 API
 */
const withdrawUser = async (): Promise<void> => {
  await fetchClient('/api/v1/users/withdrawal', {
    method: 'DELETE',
  });
};

/**
 * 회원탈퇴 처리 훅
 */
export const useWithdrawUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: withdrawUser,
    onSuccess: () => {
      // 성공 토스트
      showToast.success('회원탈퇴가 완료되었습니다.');

      // 쿠키 삭제
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // 홈페이지로 이동
      router.push('/');
    },
    onError: (error: any) => {
      console.error('회원탈퇴 실패:', error);
      showToast.error('회원탈퇴에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

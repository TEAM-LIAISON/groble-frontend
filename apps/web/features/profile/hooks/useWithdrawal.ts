import { fetchClient } from '@/shared/api/api-fetch';
import { showToast } from '@/shared/ui/Toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type WithdrawReason =
  | 'NOT_USING'
  | 'INCONVENIENT'
  | 'LACKS_CONTENT'
  | 'BAD_EXPERIENCE'
  | 'COST_BURDEN'
  | 'OTHER';

interface WithdrawRequest {
  reason: WithdrawReason;
  additionalComment?: string;
}

/**
 * 회원탈퇴 API
 */
const withdrawUser = async (data: WithdrawRequest): Promise<void> => {
  await fetchClient('/api/v1/auth/withdrawal', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 회원탈퇴 처리 훅
 */
export const useWithdrawUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: WithdrawRequest) => withdrawUser(data),
    onSuccess: () => {
      // 쿠키 삭제
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // 탈퇴 완료 페이지로 이동
      router.push('/users/withdraw/complete');
    },
    onError: (error: any) => {
      console.error('회원탈퇴 실패:', error);
      showToast.error('회원탈퇴에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

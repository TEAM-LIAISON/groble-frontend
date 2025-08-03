import { switchUserType } from '@/features/profile/api/userTypeApi';
import { showToast } from '@/shared/ui/Toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { agreeMakerTerms } from '../api/maker-api';

export const useMakerTerms = () => {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      // 1. 약관 동의
      await agreeMakerTerms();

      // 2. 사용자 유형을 SELLER로 전환
      await switchUserType({ userType: 'SELLER' });
    },
    onSuccess: () => {
      showToast.success('메이커 등록이 완료되었습니다.');
      // 다음 페이지로 이동 (필요에 따라 수정)
      router.push('/users/profile/info');
    },
    onError: (error) => {
      showToast.error('메이커 등록에 실패했습니다. 다시 시도해주세요.');
      console.error('메이커 등록 실패:', error);
    },
  });

  const handleAgreeChange = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const handleSubmit = () => {
    if (!isAgreed) {
      showToast.warning('약관에 동의해주세요.');
      return;
    }
    mutation.mutate();
  };

  return {
    isAgreed,
    isLoading: mutation.isPending,
    handleAgreeChange,
    handleSubmit,
  };
};

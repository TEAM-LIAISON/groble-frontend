import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { integratedSignUp } from '../api/signUpApi';
import { showToast } from '@/shared/ui/Toast';
import { clearSignUpStorage } from '../model/SignUpContext';

export const useIntegratedSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: integratedSignUp,
    onSuccess: () => {
      // showToast.success('회원가입이 완료되었습니다');
      // sessionStorage 정리
      clearSignUpStorage();
      router.push('/auth/sign-up/nickname');
    },
    onError: (error) => {
      console.error('통합 회원가입 실패:', error);
    },
  });
};

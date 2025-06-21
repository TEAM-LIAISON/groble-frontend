import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  requestPhoneVerification,
  verifyPhoneCode,
} from '../api/phoneVerificationApi';
import { showToast } from '@/shared/ui/Toast';

export const usePhoneVerification = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: requestPhoneVerification,
    onSuccess: (_, variables) => {
      showToast.success('인증번호가 전송되었습니다');
      // 인증번호 입력 페이지로 이동 (전화번호를 쿼리로 전달)
      router.push(
        `/auth/sign-up/phone/verify?phoneNumber=${encodeURIComponent(
          variables.phoneNumber
        )}`
      );
    },
    onError: (error) => {
      console.error('전화번호 인증 요청 실패:', error);
    },
  });
};

// 인증코드 검증 훅
export const useVerifyPhoneCode = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyPhoneCode,
    onSuccess: () => {
      showToast.success('전화번호 인증이 완료되었습니다');
      // 다음 단계로 이동 (메인 페이지 또는 온보딩 완료)
      router.push('/auth/sign-up/complete');
    },
    onError: (error) => {
      console.error('인증코드 검증 실패:', error);
    },
  });
};

// 재전송 훅 (페이지 이동 없음)
export const useResendPhoneVerification = () => {
  return useMutation({
    mutationFn: requestPhoneVerification,
    onSuccess: () => {
      showToast.success('인증번호가 재전송되었습니다');
    },
    onError: (error) => {
      console.error('인증번호 재전송 실패:', error);
    },
  });
};

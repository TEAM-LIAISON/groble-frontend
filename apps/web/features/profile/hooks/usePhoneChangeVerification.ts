import {
  requestPhoneVerification,
  verifyPhoneCode,
} from '@/features/account/sign-up/api/phoneVerificationApi';
import { showToast } from '@/shared/ui/Toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

/**
 * 전화번호 변경을 위한 인증번호 발송 훅
 */
export const useSendPhoneChangeVerification = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: requestPhoneVerification,
    onSuccess: (_, variables) => {
      showToast.success('인증번호가 전송되었습니다.');
      // 전화번호 변경 인증 페이지로 이동
      router.push(
        `/users/patch/phone/verify?phoneNumber=${encodeURIComponent(
          variables.phoneNumber
        )}`
      );
    },
    onError: (error) => {
      // fetchClient에서 이미 토스트를 표시하므로 여기서는 콘솔 로그만
      console.error('전화번호 변경 인증번호 발송 실패:', error);
    },
  });
};

/**
 * 전화번호 변경을 위한 인증번호 검증 훅
 */
export const useVerifyPhoneChangeCode = () => {
  return useMutation({
    mutationFn: verifyPhoneCode,
    onSuccess: () => {
      showToast.success('전화번호가 성공적으로 변경되었습니다.');
    },
    onError: (error) => {
      // fetchClient에서 이미 토스트를 표시하므로 여기서는 콘솔 로그만
      console.error('전화번호 변경 인증번호 검증 실패:', error);
    },
  });
};

/**
 * 전화번호 변경을 위한 인증번호 재발송 훅
 */
export const useResendPhoneChangeVerification = () => {
  return useMutation({
    mutationFn: requestPhoneVerification,
    onSuccess: () => {
      showToast.success('인증번호가 재발송되었습니다.');
    },
    onError: (error) => {
      // fetchClient에서 이미 토스트를 표시하므로 여기서는 콘솔 로그만
      console.error('전화번호 변경 인증번호 재발송 실패:', error);
    },
  });
};

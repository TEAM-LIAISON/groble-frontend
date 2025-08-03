import { showToast } from '@/shared/ui/Toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  type SendEmailChangeVerificationRequest,
  type VerifyEmailChangeCodeRequest,
  sendEmailChangeVerification,
  verifyEmailChangeCode,
} from '../api/emailChangeApi';

/**
 * 이메일 변경을 위한 인증코드 발송 훅
 */
export const useSendEmailChangeVerification = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SendEmailChangeVerificationRequest) =>
      sendEmailChangeVerification(data),
    onSuccess: (_, variables) => {
      showToast.success('인증코드가 이메일로 발송되었습니다.');
      // 이메일 변경 인증 페이지로 이동
      router.push(
        `/users/patch/email/verify?email=${encodeURIComponent(variables.email)}`
      );
    },
    onError: (error: any) => {
      console.error('이메일 변경 인증코드 발송 실패:', error);
    },
  });
};

/**
 * 이메일 변경을 위한 인증코드 검증 훅
 */
export const useVerifyEmailChangeCode = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailChangeCodeRequest) =>
      verifyEmailChangeCode(data),
    onSuccess: () => {
      showToast.success('이메일이 성공적으로 변경되었습니다.');
    },
    onError: (error: any) => {
      console.error('이메일 변경 인증코드 검증 실패:', error);
    },
  });
};

/**
 * 이메일 변경을 위한 인증코드 재발송 훅
 */
export const useResendEmailChangeVerification = () => {
  return useMutation({
    mutationFn: (data: SendEmailChangeVerificationRequest) =>
      sendEmailChangeVerification(data),
    onSuccess: () => {
      showToast.success('인증코드가 재발송되었습니다.');
    },
    onError: (error: any) => {
      console.error('이메일 변경 인증코드 재발송 실패:', error);
    },
  });
};

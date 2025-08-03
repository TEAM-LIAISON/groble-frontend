import { showToast } from '@/shared/ui/Toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  sendEmailVerificationCode,
  verifyEmailCode,
} from '../api/emailVerificationApi';
import { useSignUp } from '../model/SignUpContext';

export const useSendEmailVerification = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: sendEmailVerificationCode,
    onSuccess: (_, variables) => {
      // 성공 토스트 표시
      showToast.success('인증코드가 전송되었습니다');
      // 이메일과 함께 인증 페이지로 이동
      router.push(
        `/auth/sign-up/email/verify?email=${encodeURIComponent(
          variables.email
        )}`
      );
    },
    onError: (error) => {
      console.error('이메일 인증 코드 전송 실패:', error);
    },
  });
};

// 재전송용 훅 (페이지 이동 없음)
export const useResendEmailVerification = () => {
  return useMutation({
    mutationFn: sendEmailVerificationCode,
    onSuccess: () => {
      showToast.success('인증코드가 재전송되었습니다');
    },
    onError: (error) => {
      console.error('이메일 인증 코드 재전송 실패:', error);
    },
  });
};

export const useVerifyEmailCode = () => {
  const router = useRouter();
  const { dispatch } = useSignUp();

  return useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: (_, variables) => {
      // 성공 토스트 표시
      showToast.success('이메일 인증이 완료되었습니다');
      // Context에 이메일 저장
      dispatch({ type: 'SET_EMAIL', payload: variables.email });
      // 비밀번호 설정 페이지로 이동
      router.push('/auth/sign-up/password');
    },
    onError: (error) => {
      console.error('이메일 인증 실패:', error);
    },
  });
};

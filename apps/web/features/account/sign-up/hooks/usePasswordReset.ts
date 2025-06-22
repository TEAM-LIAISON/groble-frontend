import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { showToast } from '@/shared/ui/Toast';
import {
  sendPasswordResetEmail,
  resetPassword,
  ResetPasswordRequest,
} from '../api/passwordResetApi';

export const useSendPasswordResetEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: sendPasswordResetEmail,
    onSuccess: () => {
      showToast.success('비밀번호 재설정 이메일이 전송되었습니다');
      router.push('/auth/reset-password/guide');
    },
    onError: (error) => {
      console.error('Password reset email error:', error);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showToast.success('비밀번호가 성공적으로 재설정되었습니다');
      router.push('/auth/reset-password/complete');
    },
    onError: (error) => {
      console.error('Password reset error:', error);
    },
  });
};

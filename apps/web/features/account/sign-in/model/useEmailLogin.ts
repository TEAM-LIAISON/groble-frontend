'use client';

import { useMutation } from '@tanstack/react-query';
import { signInWithEmail } from '../api/authApi';

export function useEmailLogin() {
  const loginMutation = useMutation({
    mutationFn: signInWithEmail,
    onSuccess: () => {
      // 로그인 성공 시 홈으로 이동
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  return {
    login,
    loading: loginMutation.isPending,
    error: loginMutation.error
      ? '이메일 또는 비밀번호가 일치하지 않습니다.'
      : null,
    isSuccess: loginMutation.isSuccess,
  };
}

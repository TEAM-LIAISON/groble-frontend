"use client";

import { useMutation } from "@tanstack/react-query";
import { signInWithEmail } from "../api/authApi";
import { useRedirectAfterAuth } from "@/shared/hooks/use-redirect-after-auth";
import { amplitudeEvents } from "@/lib/utils/amplitude";

export function useEmailLogin() {
  const { redirectAfterAuth } = useRedirectAfterAuth();

  // 로그인
  const loginMutation = useMutation({
    mutationFn: signInWithEmail,
    onSuccess: async (data) => {
      // 로그인 성공 이벤트 트래킹
      await amplitudeEvents.signIn("email", {
        user_id: data?.userId,
        login_method: "email",
        success: true,
      });
      redirectAfterAuth();
    },
    onError: async (error) => {
      console.error("로그인 실패:", error);
      // 로그인 실패 이벤트 트래킹
      await amplitudeEvents.trackEvent("Login Failed", {
        login_method: "email",
        error_message: error.message,
        success: false,
      });
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  return {
    login,
    loading: loginMutation.isPending,
    error: loginMutation.error
      ? "이메일 또는 비밀번호가 일치하지 않습니다."
      : null,
    isSuccess: loginMutation.isSuccess,
  };
}

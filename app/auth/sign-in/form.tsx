"use client";

import Button, { LinkButton } from "@/components/button";
import TextField from "@/components/text-field";
import { getFieldErrorMessage } from "@/lib/error";
import { login } from "@/lib/api/auth";
import { useUserStore } from "@/lib/store/useUserStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

enum Stage {
  EMAIL = 0,
  PASSWORD = 1,
}

export default function SignInForm() {
  const [stage, setStage] = useState<Stage>(Stage.EMAIL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { fetchUser } = useUserStore();
  const queryClient = useQueryClient();

  // TanStack Query의 useMutation을 사용하여 로그인 요청 처리
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return login(credentials.email, credentials.password);
    },
    onSuccess: async (response) => {
      if (response.status === 200) {
        // 로그인 성공 시 사용자 정보 갱신
        await fetchUser();
        await queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        router.push("/");
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (stage === Stage.EMAIL) {
      // 이메일 입력 완료 시 비밀번호 입력 단계로 이동
      setStage(Stage.PASSWORD);
      // 비밀번호 입력 필드에 포커스 이동
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 0);
      return;
    }

    // TanStack Query의 mutate 메서드를 사용하여 로그인 요청 시작
    loginMutation.mutate({ email, password });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 로그인 요청 상태 및 오류 정보
  const isLoading = loginMutation.isPending;
  const error =
    loginMutation.error ||
    (loginMutation.data?.status !== 200 ? loginMutation.data?.error : null);

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <h3 className="mb-2 text-lg">이메일로 로그인</h3>

      <TextField
        id="email"
        name="email"
        inputType="email"
        placeholder="이메일"
        value={email}
        onChange={handleEmailChange}
        required
        disabled={stage > Stage.EMAIL || isLoading}
        autoFocus
        helperText={getFieldErrorMessage(error, "email")}
      />

      {stage >= Stage.PASSWORD && (
        <TextField
          id="password"
          name="password"
          inputType="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          required
          ref={passwordRef}
          disabled={isLoading}
          helperText={getFieldErrorMessage(error, "password")}
        />
      )}

      {error?.message &&
        !getFieldErrorMessage(error, "email") &&
        !getFieldErrorMessage(error, "password") && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}

      <Button size="small" disabled={isLoading}>
        {stage < Stage.PASSWORD ? "다음" : isLoading ? "⏳" : "로그인"}
      </Button>

      <div className="mt-2 text-center text-sm">
        <span>계정이 없으신가요? </span>
        <LinkButton
          href="/auth/sign-up"
          group="text"
          type="tertiary"
          size="small"
          className="font-medium"
        >
          회원가입
        </LinkButton>
      </div>
    </form>
  );
}

"use client";

import { Button, LinkButton } from "@groble/ui";
import { TextField } from "@groble/ui";
import { login } from "@/lib/api/auth";
import { getFieldErrorMessage, useToastErrorMessage } from "@/lib/error";
import { useUserStore } from "@/lib/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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
      if (response.status === "SUCCESS") {
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
    (loginMutation.data?.status !== "SUCCESS" ? loginMutation : null);
  useToastErrorMessage(error);

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <h3 className="mb-2 text-heading-1 font-semibold md:font-bold">
        로그인 하기
      </h3>

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
        errorText={getFieldErrorMessage(error, "email")}
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
          errorText={getFieldErrorMessage(error, "password")}
        />
      )}

      <Button size="small" disabled={isLoading}>
        {stage < Stage.PASSWORD ? "다음" : isLoading ? "⏳" : "로그인"}
      </Button>

      <div className="mt-2 text-center text-sm">
        <LinkButton
          href="/reset-password-request"
          group="text"
          type="tertiary"
          size="small"
          className="font-medium"
        >
          비밀번호를 잊으셨나요?
        </LinkButton>
      </div>
    </form>
  );
}

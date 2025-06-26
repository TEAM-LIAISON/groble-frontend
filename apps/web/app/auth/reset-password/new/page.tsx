'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { useResetPassword } from '@/features/account/sign-up/hooks/usePasswordReset';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordMutation = useResetPassword();

  // 비밀번호 유효성 검사 (8자 이상)
  const isPasswordValid = password.length >= 8;

  // 비밀번호 일치 확인
  const isPasswordMatch = password === confirmPassword;

  // 모든 조건 만족 여부
  const canProceed = isPasswordValid && isPasswordMatch && email && token;

  const handleSubmit = () => {
    if (canProceed) {
      resetPasswordMutation.mutate({
        token: token!,
        newPassword: password,
      });
    }
  };

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem] mb-5">
            새로운 비밀번호를 입력해주세요
          </h1>

          <div className="flex flex-col gap-4">
            <TextField
              inputType="password"
              placeholder="새 비밀번호 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={resetPasswordMutation.isPending}
            />
            <TextField
              inputType="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={resetPasswordMutation.isPending}
            />
          </div>

          <div className="mt-auto mb-8 w-full">
            <Button
              onClick={handleSubmit}
              disabled={!canProceed || resetPasswordMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {resetPasswordMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                '비밀번호 재설정'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ResetPasswordNewPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordContent />
    </Suspense>
  );
}

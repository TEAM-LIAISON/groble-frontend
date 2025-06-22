'use client';

import { useState } from 'react';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button, TextField } from '@groble/ui';
import { useSendPasswordResetEmail } from '@/features/account/sign-up/hooks/usePasswordReset';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const sendPasswordResetEmailMutation = useSendPasswordResetEmail();

  // 이메일 유효성 검사 (기본적인 이메일 형식)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (isEmailValid) {
      sendPasswordResetEmailMutation.mutate({ email });
    }
  };

  return (
    <>
      <OnboardingHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5 ">
          <h1 className="text-title-3 font-bold text-label-normal mt-[9.06rem] leading-8">
            비밀번호 재설정을 위해
            <br />
            가입한 이메일을 입력해주세요
          </h1>

          <TextField
            placeholder="이메일"
            className="mt-5"
            inputType="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-auto mb-10">
            <Button
              className="w-full"
              size="large"
              type="primary"
              disabled={
                !isEmailValid || sendPasswordResetEmailMutation.isPending
              }
              onClick={handleSubmit}
            >
              {sendPasswordResetEmailMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                '다음'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

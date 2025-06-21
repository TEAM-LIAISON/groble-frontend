'use client';

import { useState } from 'react';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { TextField, Button } from '@groble/ui';
import { useSendEmailVerification } from '@/features/account/sign-up/hooks/useEmailVerification';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function EmailSignUpPage() {
  const [email, setEmail] = useState('');
  const sendEmailVerificationMutation = useSendEmailVerification();

  // 이메일 유효성 검사 (기본적인 이메일 형식)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    if (isEmailValid) {
      sendEmailVerificationMutation.mutate({ email });
    }
  };

  return (
    <>
      <OnboardingHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5">
          <h1 className="text-title-3 font-bold text-label-normal mt-[9.06rem] mb-5">
            이메일을 입력해주세요
          </h1>

          <TextField
            placeholder="이메일"
            inputType="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 계속하기 버튼 */}
          <div className="mt-auto mb-8">
            <Button
              onClick={handleContinue}
              disabled={
                !isEmailValid || sendEmailVerificationMutation.isPending
              }
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              {sendEmailVerificationMutation.isPending ? (
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

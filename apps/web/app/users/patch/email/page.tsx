'use client';

import { useState } from 'react';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { useSearchParams } from 'next/navigation';
import { useSendEmailChangeVerification } from '@/features/profile';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function PatchEmailPage() {
  const searchParams = useSearchParams();
  const currentEmail = searchParams.get('email') ?? '';
  const [email, setEmail] = useState(currentEmail);
  const sendEmailVerificationMutation = useSendEmailChangeVerification();

  // 이메일 유효성 검사 (기본적인 이메일 형식)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 현재 이메일과 다른지 확인
  const isEmailChanged = email !== currentEmail;

  // 버튼 활성화 조건: 유효한 이메일 + 기존 이메일과 다름
  const canProceed = isEmailValid && isEmailChanged;

  const handleContinue = () => {
    if (canProceed) {
      sendEmailVerificationMutation.mutate({ email });
    }
  };

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem] mb-5">
            새로운 이메일을 입력해주세요
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
              disabled={!canProceed || sendEmailVerificationMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
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

'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSendEmailChangeVerification } from '@/features/profile';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

function PatchEmailContent() {
  const searchParams = useSearchParams();
  const currentEmail = searchParams.get('email') ?? '';
  const [email, setEmail] = useState(currentEmail);
  const emailVerificationMutation = useSendEmailChangeVerification();

  // 이메일 유효성 검사 (간단한 이메일 형식 체크)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 현재 이메일과 다른지 확인
  const isEmailChanged = email !== currentEmail;

  // 버튼 활성화 조건: 유효한 이메일 + 기존 이메일과 다름
  const canProceed = isEmailValid && isEmailChanged;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleContinue = () => {
    if (canProceed) {
      emailVerificationMutation.mutate({ email });
    }
  };

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem] mb-5">
            새로운 이메일을 입력해주세요
          </h1>

          <div className="flex flex-col gap-2">
            <TextField
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
              disabled={emailVerificationMutation.isPending}
            />
          </div>

          <div className="mt-auto mb-8 w-full">
            <Button
              onClick={handleContinue}
              disabled={!canProceed || emailVerificationMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {emailVerificationMutation.isPending ? (
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

export default function PatchEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PatchEmailContent />
    </Suspense>
  );
}

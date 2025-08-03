'use client';

import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { useSendEmailVerification } from '@/features/account/sign-up/hooks/useEmailVerification';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { Button, TextField } from '@groble/ui';
import { useState } from 'react';

export default function EmailSignUpPage() {
  const [email, setEmail] = useState('');
  const sendEmailVerificationMutation = useSendEmailVerification();

  // 이메일 유효성 검사 (기본적인 이메일 형식)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // API 에러 메시지 추출
  const apiError = sendEmailVerificationMutation.error;
  const apiErrorMessage = apiError
    ? (apiError as any)?.response?.data?.message ||
      (apiError as any)?.message ||
      '이메일 인증 요청 중 오류가 발생했습니다.'
    : '';

  // 에러 상태 결정: API 에러가 있거나 이메일이 입력되었는데 형식이 잘못된 경우
  const hasError = apiErrorMessage || (email && !isEmailValid);

  // 에러 텍스트 결정: API 에러 메시지 우선, 없으면 이메일 형식 에러
  const errorText =
    apiErrorMessage ||
    (email && !isEmailValid ? '이메일 형식이 올바르지 않습니다.' : '');

  const handleContinue = () => {
    if (isEmailValid) {
      sendEmailVerificationMutation.mutate({ email });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // 이메일이 변경되면 mutation을 리셋하여 에러 상태 초기화
    if (sendEmailVerificationMutation.error) {
      sendEmailVerificationMutation.reset();
    }
  };

  return (
    <>
      <OnboardingHeader back={'back'} />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 font-semibold md:text-title-3 md:font-bold text-label-normal md:mt-[9.06rem] mb-5">
            이메일을 입력해주세요
          </h1>

          <TextField
            placeholder="이메일"
            inputType="email"
            value={email}
            errorText={errorText}
            error={!!hasError}
            onChange={handleEmailChange}
          />

          {/* 계속하기 버튼 */}
          <div className="mt-auto mb-5">
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

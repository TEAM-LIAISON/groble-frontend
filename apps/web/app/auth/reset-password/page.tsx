'use client';

import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { useSendPasswordResetEmail } from '@/features/account/sign-up/hooks/usePasswordReset';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { Button, TextField } from '@groble/ui';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const sendPasswordResetEmailMutation = useSendPasswordResetEmail();

  // 이메일 유효성 검사 (기본적인 이메일 형식)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // API 에러 메시지 추출
  const apiError = sendPasswordResetEmailMutation.error;
  const apiErrorMessage = apiError
    ? (apiError as any)?.response?.data?.message ||
      (apiError as any)?.message ||
      '비밀번호 재설정 요청 중 오류가 발생했습니다.'
    : '';

  // 에러 상태 결정: API 에러가 있거나 이메일이 입력되었는데 형식이 잘못된 경우
  const hasError = apiErrorMessage || (email && !isEmailValid);

  // 에러 텍스트 결정: API 에러 메시지 우선, 없으면 이메일 형식 에러
  const errorText =
    apiErrorMessage ||
    (email && !isEmailValid ? '이메일 형식이 올바르지 않습니다.' : '');

  const handleSubmit = () => {
    if (isEmailValid) {
      sendPasswordResetEmailMutation.mutate({ email });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // 이메일이 변경되면 mutation을 리셋하여 에러 상태 초기화
    if (sendPasswordResetEmailMutation.error) {
      sendPasswordResetEmailMutation.reset();
    }
  };

  return (
    <>
      <OnboardingHeader back="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 md:text-title-3 font-semibold md:font-bold text-label-normal  md:mt-[9.06rem] leading-[1.875rem]">
            비밀번호 재설정을 위해
            <br />
            가입한 이메일을 입력해주세요
          </h1>

          <TextField
            placeholder="이메일"
            className="mt-5"
            inputType="email"
            value={email}
            errorText={errorText}
            error={!!hasError}
            onChange={handleEmailChange}
          />

          <div className="mt-auto mb-5">
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

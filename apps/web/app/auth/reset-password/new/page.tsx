'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { useResetPassword } from '@/features/account/sign-up/hooks/usePasswordReset';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { CheckIcon } from '@/components/(improvement)/icons/CheckIcon';

interface PasswordCondition {
  label: string;
  isValid: boolean;
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const resetPasswordMutation = useResetPassword();

  // 비밀번호 조건 체크
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMinLength = password.length >= 6;

  const conditions: PasswordCondition[] = [
    { label: '숫자 포함', isValid: hasNumber },
    { label: '특수문자 포함', isValid: hasSpecialChar },
    { label: '최소 6자 이상', isValid: isMinLength },
  ];

  // 모든 조건이 충족되었는지 확인
  const isAllConditionsMet = conditions.every((condition) => condition.isValid);

  // 모든 조건 만족 여부
  const canProceed = isAllConditionsMet && token;

  // API 에러 메시지 추출
  const apiError = resetPasswordMutation.error;
  const apiErrorMessage = apiError
    ? (apiError as any)?.response?.data?.message ||
      (apiError as any)?.message ||
      '비밀번호 재설정 중 오류가 발생했습니다.'
    : '';

  // 에러 상태 결정: 비밀번호가 입력되었는데 조건을 만족하지 않는 경우
  const hasValidationError = password && !isAllConditionsMet;
  const hasError = hasValidationError;

  const handleSubmit = () => {
    if (canProceed) {
      resetPasswordMutation.mutate({
        token: token!,
        newPassword: password,
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 비밀번호가 변경되면 mutation을 리셋하여 에러 상태 초기화
    if (resetPasswordMutation.error) {
      resetPasswordMutation.reset();
    }
  };

  return (
    <>
      <OnboardingHeader back="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 md:text-title-3 font-semibold md:font-bold text-label-normal md:mt-[9.06rem] leading-[1.875rem]">
            사용할 비밀번호를 입력해주세요
          </h1>

          <div className="flex flex-col gap-4 mt-5">
            <TextField
              inputType="password"
              placeholder="새 비밀번호"
              value={password}
              error={!!hasError}
              onChange={handlePasswordChange}
              disabled={resetPasswordMutation.isPending}
            />

            {/* API 에러 메시지 표시 */}
            {apiErrorMessage && (
              <div className="flex items-center gap-1 text-caption-1 text-status-error">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00016 13.6667C11.1298 13.6667 13.6668 11.1297 13.6668 8.00004C13.6668 4.87043 11.1298 2.33337 8.00016 2.33337C4.87055 2.33337 2.3335 4.87043 2.3335 8.00004C2.3335 11.1297 4.87055 13.6667 8.00016 13.6667ZM8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667ZM8.50016 8.66671L8.50016 4.66671H7.50016L7.50016 8.66671H8.50016ZM8.50016 11.3334V10.3334H7.50016V11.3334H8.50016Z"
                  />
                </svg>
                {apiErrorMessage}
              </div>
            )}

            {/* 비밀번호 조건 체크 */}
            <div className="flex flex-col gap-2">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckIcon
                    className={`w-[20px] h-[20px] ${
                      condition.isValid
                        ? 'text-primary-sub-1'
                        : hasValidationError
                        ? 'text-status-error'
                        : 'text-label-alternative'
                    }`}
                  />
                  <span
                    className={`text-caption-1 ${
                      condition.isValid
                        ? 'text-primary-sub-1'
                        : hasValidationError
                        ? 'text-status-error'
                        : 'text-label-alternative'
                    }`}
                  >
                    {condition.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto mb-5">
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

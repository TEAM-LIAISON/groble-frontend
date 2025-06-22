'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { TextField, Button } from '@groble/ui';
import { useResetPassword } from '@/features/account/sign-up/hooks/usePasswordReset';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { CheckIcon } from '@/components/(improvement)/icons/CheckIcon';

interface PasswordCondition {
  label: string;
  isValid: boolean;
}

export default function ResetPasswordNewPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const resetPasswordMutation = useResetPassword();

  // URL에서 token 파라미터 가져오기
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    setToken(tokenParam);
  }, [searchParams]);

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

  const handleSubmit = () => {
    if (isAllConditionsMet && token) {
      resetPasswordMutation.mutate({
        newPassword: password,
        token: token,
      });
    }
  };

  return (
    <>
      <OnboardingHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full ">
          <h1 className="text-title-3 font-bold text-label-normal mt-[9.06rem] leading-8">
            새로운 비밀번호를 입력해주세요
          </h1>

          <div className="flex flex-col gap-4 mt-5">
            <TextField
              placeholder="비밀번호"
              inputType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 비밀번호 조건 체크 */}
            <div className="flex flex-col gap-2">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckIcon
                    className={`w-5 h-5 ${
                      condition.isValid
                        ? 'text-primary-sub-1'
                        : 'text-label-alternative'
                    }`}
                  />
                  <span
                    className={`text-cation-1-normal ${
                      condition.isValid
                        ? 'text-primary-sub-1'
                        : 'text-label-alternative'
                    }`}
                  >
                    {condition.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto mb-10">
            <Button
              className="w-full"
              size="large"
              type="primary"
              disabled={
                !isAllConditionsMet || !token || resetPasswordMutation.isPending
              }
              onClick={handleSubmit}
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

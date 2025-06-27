'use client';

import { useState } from 'react';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { TextField, Button } from '@groble/ui';
import { useSignUp } from '@/features/account/sign-up/model/SignUpContext';
import { useIntegratedSignUp } from '@/features/account/sign-up/hooks/useIntegratedSignUp';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { CheckIcon } from '@/components/(improvement)/icons/CheckIcon';

interface PasswordCondition {
  label: string;
  isValid: boolean;
}

export default function PasswordSetupPage() {
  const { state, dispatch } = useSignUp();
  console.log(state);
  const [password, setPassword] = useState('');
  const integratedSignUpMutation = useIntegratedSignUp();

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

  // 에러 상태 결정
  const hasPasswordConditionError = password.length > 0 && !isAllConditionsMet;
  const hasApiError = !!integratedSignUpMutation.error;

  // 에러 우선순위: API 에러 > 비밀번호 조건 에러
  const displayError = hasApiError;
  const displayPasswordConditionError =
    !hasApiError && hasPasswordConditionError;

  const handleContinue = () => {
    if (
      isAllConditionsMet &&
      state.email &&
      state.userType &&
      state.termsTypes
    ) {
      // Context에 비밀번호 저장
      dispatch({ type: 'SET_PASSWORD', payload: password });

      // userType을 API 형식에 맞게 변환
      const userType = state.userType === 'maker' ? 'SELLER' : 'BUYER';

      // integrated sign-up API 호출
      integratedSignUpMutation.mutate({
        userType,
        termsTypes: state.termsTypes,
        email: state.email,
        password,
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 비밀번호 변경 시 API 에러 해제
    if (integratedSignUpMutation.error) {
      integratedSignUpMutation.reset();
    }
  };

  return (
    <>
      <OnboardingHeader back={'back'} />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 font-semibold md:text-title-3 md:font-bold text-label-normal md:mt-[13.91rem] ">
            사용할 비밀번호를 입력해주세요
          </h1>

          <div className="flex flex-col gap-4 mt-5">
            <TextField
              placeholder="비밀번호"
              inputType="password"
              value={password}
              onChange={handlePasswordChange}
              error={displayError || displayPasswordConditionError}
            />

            {/* API 에러 메시지 */}
            {displayError && (
              <div className="text-caption-1 text-status-error">
                {integratedSignUpMutation.error?.message ||
                  '회원가입 중 오류가 발생했습니다.'}
              </div>
            )}

            {/* 비밀번호 조건 체크 */}
            <div className="flex flex-col gap-2 ">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckIcon
                    className={`w-[20px] h-[20px] ${
                      condition.isValid
                        ? 'text-primary-sub-1'
                        : displayPasswordConditionError
                        ? 'text-status-error'
                        : 'text-label-alternative'
                    }`}
                  />
                  <span
                    className={`text-caption-1 ${
                      condition.isValid
                        ? 'text-primary-sub-1'
                        : displayPasswordConditionError
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

          {/* 다음 버튼 */}
          <div className="mt-auto mb-5">
            <Button
              onClick={handleContinue}
              disabled={
                !isAllConditionsMet || integratedSignUpMutation.isPending
              }
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              {integratedSignUpMutation.isPending ? <LoadingSpinner /> : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

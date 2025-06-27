'use client';

import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button, TextField } from '@groble/ui';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useSetNickname } from '@/features/account/sign-up/hooks/useSetNickname';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function NicknamePage() {
  const [nickname, setNickname] = useState('');
  const setNicknameMutation = useSetNickname();

  // 닉네임 유효성 검사 (2~15자)
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 15;

  // 에러 상태 결정
  const hasNicknameError = nickname.length > 0 && !isNicknameValid;
  const hasApiError = !!setNicknameMutation.error;

  // 에러 우선순위: API 에러 > 닉네임 형식 에러
  const displayError = hasApiError;
  const displayNicknameError = !hasApiError && hasNicknameError;

  const handleContinue = () => {
    if (isNicknameValid) {
      setNicknameMutation.mutate({ nickname });
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    // 닉네임 변경 시 API 에러 해제
    if (setNicknameMutation.error) {
      setNicknameMutation.reset();
    }
  };

  return (
    <>
      <OnboardingHeader back={'back'} />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 font-semibold md:text-title-3 md:font-bold text-label-normal md:mt-[9.06rem] ">
            닉네임을 알려주세요{' '}
          </h1>
          <p className="text-body-2-normal md:text-body-1-normal text-label-alternative mt-[0.12rem]">
            가입 후에도 수정할 수 있어요
          </p>
          <div className="mt-5">
            <TextField
              placeholder="닉네임"
              className="text-body-2-normal"
              inputType="text"
              value={nickname}
              onChange={handleNicknameChange}
              disabled={setNicknameMutation.isPending}
              error={displayError || displayNicknameError}
            />

            {/* API 에러 메시지 */}
            {displayError && (
              <div className="text-caption-1 text-status-error mt-3">
                {setNicknameMutation.error?.message ||
                  '닉네임 설정 중 오류가 발생했습니다.'}
              </div>
            )}

            {/* 닉네임 형식 안내 */}
            <span
              className={`flex mt-3 items-center gap-1 text-caption-1 ${
                displayNicknameError
                  ? 'text-status-error'
                  : 'text-label-alternative'
              }`}
            >
              <InfoCircledIcon className="w-4 h-4" />
              <p>2~15자 이내로 입력해주세요</p>
            </span>
          </div>

          <div className="mt-auto mb-5">
            <Button
              onClick={handleContinue}
              disabled={!isNicknameValid || setNicknameMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {setNicknameMutation.isPending ? <LoadingSpinner /> : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

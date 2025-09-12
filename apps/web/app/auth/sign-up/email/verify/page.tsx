'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button } from '@groble/ui';
import OTPInputComponent from '@/shared/ui/OTPInput';
import {
  useVerifyEmailCode,
  useResendEmailVerification,
} from '@/features/account/sign-up/hooks/useEmailVerification';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { SignUpProgressBar } from '@/features/account/sign-up/components/SignUpProgressBar';

function EmailVerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [verificationCode, setVerificationCode] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const verifyEmailCodeMutation = useVerifyEmailCode();
  const resendEmailMutation = useResendEmailVerification();

  // 4자리 입력되었는지 확인
  const isCodeComplete = verificationCode.length === 4;

  // API 에러 메시지 추출
  const apiError = verifyEmailCodeMutation.error;
  const apiErrorMessage = apiError
    ? (apiError as any)?.response?.data?.message ||
    (apiError as any)?.message ||
    '인증코드 확인 중 오류가 발생했습니다.'
    : '';

  const handleVerify = () => {
    if (isCodeComplete && email) {
      verifyEmailCodeMutation.mutate({
        email,
        verificationCode,
      });
    }
  };

  const handleResend = () => {
    if (email && !isResendDisabled) {
      resendEmailMutation.mutate({ email });
      setIsResendDisabled(true);
      setResendCountdown(60); // 60초 후 재전송 가능
    }
  };

  const handleCodeChange = (code: string) => {
    setVerificationCode(code);
    // 코드가 변경되면 mutation을 리셋하여 에러 상태 초기화
    if (verifyEmailCodeMutation.error) {
      verifyEmailCodeMutation.reset();
    }
  };

  // 카운트다운 타이머
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
  }, [resendCountdown, isResendDisabled]);

  return (
    <>
      <OnboardingHeader back="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 font-semibold md:text-title-3 md:font-bold text-label-normal md:mt-[9.06rem]">
            인증코드를 입력해주세요
          </h1>
          <p className="text-body-2-normal md:text-body-1-normal text-label-alternative mb-5 mt-[0.12rem]">
            <span className="text-label-normal">{email}</span>로 메일을 보냈어요
          </p>

          <div className="">
            <OTPInputComponent
              value={verificationCode}
              onChange={handleCodeChange}
              maxLength={4}
              disabled={verifyEmailCodeMutation.isPending}
              error={!!apiErrorMessage}
              errorText={apiErrorMessage}
            />
          </div>



          <div className="mt-auto">
            <div className="flex text-body-2-normal md:text-body-1-normal gap-2 mb-[1.13rem] justify-center">
              <p className="text-[#9DA3AB]">메일이 오지않았나요?</p>
              <p
                className={`cursor-pointer hover:underline ${isResendDisabled || resendEmailMutation.isPending
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-sub-1'
                  }`}
                onClick={handleResend}
              >
                {resendEmailMutation.isPending
                  ? '전송 중...'
                  : isResendDisabled
                    ? `재전송하기 (${resendCountdown}초)`
                    : '재전송하기'}
              </p>
            </div>
            <SignUpProgressBar />
          </div>

          {/* 인증하기 버튼 */}
          <div className="mb-5">
            <Button
              onClick={handleVerify}
              disabled={!isCodeComplete || verifyEmailCodeMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              {verifyEmailCodeMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                '이메일 인증 완료'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function EmailVerifyPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EmailVerifyContent />
    </Suspense>
  );
}

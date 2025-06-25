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

function EmailVerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [verificationCode, setVerificationCode] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const verifyEmailCodeMutation = useVerifyEmailCode();
  const resendEmailMutation = useResendEmailVerification();

  // 6자리 입력되었는지 확인
  const isCodeComplete = verificationCode.length === 6;

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
      <OnboardingHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full">
          <h1 className="text-title-3 font-bold text-label-normal mt-[9.06rem]">
            인증코드를 입력해주세요
          </h1>
          <p className="text-body-1-normal text-label-alternative mb-5 mt-[0.12rem]">
            <span className="text-label-normal">{email}</span>로 메일을 보냈어요
          </p>

          <div className="">
            <OTPInputComponent
              value={verificationCode}
              onChange={setVerificationCode}
              maxLength={6}
              disabled={verifyEmailCodeMutation.isPending}
            />
          </div>

          {/* 인증하기 버튼 */}
          <div className="mt-auto mb-8">
            <div className="flex text-body-1-normal gap-2 mb-[1.13rem] justify-center">
              <p className="text-[#9DA3AB]">메일이 오지않았나요?</p>
              <p
                className={`cursor-pointer hover:underline ${
                  isResendDisabled || resendEmailMutation.isPending
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
            <Button
              onClick={handleVerify}
              disabled={!isCodeComplete || verifyEmailCodeMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              {verifyEmailCodeMutation.isPending ? <LoadingSpinner /> : '다음'}
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

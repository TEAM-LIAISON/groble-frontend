'use client';

import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import {
  useResendPhoneVerification,
  useVerifyPhoneCode,
} from '@/features/account/sign-up/hooks/usePhoneVerification';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import OTPInputComponent from '@/shared/ui/OTPInput';
import { Button } from '@groble/ui';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function PhoneVerifyContent() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phoneNumber') || '';
  const [verificationCode, setVerificationCode] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const verifyPhoneCodeMutation = useVerifyPhoneCode();
  const resendPhoneMutation = useResendPhoneVerification();

  // 4자리 입력되었는지 확인
  const isCodeComplete = verificationCode.length === 4;

  // 에러 상태 관리
  const hasError = verifyPhoneCodeMutation.isError;
  const errorMessage = hasError
    ? '인증번호가 일치하지 않습니다. 다시 입력해주세요.'
    : '';

  const handleVerify = () => {
    if (isCodeComplete && phoneNumber) {
      verifyPhoneCodeMutation.mutate({
        phoneNumber,
        verificationCode,
      });
    }
  };

  const handleResend = () => {
    if (phoneNumber && !isResendDisabled) {
      resendPhoneMutation.mutate({ phoneNumber });
      setIsResendDisabled(true);
      setResendCountdown(60); // 60초 후 재전송 가능
      // 재전송 시 에러 상태 클리어
      verifyPhoneCodeMutation.reset();
    }
  };

  // 카운트다운 타이머
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (resendCountdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
  }, [resendCountdown, isResendDisabled]);

  // 인증번호 변경 시 에러 상태 클리어
  const handleCodeChange = (value: string) => {
    setVerificationCode(value);
    if (hasError) {
      verifyPhoneCodeMutation.reset();
    }
  };

  return (
    <>
      <OnboardingHeader back={'back'} />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 font-semibold md:text-title-3 md:font-bold text-label-normal md:mt-[9.06rem]">
            인증코드를 입력해주세요
          </h1>
          <p className="text-body-2-normal md:text-body-1-normal text-label-alternative mb-5 mt-[0.12rem]">
            <span className="text-label-normal">{phoneNumber}</span>로 문자를
            보냈어요
          </p>

          <div className="">
            <OTPInputComponent
              value={verificationCode}
              onChange={handleCodeChange}
              maxLength={4}
              disabled={verifyPhoneCodeMutation.isPending}
              error={hasError}
              errorText={errorMessage}
            />
          </div>

          {/* 인증하기 버튼 */}
          <div className="mt-auto mb-5">
            <div className="flex text-body-1-normal gap-2 mb-[1.13rem] justify-center">
              <p className="text-[#9DA3AB]">문자가 오지않았나요?</p>
              <p
                className={`cursor-pointer hover:underline ${
                  isResendDisabled || resendPhoneMutation.isPending
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-primary-sub-1'
                }`}
                onClick={handleResend}
              >
                {resendPhoneMutation.isPending
                  ? '전송 중...'
                  : isResendDisabled
                    ? `재전송하기 (${resendCountdown}초)`
                    : '재전송하기'}
              </p>
            </div>
            <Button
              onClick={handleVerify}
              disabled={!isCodeComplete || verifyPhoneCodeMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="medium"
            >
              {verifyPhoneCodeMutation.isPending ? <LoadingSpinner /> : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PhoneVerifyPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PhoneVerifyContent />
    </Suspense>
  );
}

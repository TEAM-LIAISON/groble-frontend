'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import { Button } from '@groble/ui';
import OTPInputComponent from '@/shared/ui/OTPInput';
import {
  useVerifyEmailChangeCode,
  useResendEmailChangeVerification,
  profileKeys,
} from '@/features/profile';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';

export default function EmailVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const email = searchParams.get('email') || '';
  const [verificationCode, setVerificationCode] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const verifyEmailCodeMutation = useVerifyEmailChangeCode();
  const resendEmailMutation = useResendEmailChangeVerification();

  // 4자리 입력되었는지 확인
  const isCodeComplete = verificationCode.length === 4;

  const handleVerify = () => {
    if (isCodeComplete && email) {
      verifyEmailCodeMutation.mutate(
        {
          email,
          verificationCode,
        },
        {
          onSuccess: async () => {
            // 이메일 변경 성공 후 프로필 쿼리 무효화
            await queryClient.invalidateQueries({
              queryKey: profileKeys.userDetail(),
            });

            // 사용자 정보 쿼리도 무효화
            await queryClient.invalidateQueries({
              queryKey: ['userInfo'],
            });

            // 프로필 페이지로 이동
            router.push('/users/profile');
          },
        }
      );
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
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full ">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem]">
            인증코드를 입력해주세요
          </h1>
          <p className="text-body-1-normal text-label-alternative mb-5 mt-[0.12rem]">
            <span className="text-label-normal">{email}</span>로 메일을 보냈어요
          </p>

          <div className="">
            <OTPInputComponent
              value={verificationCode}
              onChange={setVerificationCode}
              maxLength={4}
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
              size="large"
            >
              {verifyEmailCodeMutation.isPending ? <LoadingSpinner /> : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

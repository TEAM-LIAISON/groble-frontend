'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@groble/ui';
import WebHeader from '@/components/(improvement)/layout/header';
import OTPInputComponent from '@/shared/ui/OTPInput';
import {
  useVerifyEmailChangeCode,
  useResendEmailChangeVerification,
  profileKeys,
} from '@/features/profile';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';

function EmailVerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const email = searchParams.get('email') ?? '';
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(300); // 5분 = 300초
  const [resendCooldown, setResendCooldown] = useState(0); // 재전송 쿨다운

  const verifyMutation = useVerifyEmailChangeCode();
  const resendMutation = useResendEmailChangeVerification();

  // 인증 타이머 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 재전송 쿨다운 타이머
  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    if (verificationCode && email) {
      verifyMutation.mutate(
        { email, verificationCode },
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
    if (email && resendCooldown === 0) {
      resendMutation.mutate(
        { email },
        {
          onSuccess: () => {
            setTimer(300); // 인증 타이머 리셋
            setResendCooldown(60); // 60초 재전송 쿨다운
          },
        }
      );
    }
  };

  // 재전송 비활성화 조건
  const isResendDisabled = resendCooldown > 0;

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 md:text-title-3 font-semibold md:font-bold text-label-normal md:mt-[9.06rem] mb-[0.13rem]">
            인증번호를 입력해주세요
          </h1>
          <p className="text-body-2-normal md:text-body-1-normal text-label-alternative mb-5">
            {email}로 메일을 보냈어요
          </p>

          <div className="mb-4">
            <OTPInputComponent
              value={verificationCode}
              onChange={setVerificationCode}
              maxLength={4}
              disabled={verifyMutation.isPending}
            />
          </div>

          <div className="mt-auto mb-5 w-full">
            <div className="flex text-body-2-normal md:text-body-1-normal gap-2 mb-[1.13rem] justify-center">
              <p className="text-[#9DA3AB]">메일이 오지않았나요?</p>
              <p
                className={`cursor-pointer hover:underline ${
                  isResendDisabled || resendMutation.isPending
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-primary-sub-1'
                }`}
                onClick={handleResend}
              >
                {resendMutation.isPending
                  ? '전송 중...'
                  : isResendDisabled
                  ? `재전송하기 (${resendCooldown}초)`
                  : '재전송하기'}
              </p>
            </div>
            <Button
              onClick={handleVerify}
              disabled={!verificationCode || verifyMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {verifyMutation.isPending ? <LoadingSpinner /> : '인증 완료'}
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

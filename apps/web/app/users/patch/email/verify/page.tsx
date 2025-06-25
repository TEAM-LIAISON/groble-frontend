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

  const verifyMutation = useVerifyEmailChangeCode();
  const resendMutation = useResendEmailChangeVerification();

  // 타이머 효과
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
    if (email) {
      resendMutation.mutate({ email });
      setTimer(300); // 타이머 리셋
    }
  };

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem] mb-5">
            인증번호를 입력해주세요
          </h1>
          <p className="text-body-1-normal text-label-alternative mb-8">
            {email}으로 발송된 인증번호를 입력해주세요
          </p>

          <div className="mb-4">
            <OTPInputComponent
              value={verificationCode}
              onChange={setVerificationCode}
              maxLength={6}
              disabled={verifyMutation.isPending}
            />
          </div>

          <div className="flex justify-between items-center text-caption-1 mb-8">
            <span className="text-label-alternative">
              남은 시간: {formatTime(timer)}
            </span>
            <button
              onClick={handleResend}
              disabled={resendMutation.isPending || timer > 0}
              className="text-primary-normal disabled:text-label-disable"
            >
              {resendMutation.isPending ? '발송중...' : '재발송'}
            </button>
          </div>

          <div className="mt-auto mb-8 w-full">
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

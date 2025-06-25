'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button, TextField } from '@groble/ui';
import WebHeader from '@/components/(improvement)/layout/header';
import {
  useVerifyPhoneChangeCode,
  useResendPhoneChangeVerification,
} from '@/features/profile';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

function PhoneVerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phoneNumber = searchParams.get('phoneNumber') ?? '';
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(300); // 5분 = 300초

  const verifyMutation = useVerifyPhoneChangeCode();
  const resendMutation = useResendPhoneChangeVerification();

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
    if (verificationCode && phoneNumber) {
      verifyMutation.mutate(
        { phoneNumber, verificationCode },
        {
          onSuccess: () => {
            router.push('/users/profile');
          },
        }
      );
    }
  };

  const handleResend = () => {
    if (phoneNumber) {
      resendMutation.mutate({ phoneNumber });
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
            {phoneNumber}으로 발송된 인증번호를 입력해주세요
          </p>

          <div className="flex flex-col gap-2">
            <TextField
              placeholder="인증번호 6자리"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={verifyMutation.isPending}
            />
            <div className="flex justify-between items-center text-caption-1">
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

export default function PhoneVerifyPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PhoneVerifyContent />
    </Suspense>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@groble/ui';
import GuestTextField from '@/features/products/payment/components/GuestTextField';
import { useGuestAuth } from '@/features/products/payment/hooks/useGuestAuth';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export default function GuestOrderInquiry() {
  const router = useRouter();
  const {
    authState,
    setPhoneNumber,
    requestAuthCode,
    verifyAuthCode,
    isLoading,
    error,
  } = useGuestAuth();

  const [authCode, setAuthCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (authState.authenticated) {
      setIsVerified(true);
    }
  }, [authState.authenticated]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhoneNumber(formattedValue);
  };

  const handleRequestCode = () => {
    if (!authState.phoneNumber) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    requestAuthCode({ phoneNumber: authState.phoneNumber });
  };

  const handleVerifyCode = () => {
    if (!authCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    verifyAuthCode({
      phoneNumber: authState.phoneNumber,
      authCode,
    });
  };

  const handleOrderInquiry = () => {
    router.push('/account/purchases');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-4">
        {!isVerified && (
          <div className="flex gap-3">
            <GuestTextField
              type="tel"
              placeholder="휴대폰 번호를 입력해주세요"
              value={authState.phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={isVerified}
              maxLength={13}
              className="flex-1"
            />
            {authState.authStep === 'phone' && (
              <Button
                onClick={handleRequestCode}
                disabled={!authState.phoneNumber || isLoading}
                size="small"
                group="solid"
                type="primary"
                className="flex-shrink-0 bg-[#D8FFF4] text-primary-sub-1 opacity-100!"
              >
                {isLoading ? '전송 중...' : '인증번호 받기'}
              </Button>
            )}
          </div>
        )}
        {isVerified && (
          <GuestTextField
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요"
            value={authState.phoneNumber}
            disabled={true}
            maxLength={13}
          />
        )}
        {authState.authStep === 'verify' && !isVerified && (
          <div className="flex gap-3">
            <GuestTextField
              type="tel"
              placeholder="인증번호를 입력해주세요"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={6}
              className="flex-1"
            />
            <Button
              onClick={handleVerifyCode}
              disabled={!authCode || isLoading}
              size="small"
              group="solid"
              type="primary"
              className="flex-shrink-0 bg-[#D8FFF4] text-primary-sub-1 opacity-100!"
            >
              {isLoading ? '인증 중...' : '인증 완료'}
            </Button>
          </div>
        )}
        {isVerified && (
          <>
            <div className="flex items-center gap-2 text-status-success mb-[22px]">
              <InfoCircledIcon />
              <span className="text-sm font-medium">인증이 완료되었습니다</span>
            </div>

            <Button
              onClick={handleOrderInquiry}
              className="w-full"
              size="medium"
              group="solid"
              type="primary"
            >
              비회원 주문조회
            </Button>
          </>
        )}
        {error && (
          <div className="rounded-lg bg-red-50 p-3">
            <p className="text-sm text-red-600">
              {error.message || '인증에 실패했습니다.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import { Button, TextField } from '@groble/ui';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSendPhoneChangeVerification } from '@/features/profile';
import {
  handlePhoneNumberInput,
  isValidPhoneNumber,
} from '@/lib/utils/phoneUtils';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

function PatchPhoneContent() {
  const searchParams = useSearchParams();
  const currentPhone = searchParams.get('phone') ?? '';
  const [phoneNumber, setPhoneNumber] = useState(currentPhone);
  const phoneVerificationMutation = useSendPhoneChangeVerification();

  // 전화번호 유효성 검사
  const isPhoneValid = isValidPhoneNumber(phoneNumber);

  // 현재 전화번호와 다른지 확인
  const isPhoneChanged = phoneNumber !== currentPhone;

  // 버튼 활성화 조건: 유효한 전화번호 + 기존 전화번호와 다름
  const canProceed = isPhoneValid && isPhoneChanged;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = handlePhoneNumberInput(e.target.value);
    setPhoneNumber(formattedPhone);
  };

  const handleContinue = () => {
    if (canProceed) {
      phoneVerificationMutation.mutate({ phoneNumber });
    }
  };

  return (
    <>
      <WebHeader />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full px-5">
          <h1 className="text-title-3 font-bold text-label-normal mt-[13.91rem] mb-5">
            새로운 전화번호를 입력해주세요
          </h1>

          <div className="flex flex-col gap-2">
            <TextField
              placeholder="전화번호"
              value={phoneNumber}
              onChange={handlePhoneChange}
              disabled={phoneVerificationMutation.isPending}
            />
          </div>

          <div className="mt-auto mb-8 w-full">
            <Button
              onClick={handleContinue}
              disabled={!canProceed || phoneVerificationMutation.isPending}
              className="w-full"
              group="solid"
              type="primary"
              size="large"
            >
              {phoneVerificationMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                '다음'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PatchPhonePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PatchPhoneContent />
    </Suspense>
  );
}

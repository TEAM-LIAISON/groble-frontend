'use client';

import OnboardingHeader from '@/components/(improvement)/layout/header/OnboardingHeader';
import { Button, TextField } from '@groble/ui';
import { useState } from 'react';
import { usePhoneVerification } from '@/features/account/sign-up/hooks/usePhoneVerification';
import {
  handlePhoneNumberInput,
  isValidPhoneNumber,
} from '@/lib/utils/phoneUtils';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function PhoneRequestPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneVerificationMutation = usePhoneVerification();

  // 전화번호 유효성 검사
  const isPhoneValid = isValidPhoneNumber(phoneNumber);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = handlePhoneNumberInput(e.target.value);
    setPhoneNumber(formattedPhone);
  };

  const handleContinue = () => {
    if (isPhoneValid) {
      phoneVerificationMutation.mutate({ phoneNumber });
    }
  };

  return (
    <>
      <OnboardingHeader back={'back'} />
      <div className="w-full flex justify-center h-[calc(100vh-68px)]">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <h1 className="text-heading-1 font-semibold md:text-title-3 md:font-bold text-label-normal md:mt-[9.06rem]">
            전화번호를 알려주세요{' '}
          </h1>
          <p className="text-body-2-normal md:text-body-1-normal text-label-alternative mt-[0.12rem]">
            가입 후에도 변경할 수 있어요{' '}
          </p>
          <div className="flex flex-col mt-5 gap-2">
            <TextField
              placeholder="전화번호"
              value={phoneNumber}
              onChange={handlePhoneChange}
              disabled={phoneVerificationMutation.isPending}
            />
          </div>

          <div className="mt-auto mb-5 w-full">
            <Button
              onClick={handleContinue}
              disabled={!isPhoneValid || phoneVerificationMutation.isPending}
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

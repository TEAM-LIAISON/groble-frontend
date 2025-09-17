'use client';

import { Button } from '@groble/ui';
import GuestTextField from './GuestTextField';
import GuestAuthCard from './GuestAuthCard';

interface GuestAuthPhoneStepProps {
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestCode: () => void;
  isLoading: boolean;
  error: Error | null;
}

export default function GuestAuthPhoneStep({
  phoneNumber,
  onPhoneNumberChange,
  onRequestCode,
  isLoading,
  error,
}: GuestAuthPhoneStepProps) {
  return (
    <>
      <div className='flex gap-2 items-end'>
        <div className="flex-1">
          <GuestTextField
            placeholder="휴대폰 번호"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            type="tel"
          />
        </div>
        <Button
          onClick={onRequestCode}
          disabled={!phoneNumber || isLoading}
          className={`flex-shrink-0 h-11 ${phoneNumber ? 'text-primary-sub-1' : ''}`}
          size="small"
          group="solid"
          type={phoneNumber ? 'tertiary' : 'secondary'}
        >
          {isLoading ? '요청 중...' : '인증번호 받기'}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-sm text-red-600">
            인증번호 요청에 실패했습니다.
          </p>
        </div>
      )}
    </>
  );
}



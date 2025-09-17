'use client';

import { Button } from '@groble/ui';
import GuestTextField from './GuestTextField';
import GuestAuthCard from './GuestAuthCard';

interface GuestAuthVerifyStepProps {
  phoneNumber: string;
  authCode: string;
  onAuthCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerifyCode: () => void;
  isLoading: boolean;
  error: Error | null;
}

export default function GuestAuthVerifyStep({
  phoneNumber,
  authCode,
  onAuthCodeChange,
  onVerifyCode,
  isLoading,
  error,
}: GuestAuthVerifyStepProps) {
  return (
    <>
      <GuestTextField
        value={phoneNumber}
        disabled
      />

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <GuestTextField
            placeholder="인증번호를 입력해주세요"
            value={authCode}
            onChange={onAuthCodeChange}
            maxLength={6}
          />
        </div>
        <Button
          onClick={onVerifyCode}
          disabled={!authCode || isLoading}
          className={`flex-shrink-0 h-11 ${authCode ? 'text-primary-sub-1' : ''}`}
          size="small"
          group="solid"
          type={authCode ? 'tertiary' : 'secondary'}
        >
          {isLoading ? '인증 중...' : '인증 완료'}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-sm text-red-600">
            {error.message || '인증번호 검증에 실패했습니다.'}
          </p>
        </div>
      )}
    </>
  );
}



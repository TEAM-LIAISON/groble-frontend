'use client';

import { Button } from '@groble/ui';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import GuestTextField from './GuestTextField';

interface GuestAuthInfoStepProps {
  phoneNumber: string;
  username: string;
  email: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateInfo: () => void;
  isLoading: boolean;
  error: Error | null;
}

export default function GuestAuthInfoStep({
  phoneNumber,
  username,
  email,
  onUsernameChange,
  onEmailChange,
  onUpdateInfo,
  isLoading,
  error,
}: GuestAuthInfoStepProps) {
  return (
    <>
      <div className="space-y-4">
        <GuestTextField
          type="text"
          value={phoneNumber}
          disabled
        />

        <div className="flex items-center gap-1 text-green-600">
          <InfoCircledIcon />
          <span className="text-sm font-medium">인증이 완료됐어요</span>
        </div>

        <div>
          <GuestTextField
            type="text"
            value={username}
            onChange={onUsernameChange}
            placeholder="이름 또는 닉네임"
          />
        </div>

        <div>
          <GuestTextField
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="이메일"
          />
        </div>


        {error && (
          <div className="rounded-lg bg-red-50 p-3">
            <p className="text-sm text-red-600">
              {error.message || '정보 입력에 실패했습니다.'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}



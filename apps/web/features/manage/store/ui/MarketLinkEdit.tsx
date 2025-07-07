'use client';

import { useState } from 'react';
import { TextField } from '@groble/ui';
import { checkMarketLinkAvailability } from '../../api/storeApi';

interface MarketLinkEditProps {
  value: string;
  onChange: (value: string) => void;
  onVerificationChange?: (isVerified: boolean) => void;
}

export function MarketLinkEdit({
  value,
  onChange,
  onVerificationChange,
}: MarketLinkEditProps) {
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [urlStatus, setUrlStatus] = useState<
    'idle' | 'checking' | 'available' | 'unavailable'
  >('idle');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    // 입력값이 변경되면 상태 초기화
    setUrlStatus('idle');
    // URL이 변경되면 확인 상태 리셋
    onVerificationChange?.(false);

    // 간단한 URL 유효성 검사
    if (inputValue.length > 0) {
      const isValid = inputValue.length >= 3 && inputValue.length <= 32;
      setIsValidUrl(isValid);
    } else {
      setIsValidUrl(true);
    }
  };

  const handleCheckUrl = async () => {
    if (!value || value.length < 3) {
      setIsValidUrl(false);
      return;
    }

    setIsLoading(true);
    setUrlStatus('checking');

    try {
      const response = await checkMarketLinkAvailability(value);

      // status가 "SUCCESS"이고 code가 200이면 사용 가능
      if (response.status === 'SUCCESS' && response.code === 200) {
        setUrlStatus('available');
        onVerificationChange?.(true);
      } else {
        setUrlStatus('unavailable');
        onVerificationChange?.(false);
      }
    } catch (error) {
      console.error('URL 확인 중 오류:', error);
      // 409 에러 (이미 사용 중) 또는 기타 에러 시 사용 불가능
      setUrlStatus('unavailable');
      onVerificationChange?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusMessage = () => {
    switch (urlStatus) {
      case 'checking':
        return {
          message: 'URL을 확인하고 있습니다...',
          color: 'text-label-alternative',
        };
      case 'available':
        return { message: '사용가능한 URL입니다.', color: 'text-green-500' };
      case 'unavailable':
        return { message: '사용할 수 없는 URL이에요', color: 'text-red-500' };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-body-2-normal font-bold text-label-normal flex">
        마켓 링크 <p className=" text-primary-sub-1 ml-1">*</p>
      </h2>
      <hr className="my-3 border-line-normal" />

      <div className="flex flex-col">
        <span className="text-label-1-reading font-semibold text-label-normal">
          groble.im/
        </span>
        <div className="relative">
          <div className="flex mt-1 gap-2">
            <TextField
              value={value}
              onChange={handleInputChange}
              placeholder="생성할 링크를 적어주세요"
              maxLength={32}
              error={!isValidUrl && value.length > 0}
              className="flex-1 w-[20rem]"
            />

            <button
              type="button"
              onClick={handleCheckUrl}
              disabled={!value || value.length < 3 || isLoading}
              className="h-[2.5rem] px-4 py-2 rounded-lg text-body-2-normal text-label-neutral cursor-pointer border border-line-normal disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-alternative transition-colors"
            >
              {isLoading ? '확인중...' : '확인하기'}
            </button>
          </div>

          {/* 상태 메시지 - TextField 바로 아래 absolute positioning */}
          {statusMessage && (
            <div className="absolute top-14 left-0 mt-1 z-10">
              <span
                className={`text-caption-1 font-normal ${statusMessage.color}`}
              >
                {statusMessage.message}
              </span>
            </div>
          )}

          {/* 유효성 검사 에러 메시지 - absolute positioning */}
          {!isValidUrl && value.length > 0 && !statusMessage && (
            <div className="absolute top-14 left-0 mt-1 z-10">
              <span className="text-caption-1 font-normal text-status-error">
                URL이 유효하지 않습니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

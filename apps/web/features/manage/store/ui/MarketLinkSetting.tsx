'use client';

import { useState } from 'react';

/**
 * 마켓 링크 설정 컴포넌트
 */
interface MarketLinkSettingProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarketLinkSetting({
  value,
  onChange,
}: MarketLinkSettingProps) {
  const [isAvailable, setIsAvailable] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        <h3 className="text-body-1-semibold text-label-normal">마켓 링크</h3>
        <span className="text-system-error">*</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-body-2-normal text-label-normal">groble.im/</span>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="사용할 링크를 적어주세요"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-line-normal rounded-lg 
                       focus:border-primary-normal focus:outline-none
                       placeholder:text-label-alternative"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-body-3-normal text-label-alternative hover:text-system-error"
            >
              ✕
            </button>
          )}
        </div>
        <button className="px-4 py-2 border border-line-normal rounded-lg hover:bg-surface-neutral transition-colors">
          <span className="text-body-2-normal text-label-normal">확인하기</span>
        </button>
      </div>

      {isAvailable && (
        <p className="text-body-3-normal text-green-600">
          사용가능한 URL입니다.
        </p>
      )}

      <p className="text-body-3-normal text-label-alternative">
        {value.length}/32
      </p>
    </div>
  );
}

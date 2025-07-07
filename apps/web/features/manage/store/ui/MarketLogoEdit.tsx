'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface MarketLogoEditProps {
  logoUrl?: string;
  onLogoChange: (file: File | null) => void;
}

export function MarketLogoEdit({ logoUrl, onLogoChange }: MarketLogoEditProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onLogoChange(file);
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-body-2-normal font-bold text-label-normal">
        마켓 로고 이미지
      </h2>
      <hr className="my-3 border-line-normal" />

      <div className="relative">
        <div
          className="w-[4rem] h-[4rem] rounded-full relative cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <Image
            src={logoUrl || '/assets/common/icons/Avatar.svg'}
            alt="마켓 로고"
            fill
            className="rounded-full object-cover"
          />
          <div
            className="w-6 h-6 border-[1.5px] border-white bg-primary-sub-1 rounded-full flex items-center justify-center absolute bottom-0 right-0 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleLogoClick();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50016 3.16602C7.50016 2.88987 7.72402 2.66602 8.00016 2.66602C8.27631 2.66602 8.50016 2.88987 8.50016 3.16602L8.50016 7.49935L12.8335 7.49935C13.1096 7.49935 13.3335 7.72321 13.3335 7.99935C13.3335 8.27549 13.1096 8.49935 12.8335 8.49935L8.50016 8.49935L8.50016 12.8327C8.50016 13.1088 8.27631 13.3327 8.00016 13.3327C7.72402 13.3327 7.50016 13.1088 7.50016 12.8327L7.50016 8.49935L3.16683 8.49935C2.89069 8.49935 2.66683 8.27549 2.66683 7.99935C2.66683 7.72321 2.89069 7.49935 3.16683 7.49935L7.50016 7.49935L7.50016 3.16602Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-caption-1 font-normal text-label-alternative mt-4">
        250 x 250 픽셀에 최적화되어 있으며, 5MB 이하의 JPG, PNG 파일을
        지원합니다.
      </p>
    </div>
  );
}

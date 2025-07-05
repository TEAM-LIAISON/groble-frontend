'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface MarketLogoEditProps {
  logoUrl?: string;
  onLogoChange: (file: File | null) => void;
}

export function MarketLogoEdit({ logoUrl, onLogoChange }: MarketLogoEditProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onLogoChange(file);
    setIsDropdownOpen(false);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
    setIsDropdownOpen(false);
  };

  const handleUrlInputClick = () => {
    setShowUrlInput(true);
    setIsDropdownOpen(false);
  };

  const handleUrlSubmit = () => {
    // URL 처리 로직 (실제 구현에서는 URL을 통해 이미지 로드)
    console.log('URL 입력:', urlInput);
    setShowUrlInput(false);
    setUrlInput('');
  };

  const handleLogoClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-body-2-normal font-bold text-label-normal">
        마켓 로고 이미지
      </h2>
      <hr className="my-3 border-line-normal" />

      <div className="relative">
        <div
          className="w-[4rem] h-[4rem] rounded-full relative cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image
            src={logoUrl || '/assets/common/icons/Avatar.svg'}
            alt="마켓 로고"
            fill
            className="rounded-full"
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

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-line-normal rounded-lg shadow-lg z-10 min-w-[200px]">
            <button
              type="button"
              onClick={handleFileUploadClick}
              className="w-full px-4 py-3 text-left text-label-1-normal font-semibold hover:bg-background-alternative transition-colors"
            >
              파일 업로드
            </button>
            <button
              type="button"
              onClick={handleUrlInputClick}
              className="w-full px-4 py-3 text-left text-label-1-normal font-semibold hover:bg-background-alternative transition-colors border-t border-line-normal"
            >
              URL로 추가
            </button>
          </div>
        )}

        {/* URL 입력창 */}
        {showUrlInput && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-line-normal rounded-lg shadow-lg z-10 p-4 min-w-[300px]">
            <h3 className="text-body-2-semibold text-label-normal mb-3">
              이미지 URL 입력
            </h3>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 border border-line-normal rounded-lg text-label-1-normal outline-none focus:border-primary-normal"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-primary-normal text-white rounded-lg hover:bg-primary-strong transition-colors text-label-1-semibold"
              >
                확인
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="mt-2 text-label-1-normal text-label-alternative hover:text-label-normal"
            >
              취소
            </button>
          </div>
        )}

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

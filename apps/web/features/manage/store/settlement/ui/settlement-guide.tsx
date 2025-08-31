'use client';

import { InformationIcon } from '@/components/(improvement)/icons/InformationIcon';
import { useState } from 'react';

export default function SettlementGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full bg-[#E5F6FE] rounded-xl mb-6">
      {/* 헤더 */}
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between py-5 px-4 text-left cursor-pointer"
        aria-expanded={isExpanded}
        aria-controls="settlement-guide-content"
      >
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 1.33203C11.6819 1.33203 14.667 4.31713 14.667 7.99902C14.667 11.6809 11.6819 14.666 8 14.666C4.3181 14.666 1.33301 11.6809 1.33301 7.99902C1.33301 4.31713 4.3181 1.33203 8 1.33203ZM8 2.33203C4.87039 2.33203 2.33301 4.86941 2.33301 7.99902C2.33301 11.1286 4.87039 13.666 8 13.666C11.1296 13.666 13.667 11.1286 13.667 7.99902C13.667 4.86941 11.1296 2.33203 8 2.33203ZM8.5 11.332H7.5V7.33203H8.5V11.332ZM8.5 5.66602H7.5V4.66602H8.5V5.66602Z"
              fill="#0066FF"
            />
          </svg>
          <span className="text-[#06F] text-label-1-normal font-semibold">
            정산 주기
          </span>
        </div>
        <div className="flex items-center">
          <svg
            className={`w-5 h-5 text-blue-500 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* 컨텐츠 */}
      <div
        id="settlement-guide-content"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 ">
          <div className="flex flex-col md:flex-row md:gap-[4.5rem] gap-5 text-caption-1">
            {/* 자료형 콘텐츠 */}
            <div>
              <h3 className=" font-semibold text-label-normal">
                자료형 콘텐츠 (월 4회 정산)
              </h3>
              <div className="space-y-1 mt-2">
                <div className="flex gap-3">
                  <span className="min-w-[3.75rem]">1일 정산</span>
                  <span>| 전월 16일 ~ 23일 결제 건</span>
                </div>
                <div className="flex gap-3">
                  <span className="min-w-[3.75rem]">8일 정산</span>
                  <span>| 전월 24일 ~ 말일 결제 건</span>
                </div>
                <div className="flex gap-3">
                  <span className="min-w-[3.75rem]">16일 정산</span>
                  <span>| 당월 1일 ~ 7일 결제 건</span>
                </div>
                <div className="flex gap-3">
                  <span className="min-w-[3.75rem]">24일 정산</span>
                  <span>| 당월 8일 ~ 15일 결제 건</span>
                </div>
              </div>
            </div>

            {/* 서비스형 콘텐츠 */}
            <div>
              <h3 className="font-semibold text-label-normal">
                서비스형 콘텐츠 (월 2회 정산)
              </h3>
              <div className="space-y-1 mt-2">
                <div className="flex gap-3">
                  <span className="min-w-[3.75rem]">1일 정산</span>
                  <span>| 전월 1일 ~ 15일 결제 건</span>
                </div>
                <div className="flex gap-3">
                  <span className="min-w-[3.75rem]">16일 정산</span>
                  <span>| 전월 16일 ~ 말일 결제 건</span>
                </div>
              </div>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="mt-3 pb-5">
            <p className="text-caption-1 text-label-alternative">
              ※ 정산일이 주말 또는 공휴일일 경우 그 다음 평일에 정산이
              진행됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

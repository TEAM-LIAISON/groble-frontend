'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GrobleLogo } from '../../icons';

interface OnboardingHeaderProps {
  back?: string | 'back';
  close?: boolean;
}

/**
 * 온보딩 페이지용 헤더 컴포넌트
 * 로고만 왼쪽에 배치된 간단한 헤더
 */
export default function OnboardingHeader({
  back,
  close,
}: OnboardingHeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (back === 'back') {
      router.back();
    } else if (back) {
      router.push(back);
    }
  };

  const handleCloseClick = () => {
    router.push('/');
  };

  const hasProps = back || close;

  return (
    <header className="sticky top-0 z-50 border-line-normal bg-background-normal md:border-b">
      {/* 데스크탑 헤더 */}
      <div className="hidden h-[66px] items-center px-5 md:flex">
        <div className="flex items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <GrobleLogo variant="row" width={127} height={40} />
          </Link>
        </div>
      </div>

      {/* 모바일 헤더 */}
      <div className="flex h-[60px] items-center justify-between pl-3 pr-5 md:hidden">
        {/* 왼쪽: 뒤로가기 버튼 */}
        <div className="flex items-center">
          {back && (
            <button
              onClick={handleBackClick}
              className="flex items-center justify-center w-6 h-6"
              aria-label="뒤로가기"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 중앙: 로고 (props가 없을 때만) */}
        {!hasProps && (
          <Link href="/" className="flex items-center">
            <GrobleLogo variant="default" width={24} height={24} />
          </Link>
        )}

        {/* 오른쪽: 닫기 버튼 */}
        <div className="flex items-center">
          {close && (
            <button
              onClick={handleCloseClick}
              className="flex items-center justify-center w-6 h-6"
              aria-label="홈으로"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

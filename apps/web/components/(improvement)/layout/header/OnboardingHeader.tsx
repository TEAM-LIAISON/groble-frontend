'use client';

import Link from 'next/link';
import { GrobleLogo } from '../../icons';

/**
 * 온보딩 페이지용 헤더 컴포넌트
 * 로고만 왼쪽에 배치된 간단한 헤더
 */
export default function OnboardingHeader() {
  return (
    <header className="sticky top-0 z-50 border-line-normal bg-background-normal border-b">
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
      <div className="flex h-[60px] items-center px-5 md:hidden">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <GrobleLogo variant="default" width={24} height={24} />
        </Link>
      </div>
    </header>
  );
}

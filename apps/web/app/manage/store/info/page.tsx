/**
 * 마켓 관리 페이지
 * 마켓의 기본 정보를 설정하고 관리하는 페이지
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { BasicInfoViewSection } from '@/features/manage/store/ui';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';

export const metadata: Metadata = {
  title: '그로블 - 마켓관리',
};

/**
 * 마켓 관리 페이지 컴포넌트
 */
export default function StoreInfoPage() {
  return (
    <>
      <header className="">
        <MobileStoreHeader title="마켓 관리" back="back" />
      </header>
      <div className="md:mt-16 mx-auto rounded-xl bg-white  md:px-9 md:py-12 py-5 shadow-card">
        {/* 메인 콘텐츠 */}
        <main className="">
          <BasicInfoViewSection />
        </main>
      </div>
    </>
  );
}

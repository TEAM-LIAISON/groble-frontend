/**
 * 마켓 관리 페이지
 * 마켓의 기본 정보를 설정하고 관리하는 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { BasicInfoViewSection } from '@/features/manage/store/ui';

export const metadata: Metadata = {
  title: '마켓 관리 - 스토어 관리',
  description: '마켓의 기본 정보를 설정하고 관리합니다.',
};

/**
 * 마켓 관리 페이지 컴포넌트
 */
export default function StoreInfoPage() {
  return (
    <div className="mx-auto mt-6 rounded-xl bg-white px-9 py-12">
      {/* 페이지 헤더 */}
      <header className=""></header>

      {/* 메인 콘텐츠 */}
      <main className="">
        <BasicInfoViewSection />
        {/* <OperationInfoViewSection /> */}
      </main>
    </div>
  );
}

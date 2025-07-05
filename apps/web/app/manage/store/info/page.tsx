/**
 * 마켓 관리 페이지
 * 마켓의 기본 정보를 설정하고 관리하는 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import {
  BasicInfoViewSection,
  OperationInfoViewSection,
} from '@/features/manage/store/ui';

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
      <header className="">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-1 font-bold text-label-normal">
            마켓 관리
          </h1>
          <div className="flex gap-[0.62rem]">
            <Link
              href="/manage/store/info/edit"
              className="px-3 py-[0.62rem] rounded-lg text-body-1-normal text-label-alternative"
            >
              미리보기
            </Link>
            <Link
              href="/manage/store/info/edit"
              className="px-4 py-[0.62rem] rounded-lg text-body-1-normal text-label-normal font-semibold bg-component-fill-normal hover:brightness-95"
            >
              수정하기
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="">
        <BasicInfoViewSection />
        {/* <OperationInfoViewSection /> */}
      </main>
    </div>
  );
}

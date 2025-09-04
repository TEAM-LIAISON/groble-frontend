'use client';

import ContentHitsViewList from '@/features/manage/store/dashboard/hits/ui/content-hits-view-list';
import ContentHitsReferrerList from '@/features/manage/store/dashboard/hits/ui/content-hits-referrer-list';
import ContentTitleDisplay from '@/features/manage/store/dashboard/hits/ui/content-title-display';
import PeriodFilterBtn from '@/features/manage/store/dashboard/ui/period-filter-btn';
import ManagePageSection from '@/features/manage/store/ui/manage-page-section';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// useSearchParams를 사용하는 컴포넌트
function DashboardHitsProductContent() {
  'use client';

  const searchParams = useSearchParams();
  const contentId = searchParams.get('id');

  if (!contentId) {
    return (
      <>
        <MobileStoreHeader title="콘텐츠 조회수" />
        <div className="flex items-center justify-center min-h-[calc(100vh-162px)]">
          <p className="text-label-normal">콘텐츠 ID가 필요합니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileStoreHeader title="콘텐츠 조회수" />
      <h2 className="md:mt-16 md:mb-4 text-heading-1 font-bold text-label-normal md:block hidden">
        콘텐츠 조회수
      </h2>

      <ManagePageSection className="space-y-5 md:space-y-[3rem] min-h-[calc(100vh-162px)]">
        <ContentTitleDisplay contentId={contentId} />
        <PeriodFilterBtn />

        {/* 콘텐츠 날짜별 조회수 리스트 */}
        <ContentHitsViewList contentId={contentId} />

        {/* 콘텐츠 유입경로 리스트 */}
        <ContentHitsReferrerList contentId={contentId} />
      </ManagePageSection>
    </>
  );
}

export default function DashboardHitsProductPage() {
  return <Suspense>{/* <DashboardHitsProductContent /> */}</Suspense>;
}

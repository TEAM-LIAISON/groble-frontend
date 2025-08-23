'use client';
import { ChevronIcon } from '@/components/(improvement)/icons';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getDashboardOverview } from '../api/get-dashboard-data';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MakerCertficationBubble from '@/entities/maker/ui/maker-certfication-bubble';

export default function DashboardCardList() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-card-list'],
    queryFn: getDashboardOverview,
  });
  const overview = data?.data;
  const currentMonth = new Date().getMonth() + 1; // getMonth()는 0~11 반환하므로 +1

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {overview?.verificationStatus && <MakerCertficationBubble />}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
        {/* 카드 1 */}
        <div className="p-6 rounded-xl bg-background-alternative flex flex-col">
          <p className="md:text-body-1-normal text-body-2-normal font-semibold text-label-normal">
            총 수익
          </p>
          <hr className="my-3 border-line-normal" />

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative">
            수익
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {Math.floor(overview?.totalRevenue ?? 0).toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              원
            </span>
          </p>

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative mt-3">
            건수
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {/* 소수점 내림 처리 */}
            {Math.floor(overview?.totalSalesCount ?? 0).toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              건
            </span>
          </p>
        </div>

        {/* 카드 2 */}
        <div className="p-6 rounded-xl bg-background-alternative flex flex-col">
          <p className="md:text-body-1-normal text-body-2-normal font-semibold text-label-normal">
            {currentMonth}월 수익
          </p>
          <hr className="my-3 border-line-normal" />

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative">
            수익
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {Math.floor(overview?.currentMonthRevenue ?? 0).toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              원
            </span>
          </p>

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative mt-3">
            건수
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {overview?.currentMonthSalesCount.toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              건
            </span>
          </p>
        </div>

        {/* 카드 3 */}
        <Link
          href="/manage/store/hits"
          className="p-6 rounded-xl bg-background-alternative flex flex-col"
        >
          <span className="flex justify-between">
            <p className="md:text-body-1-normal text-body-2-normal font-semibold text-label-normal">
              조회수
            </p>
            <ChevronIcon className="text-label-assistive" />
          </span>
          <hr className="my-3 border-line-normal" />

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative">
            마켓
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {overview?.totalMarketViews.toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              회
            </span>
          </p>

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative mt-3">
            콘텐츠
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {overview?.totalContentViews.toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              회
            </span>
          </p>
        </Link>

        {/* 카드 4 */}
        <div className="p-6 rounded-xl bg-background-alternative flex flex-col">
          <span className="flex justify-between">
            <p className="md:text-body-1-normal text-body-2-normal font-semibold text-label-normal">
              고객 수
            </p>
            {/* 추후 추가 */}
            {/* <ChevronIcon className="text-label-assistive" /> */}
          </span>
          <hr className="my-3 border-line-normal" />

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative">
            전체
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {overview?.totalCustomers.toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              명
            </span>
          </p>

          <span className="text-label-1-normal md:text-body-2-normal font-semibold text-label-alternative mt-3">
            신규
          </span>
          <p className="flex text-headline-1 md:text-heading-1 font-bold text-primary-sub-1 items-center md:items-end gap-[0.12rem]">
            {overview?.recentCustomers.toLocaleString()}
            <span className="md:text-headline-1 text-body-2-normal font-medium text-primary-sub-1">
              명
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

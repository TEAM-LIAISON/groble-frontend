'use client';

import { useQuery } from '@tanstack/react-query';
import { getMarketViewStats } from '../api/get-market-view-stats';
import { useSearchParams } from 'next/navigation';
import NoContent from '@/shared/ui/NoContent';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import Pagination from '@/shared/ui/Pagination';

export default function MarketHitsViewList() {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') ?? 'TODAY';
  const pageFromUrl = Number(searchParams.get('viewPage')) ?? 1;
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  const size = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['market-hits-view-list', period, page, size],
    queryFn: () => {
      return getMarketViewStats(period, page, size);
    },
    select: (res) => ({
      items: res.items ?? [],
      pageInfo: res.pageInfo ?? {
        currentPage: page,
        totalPages: 0,
        pageSize: size,
        totalElements: 0,
        first: true,
        last: true,
        empty: true,
      },
    }),
  });

  return (
    <div className="flex flex-col">
      <h3 className="text-body-1-normal md:text-headline-1 font-bold text-label-normal">
        조회수
      </h3>
      <hr className="mt-3 border-label-normal" />

      <div className="flex flex-col">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full mt-10">
            <LoadingSpinner />
          </div>
        )}

        {data?.items.map((item, idx) => (
          <div
            className="flex justify-between gap-10"
            key={`${item.viewDate}-${idx}`}
          >
            <div className="py-3 flex gap-8 text-body-2-normal border-b border-line-normal flex-1">
              <span className="text-label-normal font-semibold">
                {item.viewDate} ({item.dayOfWeek})
              </span>
            </div>
            <div className="px-3 bg-background-alternative w-[7.5rem] text-body-2-normal font-bold">
              <div className="border-b border-line-normal w-full py-3">
                {item.viewCount}회
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {(data?.pageInfo?.totalPages ?? 0) > 1 && (
        <div className="mt-3">
          <Pagination
            currentPage={(data?.pageInfo?.currentPage ?? 0) + 1}
            totalPages={data?.pageInfo?.totalPages ?? 0}
            pageParamName="viewPage"
          />
        </div>
      )}
    </div>
  );
}

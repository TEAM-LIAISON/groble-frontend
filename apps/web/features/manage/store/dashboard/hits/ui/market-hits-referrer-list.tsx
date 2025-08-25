'use client';

import { useQuery } from '@tanstack/react-query';
import { getMarketReferrerStats } from '../api/get-market-referrer-stats';
import { useSearchParams } from 'next/navigation';
import NoContent from '@/shared/ui/NoContent';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import Pagination from '@/shared/ui/Pagination';

export default function MarketHitsReferrerList() {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') ?? 'TODAY';
  const pageFromUrl = Number(searchParams.get('referrerPage')) ?? 1;
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  const size = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['market-hits-referrer-list', period, page, size],
    queryFn: () => {
      return getMarketReferrerStats(period, page, size);
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
        유입 경로
      </h3>
      <hr className="mt-3 border-label-normal" />

      <div className="flex flex-col">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full mt-10">
            <LoadingSpinner />
          </div>
        )}

        {data?.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full mt-10">
            <NoContent size="small" message="아직 유입 경로가 없어요" />
          </div>
        ) : (
          data?.items.map((item, idx) => (
            <div
              className="flex justify-between gap-10"
              key={`${item.referrerUrl}-${idx}`}
            >
              <div className="py-3 flex gap-8 text-body-2-normal border-b border-line-normal flex-1">
                <span className="font-bold text-primary-sub-1 min-w-[2rem]">
                  {page * size + (idx + 1)}
                </span>
                <span className="text-label-normal font-semibold line-clamp-1 break-words leading-tight">
                  {item.referrerUrl}
                </span>
              </div>
              <div className="px-3 bg-background-alternative w-[7.5rem] text-body-2-normal font-bold">
                <div className="border-b border-line-normal w-full py-3">
                  {item.visitCount}회
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {(data?.pageInfo?.totalPages ?? 0) > 1 && (
        <div className="mt-3">
          <Pagination
            currentPage={(data?.pageInfo?.currentPage ?? 0) + 1}
            totalPages={data?.pageInfo?.totalPages ?? 0}
            pageParamName="referrerPage"
          />
        </div>
      )}
    </div>
  );
}

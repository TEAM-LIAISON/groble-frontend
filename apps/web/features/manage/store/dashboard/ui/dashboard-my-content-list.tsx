'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getDashboardMyContentList } from '../api/get-dashboard-data';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import NoContent from '@/shared/ui/NoContent';
import Pagination from '@/shared/ui/Pagination';
import Link from 'next/link';

export default function DashboardMyContentList() {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) ?? 1;
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  const size = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-my-content-list', page, size],
    queryFn: () => getDashboardMyContentList(page, size),
    select: (res) => ({
      items: res?.data?.items ?? [],
      pageInfo: res?.data?.pageInfo ?? {
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
      <div className="flex gap-1 items-center">
        <h2 className="text-headline-1 font-bold text-label-normal">
          내 컨텐츠
        </h2>
        <p className="text-primary-sub-1 text-headline-1 font-semibold">
          {data?.items.length}
        </p>
      </div>

      <hr className="mt-3 border-line-normal" />

      {isLoading && (
        <div className="flex justify-center items-center h-full mt-10">
          <LoadingSpinner />
        </div>
      )}

      {/* 콘텐츠 리스트 */}
      {data?.items.length === 0 ? (
        <NoContent size="small" message="아직 콘텐츠가 없어요" />
      ) : (
        <div className="flex flex-col">
          {data?.items.map((item, idx) => (
            <Link
              href={`/manage/store/dashboard/hits/product?id=${item.contentId}`}
              className="py-3 border-b border-line-normal cursor-pointer flex gap-8"
              key={item.contentId}
            >
              <p className="text-body-2-normal font-bold text-primary-sub-1 min-w-[2rem]">
                {page * size + (idx + 1)}
              </p>
              <p className="text-body-2-normal font-semibold text-label-normal">
                {item.contentTitle}
              </p>
            </Link>
          ))}
        </div>
      )}

      {data?.pageInfo?.totalPages && data?.pageInfo?.totalPages > 1 && (
        <div className="mt-3">
          <Pagination
            currentPage={(data?.pageInfo?.currentPage ?? 0) + 1}
            totalPages={data?.pageInfo?.totalPages ?? 0}
          />
        </div>
      )}
    </div>
  );
}

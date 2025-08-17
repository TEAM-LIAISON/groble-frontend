'use client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getSettlementMonthlySalesHistory } from '../../api/get-settlement-detail-data';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import NoContent from '@/shared/ui/NoContent';
import SettlementMonthlySalesTable from './settlement-monthly-sales-table';

type Props = {
  yearMonth: string;
};

export default function SettlementMonthlySalesHistory({ yearMonth }: Props) {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) ?? 1;
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  const size = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['settlement-monthly-sales-history', page, size],
    queryFn: () => getSettlementMonthlySalesHistory(yearMonth, page, size),
    select: (res) => ({
      items: res?.data.items ?? [],
      pageInfo: res?.data.pageInfo ?? {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (data?.items.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <NoContent message="아직 판매 내역이 없어요" size="small" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-1 text-body-1-normal md:text-headline-1">
        <h2 className=" font-bold text-label-normal">총 판매 내역</h2>
        <span className="text-label-assistive">|</span>
        <span className="font-semibold text-label-normal">
          {data?.items.length}개
        </span>
      </div>

      <SettlementMonthlySalesTable
        items={data?.items ?? []}
        pageInfo={data?.pageInfo ?? {}}
      />
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import SettlementTable from './settlement-table';
import { getSettlementHistory } from '../api/get-settlement-data';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import NoContent from '@/shared/ui/NoContent';

export default function SettlementHistoryContent() {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) ?? 1;
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  const size = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['settlement-history', page, size],
    queryFn: () => getSettlementHistory(page, size),
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
        <NoContent message="아직 콘텐츠가 없어요" size="small" />
      </div>
    );
  }

  return (
    <SettlementTable
      items={data?.items ?? []}
      pageInfo={data?.pageInfo ?? {}}
    />
  );
}

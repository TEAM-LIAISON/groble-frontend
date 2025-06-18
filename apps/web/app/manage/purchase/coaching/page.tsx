'use client';

import { useSearchParams } from 'next/navigation';
import { usePurchaseCoaching } from '@/features/manage/hooks/usePurchaseCoaching';
import PurchaseCoachingList from '@/features/manage/components/purchase-coaching-list';

export default function PurchaseCoachingPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || '';

  const {
    allItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePurchaseCoaching({ status });

  return (
    <>
      <PurchaseCoachingList
        items={allItems}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  );
}

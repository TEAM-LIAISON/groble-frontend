'use client';

import { useSearchParams } from 'next/navigation';
import { usePurchaseCoaching } from '@/features/manage/hooks/usePurchaseCoaching';
import PurchaseList from '@/features/manage/components/purchase-list';
import NavigationBar from '@/components/navigation-bar';

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
      <PurchaseList
        items={allItems}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
        emptyMessage="구매한 코칭이 없습니다."
      />
      <NavigationBar />
    </>
  );
}

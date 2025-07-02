'use client';

import { useSearchParams } from 'next/navigation';
import { usePurchaseContents } from '@/features/manage/hooks/usePurchaseContents';
import PurchaseList from '@/features/manage/components/purchase-list';
import NavigationBar from '@/components/navigation-bar';

export default function PurchaseContentsPage() {
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
  } = usePurchaseContents({ status });

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
        emptyMessage="구매한 콘텐츠가 없습니다."
      />
      <NavigationBar />
    </>
  );
}

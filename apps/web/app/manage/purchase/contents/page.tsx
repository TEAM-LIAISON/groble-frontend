'use client';

import { useSearchParams } from 'next/navigation';
import { usePurchaseContents } from '@/features/manage/hooks/usePurchaseContents';
import PurchaseContentsList from '@/features/manage/components/purchase-contents-list';

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
    <PurchaseContentsList
      items={allItems}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}

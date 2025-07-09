'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { usePurchasedContents } from '@/features/manage/hooks/usePurchasedContents';
import PurchaseList from '@/features/manage/components/purchase-list';
import NavigationBar from '@/components/navigation-bar';
import type { PurchaseFilterType } from '@/features/manage/types/purchaseTypes';

function PurchasePageContent() {
  const searchParams = useSearchParams();
  const state = (searchParams.get('state') || '') as PurchaseFilterType;
  const page = parseInt(searchParams.get('page') || '1', 10) - 1; // UI는 1부터, API는 0부터

  const { items, pageInfo, isLoading, isError, error } = usePurchasedContents({
    state,
    page,
  });

  return (
    <>
      <PurchaseList
        items={items}
        pageInfo={pageInfo}
        isLoading={isLoading}
        isError={isError}
        error={error}
        emptyMessage="구매한 콘텐츠가 없습니다."
      />
      <NavigationBar />
    </>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchasePageContent />
    </Suspense>
  );
}

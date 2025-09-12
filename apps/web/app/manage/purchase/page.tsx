'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, Suspense } from 'react';
import WebHeader from '@/components/(improvement)/layout/header';
import { usePurchasedContents } from '@/features/manage/hooks/usePurchasedContents';
import PurchaseList from '@/features/manage/components/purchase-list';
import NavigationBar from '@/components/navigation-bar';
import type { PurchaseFilterType } from '@/features/manage/types/purchaseTypes';

function PurchasePageContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = [
    { name: '전체', value: '' },
    { name: '결제완료', value: 'PAID' },
    { name: '취소/환불', value: 'CANCEL' },
  ];

  const currentFilter = searchParams.get('state') || '';
  const state = currentFilter as PurchaseFilterType;
  const page = parseInt(searchParams.get('page') || '1', 10) - 1; // UI는 1부터, API는 0부터

  // 필터 변경 핸들러
  const handleFilterChange = useCallback(
    (filterValue: string) => {
      const params = new URLSearchParams(searchParams);

      if (filterValue === '') {
        params.delete('state');
      } else {
        params.set('state', filterValue);
      }

      const search = params.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${pathname}${query}`);
    },
    [pathname, router, searchParams]
  );

  const { items, pageInfo, isLoading, isError, error } = usePurchasedContents({
    state,
    page,
  });

  return (
    <>
      <WebHeader mobileTitle="내 콘텐츠" />
      <div className="flex w-full flex-col items-center pb-28 px-5 lg:px-0">
        <div className="flex w-full max-w-[1080px] flex-col">
          <h1 className="text-heading-1 font-bold text-label-normal hidden md:block pt-9">
            내 콘텐츠
          </h1>

          {/* 필터 UI */}
          <div className="flex gap-2 pt-5">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`cursor-pointer rounded-lg px-4 py-2 text-body-2-normal font-medium transition-colors ${currentFilter === filter.value
                  ? 'bg-component-fill-alternative font-semibold text-label-normal'
                  : 'text-label-alternative hover:text-label-normal'
                  }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <PurchaseList
            items={items}
            pageInfo={pageInfo}
            isLoading={isLoading}
            isError={isError}
            error={error}
            emptyMessage="아직 내역이 없어요"
          />
        </div>
      </div>
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

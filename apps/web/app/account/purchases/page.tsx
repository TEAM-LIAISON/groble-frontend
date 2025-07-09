'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import NavigationBar from '@/components/navigation-bar';
import PurchaseList from '@/features/manage/components/purchase-list';
import { usePurchasedContents } from '@/features/manage/hooks/usePurchasedContents';
import type { PurchaseFilterType } from '@/features/manage/types/purchaseTypes';

// useSearchParams를 사용하는 컴포넌트
function PurchaseContents() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<PurchaseFilterType>('');

  // URL에서 상태 필터 읽기
  const stateFromUrl = (searchParams.get('state') || '') as PurchaseFilterType;
  const page = parseInt(searchParams.get('page') || '1', 10) - 1; // UI는 1부터, API는 0부터

  // 초기 로딩 시 URL의 state를 selectedState에 반영
  useEffect(() => {
    setSelectedState(stateFromUrl);
  }, [stateFromUrl]);

  // 구매 데이터 가져오기
  const { items, pageInfo, isLoading, isError, error } = usePurchasedContents({
    state: selectedState,
    page,
  });

  // 필터 변경 시 URL 업데이트
  const handleStateChange = (newState: PurchaseFilterType) => {
    setSelectedState(newState);

    const params = new URLSearchParams(searchParams.toString());
    if (newState) {
      params.set('state', newState);
    } else {
      params.delete('state');
    }

    // 필터 변경 시 첫 페이지로 리셋
    params.delete('page');

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : '/account/purchases';
    router.push(newUrl);
  };

  return (
    <div
      className={`flex w-full flex-col items-center pb-28 px-5 lg:px-0  min-h-[calc(100vh-66px)]`}
    >
      <div className="flex w-full max-w-[1080px] flex-col">
        <div className="w-full bg-white rounded-xl mt-9 flex flex-col">
          <h3 className="text-heading-1 font-bold text-label-normal">
            내 콘텐츠
          </h3>

          {/* 필터 영역 */}
          <div className="my-6">
            <div className="flex overflow-x-auto">
              <button
                className={`px-4 py-2 rounded-sm text-body-2-normal cursor-pointer whitespace-nowrap ${
                  selectedState === ''
                    ? 'bg-component-fill-alternative'
                    : 'text-label-alternative'
                }`}
                onClick={() => handleStateChange('')}
              >
                전체
              </button>
              <button
                className={`px-4 py-2 rounded-sm text-body-2-normal whitespace-nowrap cursor-pointer ${
                  selectedState === 'PAID'
                    ? 'bg-component-fill-alternative'
                    : 'text-label-alternative'
                }`}
                onClick={() => handleStateChange('PAID')}
              >
                결제완료
              </button>
              <button
                className={`px-4 py-2 rounded-sm text-body-2-normal whitespace-nowrap cursor-pointer ${
                  selectedState === 'CANCEL'
                    ? 'bg-component-fill-alternative'
                    : 'text-label-alternative'
                }`}
                onClick={() => handleStateChange('CANCEL')}
              >
                취소/환불
              </button>
            </div>
          </div>

          {/* 구매 목록 */}
          <PurchaseList
            items={items}
            pageInfo={pageInfo}
            isLoading={isLoading}
            isError={isError}
            error={error}
            emptyMessage="구매한 콘텐츠가 없습니다."
          />
        </div>
      </div>
    </div>
  );
}

export default function PurchasePage() {
  return (
    <>
      <WebHeader mobileTitle="내 콘텐츠" />
      <Suspense
        fallback={
          <div className="flex w-full flex-col items-center bg-background-alternative pb-10">
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          </div>
        }
      >
        <PurchaseContents />
      </Suspense>
      <NavigationBar />
    </>
  );
}

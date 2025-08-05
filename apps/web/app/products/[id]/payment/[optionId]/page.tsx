'use client';

import { Suspense } from 'react';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import PaymentClient from './PaymentClient';
import WebHeader from '@/components/(improvement)/layout/header';

// 동적 렌더링 강제 설정
export const dynamic = 'force-dynamic';

export default function ProductPaymentPage() {
  return (
    <>
      <WebHeader />
      <Suspense
        fallback={
          <div className="flex w-full flex-col items-center bg-background-alternative pb-10">
            <div className="flex w-full max-w-[1250px] flex-col gap-3 px-5 pt-9 sm:px-8 lg:px-12">
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="large" />
                <div className="mt-3 text-label-alternative">
                  결제 정보를 불러오는 중...
                </div>
              </div>
            </div>
          </div>
        }
      >
        <PaymentClient />
      </Suspense>
    </>
  );
}

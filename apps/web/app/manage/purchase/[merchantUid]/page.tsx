import WebHeader from '@/components/(improvement)/layout/header';
import React from 'react';

export default function PurchasePaymentResultPage() {
  return (
    <>
      <WebHeader mobileTitle="내 콘텐츠" />
      <div className="flex w-full flex-col items-center pb-28 px-5 lg:px-0 bg-background-alternative min-h-[calc(100vh-66px)]">
        <div className="flex w-full max-w-[1080px] flex-col pt-9">
          <div className="bg-white rounded-xl p-5">
            <h1 className="text-headline-1 font-semibold text-label-normal">
              결제완료
            </h1>

            <hr className="my-3 border-line-normal" />

            {/* 결제 프로덕트 컴포넌트 */}
          </div>
        </div>
      </div>
    </>
  );
}

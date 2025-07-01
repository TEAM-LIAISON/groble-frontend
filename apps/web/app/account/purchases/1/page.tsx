'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import PurchaseDetailCard from '@/features/account/purchases/purchase-detail-card';
import PaymentPriceInformation from '@/features/products/payment/components/payment-price-Information';

export default function PurchaseDetailPage() {
  const handleViewContent = () => {
    // 콘텐츠 보기 로직
    console.log('콘텐츠 보기');
  };

  const handleViewPurchaseHistory = () => {
    // 구매 내역 보기 로직
    console.log('구매 내역 보기');
  };

  return (
    <>
      <WebHeader mobileTitle="내 콘텐츠" />
      <div
        className={`flex w-full flex-col items-center pb-28 px-5 lg:px-0 bg-background-alternative min-h-[calc(100vh-66px)]`}
      >
        <div className="flex w-full max-w-[1080px] flex-col">
          <div className="w-full bg-white rounded-xl p-5 mt-9 flex flex-col">
            <h3 className="text-headline-1 font-semibold text-label-normal">
              결제완료
            </h3>

            <hr className="text-line-normal my-3" />

            {/* 상품 정보 */}
            <PurchaseDetailCard
              orderNumber="No.1238194"
              orderDate="2025.03.14"
              sellerName="김로블"
              title="한번에 배우는 뭘 배우는 제목 제목은 최대 두줄"
              optionName="옵션 이름"
              price={12000}
              onViewContent={handleViewContent}
              onViewPurchaseHistory={handleViewPurchaseHistory}
            />
          </div>

          {/* 결제 정보 */}
          <div className="mt-3">
            <PaymentPriceInformation
              orderAmount={12000}
              discountAmount={1000}
              totalAmount={11000}
            />
          </div>
        </div>
      </div>
    </>
  );
}

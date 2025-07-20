import type { SellManageDetailResponse } from '../types/productDetailTypes';

interface SummaryStatsProps {
  data: SellManageDetailResponse;
}

export default function SummaryStats({ data }: SummaryStatsProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section className="mb-12">
      <h2 className="text-body-1-normal md:text-headline-1 font-bold mb-2">
        판매 관리
      </h2>

      <div className="flex gap-2 md:gap-3 md:flex-row flex-col">
        {/* 총 결제 금액 */}
        <div className="bg-background-alternative rounded-2xl px-5 flex flex-col justify-center w-full md:w-[11.25rem] h-[7rem] md:h-[10rem]">
          <p className="text-body-1-normal text-label-neutral font-semibold mb-[0.38rem]">
            총 결제 금액
          </p>
          <p className="text-heading-1 text-primary-sub-1 font-bold">
            {formatNumber(data.totalPaymentPrice)}
            <span className="font-medium text-headline-1 ml-[0.12rem]">원</span>
          </p>
        </div>

        {/* 구매 고객 */}
        <div className="bg-background-alternative rounded-2xl px-5 flex flex-col justify-center w-full md:w-[11.25rem] h-[7rem] md:h-[10rem]">
          <p className="text-body-1-normal text-label-neutral font-semibold mb-[0.38rem]">
            구매 고객
          </p>
          <p className="text-heading-1 text-primary-sub-1 font-bold">
            {formatNumber(data.totalPurchaseCustomer)}
            <span className="font-medium text-headline-1 ml-[0.12rem]">명</span>
          </p>
        </div>

        {/* 리뷰 */}
        <div className="bg-background-alternative rounded-2xl px-5 flex flex-col justify-center w-full md:w-[11.25rem] h-[7rem] md:h-[10rem]">
          <p className="text-body-1-normal text-label-neutral font-semibold mb-[0.38rem]">
            리뷰
          </p>
          <p className="text-heading-1 text-primary-sub-1 font-bold">
            {formatNumber(data.totalReviewCount)}
            <span className="font-medium text-headline-1 ml-[0.12rem]">건</span>
          </p>
        </div>
      </div>
    </section>
  );
}

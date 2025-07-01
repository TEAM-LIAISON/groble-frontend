'use client';

import { Button } from '@groble/ui';

interface PurchaseDetailCardProps {
  orderNumber: string;
  orderDate: string;
  sellerName: string;
  title: string;
  optionName: string;
  price: number;
  thumbnailUrl?: string;
  onViewContent?: () => void;
  onViewPurchaseHistory?: () => void;
}

export default function PurchaseDetailCard({
  orderNumber,
  orderDate,
  sellerName,
  title,
  optionName,
  price,
  thumbnailUrl,
  onViewContent,
  onViewPurchaseHistory,
}: PurchaseDetailCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption-1 font-semibold text-label-alternative">
        {orderNumber} • {orderDate}
      </span>

      <div className="flex gap-4">
        <div className="w-[9.8rem] h-[7.3rem] bg-background-alternative rounded-[0.37rem] relative">
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover rounded-[0.37rem]"
            />
          )}
        </div>

        <div className="flex flex-col gap-[0.13rem]">
          <p className="text-label-1-normal font-semibold text-label-alternative">
            {sellerName}
          </p>
          <p className="text-body-1-normal font-semibold text-label-normal line-clamp-2">
            {title}
          </p>
          <p className="text-label-1-normal text-label-alternative">
            {optionName}
          </p>
          <span className="flex text-body-1-normal font-bold">
            {price.toLocaleString()}
            <span className="font-medium">원</span>
          </span>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex gap-3 mt-5">
        <Button
          group="solid"
          type="secondary"
          size="x-small"
          className="w-full"
          onClick={onViewContent}
        >
          콘텐츠 보기
        </Button>

        <Button
          group="solid"
          type="tertiary"
          size="x-small"
          className="w-full"
          onClick={onViewPurchaseHistory}
        >
          구매 내역 보기
        </Button>
      </div>
    </div>
  );
}

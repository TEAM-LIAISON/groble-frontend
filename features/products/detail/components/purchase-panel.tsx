"use client";

import Button from "@/components/button";
import type { ProductDetailType } from "@/entities/product/model/product-types";

interface PurchasePanelProps {
  product: Pick<ProductDetailType, "title" | "lowestPrice" | "options">;
}

export default function PurchasePanel({ product }: PurchasePanelProps) {
  return (
    <div className="static w-full pt-9 lg:sticky lg:top-9 lg:z-20 lg:w-[22.8rem]">
      <div className="rounded-xl border border-line-normal bg-white p-5">
        {/* 헤더 */}
        <div className="mb-4">
          <h2 className="mb-2 text-headline-1 font-semibold text-label-normal">
            콘텐츠 정보
          </h2>
          <p className="line-clamp-2 text-body-2-normal text-label-neutral">
            {product.title}
          </p>
        </div>

        {/* 가격 정보 */}
        <div className="mb-4 rounded-lg bg-background-normal p-3">
          <div className="flex items-center justify-between">
            <span className="text-body-2-normal text-label-neutral">
              최저 가격
            </span>
            <span className="text-headline-1 font-semibold text-label-normal">
              ₩{product.lowestPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 옵션 개수 */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-body-2-normal">
            <span className="text-label-neutral">구매 옵션</span>
            <span className="font-medium text-label-normal">
              {product.options.length}개 옵션
            </span>
          </div>
        </div>

        {/* 구매 버튼들 */}
        <div className="space-y-3">
          <Button
            group="solid"
            type="secondary"
            size="large"
            buttonType="button"
            className="w-full"
          >
            문의하기
          </Button>
          <Button
            group="solid"
            type="primary"
            size="large"
            buttonType="button"
            className="w-full"
          >
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}

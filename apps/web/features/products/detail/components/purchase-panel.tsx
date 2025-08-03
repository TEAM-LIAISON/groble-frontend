'use client';

import { Button, CustomSelect } from '@groble/ui';
import type {
  ProductDetailType,
  ProductOptionType,
} from '@/entities/product/model/product-types';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

interface PurchasePanelProps {
  product: Pick<
    ProductDetailType,
    'contentId' | 'title' | 'lowestPrice' | 'options' | 'contentType'
  >;
}

export default function PurchasePanel({ product }: PurchasePanelProps) {
  const router = useRouter();

  const isCoaching = product.contentType === 'COACHING';
  const firstOption = product.options[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string>('');

  console.log(product.options);

  return (
    <div className="static w-full pt-9 lg:sticky lg:top-9 lg:z-20 lg:w-[22.8rem]">
      <div className="space-y-5 rounded-xl border border-line-normal bg-white p-5">
        {/* 옵션 선택 */}
        <div className="mb-6">
          <h2 className="text-body-1-normal font-semibold text-label-normal">
            옵션 선택
          </h2>
          <CustomSelect
            type="grey"
            options={product.options.map((option) => ({
              value: option.optionId.toString(),
              label: option.name,
              description: option.price.toLocaleString(),
            }))}
            showDescription={true}
            placeholder="옵션을 선택해주세요."
            value={selectedOptionId}
            onChange={(e) => {
              setSelectedOptionId(e.target.value);
              console.log('선택된 optionId:', e.target.value);
            }}
          />
        </div>

        {/* 최종 금액 */}
        <div className="flex justify-between">
          <h2 className="text-body-1-normal1 font-semibold text-label-normal">
            최종 금액
          </h2>
          {/* Select의 선택된 id의 price */}
          <span className="flex gap-[0.12rem] text-headline-1 font-semibold text-primary-sub-1">
            {selectedOptionId === ''
              ? '0'
              : product.options
                  .find(
                    (option) => option.optionId.toString() === selectedOptionId
                  )
                  ?.price.toLocaleString() ?? '원'}
            원
          </span>
        </div>

        {/* 구매 버튼들 */}
        <div className="space-y-3">
          <Button
            group="outlined"
            type="tertiary"
            size="small"
            buttonType="button"
            className="w-full hover:bg-[#FDFDFD]"
          >
            문의하기
          </Button>
          <Button
            group="solid"
            type="primary"
            size="small"
            buttonType="button"
            className="w-full"
            disabled={selectedOptionId === ''}
            onClick={() => {
              selectedOptionId &&
                router.push(
                  `/products/${product.contentId}/payment/${selectedOptionId}`
                );
            }}
          >
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}

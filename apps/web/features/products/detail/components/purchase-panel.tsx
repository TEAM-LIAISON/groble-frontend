'use client';

import { CalenderIcon } from '@/components/(improvement)/icons/Calender';
import { ClipIcon } from '@/components/(improvement)/icons/ClipIcon';
import { LocationIcon } from '@/components/(improvement)/icons/LocationIcon';

import { Button, CustomSelect } from '@groble/ui';
import type {
  ProductDetailType,
  ProductOptionType,
} from '@/entities/product/model/product-types';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

/** 코칭 기간 라벨 매핑 */
const PERIOD_LABEL_MAP: Record<
  Exclude<ProductOptionType['coachingPeriod'], undefined>,
  string
> = {
  ONE_DAY: '1일',
  TWO_TO_SIX_DAYS: '2~6일',
  MORE_THAN_ONE_WEEK: '1주일 이상',
};

// ⚠️ 임시 코드: 구매 차단 플래그 (나중에 제거)
const TEMPORARY_BLOCK_PURCHASE = true;

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
  // ⚠️ 임시 코드: 모달 상태 관리 (나중에 제거)
  const [showBlockModal, setShowBlockModal] = useState(false);

  console.log(product.options);

  // ⚠️ 임시 코드: 구매 버튼 클릭 핸들러 (나중에 제거)
  const handlePurchaseClick = () => {
    if (TEMPORARY_BLOCK_PURCHASE) {
      setShowBlockModal(true);
      return;
    }

    // 기존 로직 (주석처리)
    // selectedOptionId &&
    //   router.push(
    //     `/products/${product.contentId}/payment/${selectedOptionId}`
    //   );
  };

  return (
    <div className="static w-full pt-9 lg:sticky lg:top-9 lg:z-20 lg:w-[22.8rem]">
      <div className="space-y-5 rounded-xl border border-line-normal bg-white p-5">
        {/* 헤더 */}

        <h2 className="text-headline-1 font-semibold text-label-normal">
          콘텐츠 상세 정보
        </h2>

        {/* 콘텐츠 안내 */}
        <ul className="flex flex-col gap-2">
          {isCoaching && firstOption && (
            <>
              <li className="flex gap-1 text-label-1-reading text-label-alternative">
                <CalenderIcon />
                <span>
                  코칭 기간 {PERIOD_LABEL_MAP[firstOption.coachingPeriod!]}
                </span>
              </li>
              <li className="flex gap-1 text-label-1-normal text-label-alternative">
                <LocationIcon />
                {firstOption?.coachingTypeDescription}
              </li>
              <li className="flex gap-1 text-label-1-normal text-label-alternative">
                <ClipIcon />
                {firstOption?.documentProvision === 'PROVIDED'
                  ? '자료 제공'
                  : '자료 미제공'}
              </li>
            </>
          )}
          {!isCoaching && firstOption && (
            <li className="flex items-center gap-2 text-label-1-normal text-label-alternative">
              <ClipIcon />
              <span>
                {firstOption.contentDeliveryMethod === 'IMMEDIATE_DOWNLOAD'
                  ? '즉시 다운로드 가능'
                  : '작업 후 제공'}
              </span>
            </li>
          )}
        </ul>

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
            <p>₩</p>
            {selectedOptionId === ''
              ? '0'
              : product.options
                  .find(
                    (option) => option.optionId.toString() === selectedOptionId
                  )
                  ?.price.toLocaleString()}
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
            onClick={handlePurchaseClick}
            // 기존 onClick 로직 (주석처리)
            // onClick={() => {
            //   selectedOptionId &&
            //     router.push(
            //       `/products/${product.contentId}/payment/${selectedOptionId}`
            //     );
            // }}
          >
            구매하기
          </Button>
        </div>
      </div>

      {/* ⚠️ 임시 코드: 구매 차단 모달 (나중에 제거) */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="px-8 pt-8 pb-6 bg-white rounded-[1.25rem]">
            <div className="">
              <h3 className="text-title-3 font-bold text-label-normal">
                곧 결제 기능을 만나볼 수 있어요{' '}
              </h3>
              <p className="text-headline-1 text-label-neutral mt-2">
                아직 구매할 수 없어요.
                <br />
                빠른 시일 내로 오픈할게요!
              </p>
              <div className="mt-8">
                <Button
                  onClick={() => setShowBlockModal(false)}
                  className="w-full"
                  size="medium"
                  group="solid"
                  type="primary"
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

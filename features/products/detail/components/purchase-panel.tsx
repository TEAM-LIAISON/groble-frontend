"use client";

import { CalenderIcon } from "@/components/(improvement)/icons/Calender";
import { ClipIcon } from "@/components/(improvement)/icons/ClipIcon";
import { LocationIcon } from "@/components/(improvement)/icons/LocationIcon";
import Button from "@/components/button";
import CustomSelect from "@/components/custom-select";
import type {
  ProductDetailType,
  ProductOptionType,
} from "@/entities/product/model/product-types";
import { useRouter } from "next/navigation";

import { useState } from "react";

/** 코칭 기간 라벨 매핑 */
const PERIOD_LABEL_MAP: Record<
  Exclude<ProductOptionType["coachingPeriod"], undefined>,
  string
> = {
  ONE_DAY: "1일",
  TWO_TO_SIX_DAYS: "2~6일",
  MORE_THAN_ONE_WEEK: "1주일 이상",
};
interface PurchasePanelProps {
  product: Pick<
    ProductDetailType,
    "contentId" | "title" | "lowestPrice" | "options" | "contentType"

  >;
}

export default function PurchasePanel({ product }: PurchasePanelProps) {
  const router = useRouter();

  const isCoaching = product.contentType === "COACHING";
  const firstOption = product.options[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string>("");

  console.log(product.options);

  return (
    <div className="static w-full pt-9 lg:sticky lg:top-9 lg:z-20 lg:w-[22.8rem]">
      <div className="space-y-5 rounded-xl border border-line-normal bg-white p-5">
        {/* 헤더 */}

        <h2 className="text-body-1-normal-1 font-semibold text-label-normal">
          콘텐츠 상세 정보
        </h2>

        {/* 콘텐츠 안내 */}
        <ul className="flex flex-col gap-2">
          {isCoaching && firstOption && (
            <>
              <li className="flex gap-1 text-label-1-normal text-label-alternative">
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
                {firstOption?.documentProvision === "PROVIDED"
                  ? "자료 제공"
                  : "자료 미제공"}
              </li>
            </>
          )}
          {!isCoaching && firstOption && (
            <li className="flex items-center gap-2 text-label-1-normal text-label-alternative">
              <ClipIcon />
              <span>
                {firstOption.contentDeliveryMethod === "IMMEDIATE_DOWNLOAD"
                  ? "즉시 다운로드 가능"
                  : "작업 후 제공"}
              </span>
            </li>
          )}
        </ul>

        {/* 옵션 선택 */}
        <div className="mb-6">
          <h2 className="text-body-1-normal-1 font-semibold text-label-normal">
            옵션 선택
          </h2>
          <CustomSelect
            type="grey"
            options={product.options.map((option) => ({
              value: option.optionId.toString(),
              label: option.name,
            }))}
            placeholder="옵션을 선택해주세요."
            value={selectedOptionId}
            onChange={(e) => {
              setSelectedOptionId(e.target.value);
            }}
          />
        </div>

        {/* 최종 금액 */}
        <div className="flex justify-between">
          <h2 className="text-body-1-normal-1 font-semibold text-label-normal">
            최종 금액
          </h2>
          {/* Select의 선택된 id의 price */}
          <span className="flex gap-[0.12rem] text-headline-1 font-semibold text-primary-sub-1">
            <p>₩</p>
            {selectedOptionId === ""
              ? "0"
              : product.options
                  .find(
                    (option) => option.optionId.toString() === selectedOptionId,
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
            disabled={selectedOptionId === ""}
            onClick={() => {
              router.push(
                `/products/${product.contentId}/payment/${selectedOptionId}`,
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

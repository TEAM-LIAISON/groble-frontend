"use client";

import { useEffect } from "react";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import PriceOptionItem from "../price-option-item";
import { CoachingOption } from "@/lib/utils/priceOptionUtils";

export default function CoachingPriceForm({
  error: hasError,
}: {
  error?: boolean;
}) {
  const { contentType, coachingOptions, setCoachingOptions } =
    useNewProductStore();

  // 디버깅을 위한 콘솔 로그
  useEffect(() => {}, [contentType, coachingOptions]);

  // 세팅된 코칭 옵션이 없을 경우 추가할 초기 옵션 생성
  useEffect(() => {
    if (contentType === "COACHING" && coachingOptions.length === 0) {
      // 코칭 옵션이 없는 경우 초기 옵션 추가
      setCoachingOptions([
        {
          optionId: Date.now(),
          name: "",
          description: "",
          price: 0,
          coachingPeriod: "ONE_DAY",
          documentProvision: "NOT_PROVIDED",
          coachingType: "ONLINE",
          coachingTypeDescription: "",
        },
      ]);
    }
  }, [contentType, coachingOptions.length, setCoachingOptions]);

  // 코칭 옵션 처리 함수
  const handleCoachingInputChange = (
    id: number,
    field: string,
    value: string | number | null,
  ) => {
    setCoachingOptions(
      coachingOptions.map((option) => {
        if (option.optionId === id) {
          return { ...option, [field]: value };
        }
        return option;
      }),
    );
  };

  // 필드에 맞게 입력값 변경처리 함수 매핑
  const handleInputChange = (
    id: number,
    field: string,
    value: string | number | null,
  ) => {
    // coachingPeriod와 같이 필드명이 다른 경우 변환
    const mappedField = field === "duration" ? "coachingPeriod" : field;
    handleCoachingInputChange(id, mappedField, value);
  };

  // 새 옵션 추가
  const addOption = () => {
    const newOption: CoachingOption = {
      optionId: Date.now(),
      name: "",
      description: "",
      price: 0,
      coachingPeriod: "ONE_DAY",
      documentProvision: "NOT_PROVIDED",
      coachingType: "ONLINE",
      coachingTypeDescription: "",
    };
    setCoachingOptions([...coachingOptions, newOption]);
  };

  // 옵션 삭제
  const removeOption = (id: number) => {
    setCoachingOptions(
      coachingOptions.filter((option) => option.optionId !== id),
    );
  };

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 옵션 폼 목록 */}
      <div className="flex flex-col gap-8">
        {coachingOptions.map((option, index) => {
          // PriceOptionItem에 넘길 데이터 변환
          const itemOption = {
            optionId: option.optionId,
            name: option.name,
            description: option.description,
            price: option.price,
            duration: option.coachingPeriod,
            documentProvision: option.documentProvision,
            coachingType: option.coachingType,
            coachingTypeDescription: option.coachingTypeDescription,
            documentFileUrl: null,
          };

          return (
            <PriceOptionItem
              key={option.optionId}
              option={itemOption}
              index={index}
              contentType="COACHING"
              showDeleteButton={coachingOptions.length > 1}
              onDelete={removeOption}
              onChange={handleInputChange}
              error={hasError}
            />
          );
        })}
      </div>

      {/* 옵션 추가 버튼 */}
      <button
        type="button"
        onClick={addOption}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#D8FFF4] py-2 text-headline-1 font-semibold text-primary-sub-1 hover:brightness-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.49984 3.16699C8.49984 2.89085 8.27598 2.66699 7.99984 2.66699C7.72369 2.66699 7.49984 2.89085 7.49984 3.16699V7.50033H3.1665C2.89036 7.50033 2.6665 7.72418 2.6665 8.00033C2.6665 8.27647 2.89036 8.50033 3.1665 8.50033H7.49984V12.8337C7.49984 13.1098 7.72369 13.3337 7.99984 13.3337C8.27598 13.3337 8.49984 13.1098 8.49984 12.8337V8.50033H12.8332C13.1093 8.50033 13.3332 8.27647 13.3332 8.00033C13.3332 7.72418 13.1093 7.50033 12.8332 7.50033H8.49984V3.16699Z"
            fill="#008660"
          />
        </svg>
        가격 옵션 추가
      </button>
    </div>
  );
}

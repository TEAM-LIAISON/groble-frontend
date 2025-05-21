"use client";

import { useState, useEffect, useRef } from "react";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import PriceOptionItem from "./PriceOptionItem";
import {
  PriceOption,
  createNewPriceOption,
  convertToCoachingOptions,
  convertToDocumentOptions,
  convertFromCoachingOptions,
  convertFromDocumentOptions,
} from "@/lib/utils/priceOptionUtils";

export default function PriceOptionForm() {
  const {
    contentType,
    coachingOptions,
    documentOptions,
    setCoachingOptions,
    setDocumentOptions,
  } = useNewProductStore();

  // 상태 초기화 여부 추적
  const initialized = useRef(false);
  const prevPriceOptionsRef = useRef<PriceOption[]>([]); // 이전 priceOptions 저장

  // 가격 옵션 상태 관리
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([
    createNewPriceOption(),
  ]);

  // 스토어의 옵션 데이터 로드 (최초 1회만)
  useEffect(() => {
    // 첫 렌더링 시에만 스토어 데이터 로드
    if (!initialized.current) {
      initialized.current = true;

      // 스토어에 저장된 옵션이 있는 경우
      if (contentType === "COACHING" && coachingOptions.length > 0) {
        const convertedOptions = convertFromCoachingOptions(coachingOptions);
        setPriceOptions(convertedOptions);
      } else if (contentType === "DOCUMENT" && documentOptions.length > 0) {
        const convertedOptions = convertFromDocumentOptions(documentOptions);
        setPriceOptions(convertedOptions);
      }
    }
  }, [contentType, coachingOptions, documentOptions]);

  // 콘텐츠 타입 변경 시 해당 타입의 옵션 데이터 로드
  useEffect(() => {
    // 콘텐츠 타입이 변경되면, 해당 타입의 옵션을 스토어에서 가져와 로컬 상태를 업데이트합니다.
    // 또는 옵션이 없는 경우 새 옵션을 생성합니다.
    if (initialized.current) {
      // 초기화 이후에만 실행
      if (contentType === "COACHING") {
        if (coachingOptions.length > 0) {
          setPriceOptions(convertFromCoachingOptions(coachingOptions));
        } else {
          setPriceOptions([createNewPriceOption()]);
        }
      } else if (contentType === "DOCUMENT") {
        if (documentOptions.length > 0) {
          setPriceOptions(convertFromDocumentOptions(documentOptions));
        } else {
          setPriceOptions([createNewPriceOption()]);
        }
      }
    }
  }, [contentType]); // coachingOptions, documentOptions 종속성 제거

  // priceOptions 상태가 변경될 때 스토어를 업데이트합니다.
  useEffect(() => {
    if (
      initialized.current &&
      JSON.stringify(priceOptions) !==
        JSON.stringify(prevPriceOptionsRef.current)
    ) {
      // 옵션 유효성 검사 로직 (생략 가능, 필요시 유지)
      let hasInvalidOptions = false;
      const invalidOptionDetails = [];
      for (const option of priceOptions) {
        const invalidFields = [];
        if (!option.name) invalidFields.push("name");
        if (!option.description) invalidFields.push("description");
        if (option.price < 0) invalidFields.push("price");
        if (contentType === "COACHING") {
          if (!option.duration) invalidFields.push("duration (coachingPeriod)");
          if (!option.documentProvision)
            invalidFields.push("documentProvision");
          if (!option.coachingType) invalidFields.push("coachingType");
          // coachingTypeDescription은 coachingType이 있을 때만 유효성 검사
          if (option.coachingType && !option.coachingTypeDescription) {
            invalidFields.push("coachingTypeDescription");
          }
        } else {
          // DOCUMENT
          if (!option.duration)
            invalidFields.push("duration (contentDeliveryMethod)");
          if (
            option.duration === "IMMEDIATE_DOWNLOAD" &&
            !option.documentFileUrl
          ) {
            invalidFields.push("documentFileUrl");
          }
        }
        if (invalidFields.length > 0) {
          hasInvalidOptions = true;
          invalidOptionDetails.push({
            optionId: option.optionId,
            invalidFields,
          });
        }
      }
      if (hasInvalidOptions) {
        console.warn("Some options have invalid fields:", invalidOptionDetails);
      } else {
        console.log("All options are valid");
      }

      if (contentType === "COACHING") {
        const converted = convertToCoachingOptions(priceOptions);

        setCoachingOptions(converted);
      } else if (contentType === "DOCUMENT") {
        const converted = convertToDocumentOptions(priceOptions);

        setDocumentOptions(converted);
      }
      prevPriceOptionsRef.current = priceOptions; // 현재 priceOptions를 이전 값으로 저장
    }
  }, [priceOptions, contentType, setCoachingOptions, setDocumentOptions]);

  // 입력값 변경 처리
  const handleInputChange = (
    id: string | number,
    field: keyof PriceOption,
    value: string | number | null,
  ) => {
    setPriceOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.optionId === id ? { ...option, [field]: value } : option,
      ),
    );
  };

  // 새 옵션 추가
  const addOption = () => {
    const newOption = createNewPriceOption();
    setPriceOptions([...priceOptions, newOption]);
  };

  // 옵션 삭제
  const removeOption = (id: string | number) => {
    setPriceOptions(priceOptions.filter((option) => option.optionId !== id));
  };

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 옵션 폼 목록 */}
      <div className="flex flex-col gap-8">
        {priceOptions.map((option, index) => (
          <PriceOptionItem
            key={String(option.optionId)}
            option={option}
            index={index}
            contentType={contentType}
            showDeleteButton={priceOptions.length > 1}
            onDelete={removeOption}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {/* 옵션 추가 버튼 */}
      <button
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

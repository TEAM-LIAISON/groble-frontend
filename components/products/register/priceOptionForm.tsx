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
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);

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
  }, []);

  // 콘텐츠 타입 변경 시 해당 타입의 옵션 데이터 로드
  useEffect(() => {
    if (initialized.current && !isUpdatingStore) {
      // 콘텐츠 타입 변경 시 스토어에서 해당 타입에 맞는 옵션 가져오기
      if (contentType === "COACHING" && coachingOptions.length > 0) {
        const convertedOptions = convertFromCoachingOptions(coachingOptions);
        setPriceOptions(convertedOptions);
      } else if (contentType === "DOCUMENT" && documentOptions.length > 0) {
        const convertedOptions = convertFromDocumentOptions(documentOptions);
        setPriceOptions(convertedOptions);
      } else {
        // 옵션이 없으면 기본 옵션 하나 생성
        setPriceOptions([createNewPriceOption()]);
      }
    }
  }, [contentType]);

  // 옵션 변경 시 스토어에 반영
  useEffect(() => {
    // 초기화가 완료되었고 isUpdatingStore가 false일 때만 스토어 업데이트
    if (initialized.current && !isUpdatingStore && priceOptions.length > 0) {
      setIsUpdatingStore(true);

      const timer = setTimeout(() => {
        try {
          if (contentType === "COACHING") {
            const convertedOptions = convertToCoachingOptions(priceOptions);
            setCoachingOptions(convertedOptions);
          } else {
            const convertedOptions = convertToDocumentOptions(priceOptions);
            setDocumentOptions(convertedOptions);
          }
        } finally {
          setIsUpdatingStore(false);
        }
      }, 50); // 디바운스로 업데이트 지연

      return () => clearTimeout(timer);
    }
  }, [priceOptions]);

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

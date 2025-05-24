"use client";

import TextField from "@/components/text-field";
import CustomSelect from "@/components/custom-select";
import Button from "@/components/button";
import { useFormattedPrice } from "@/lib/hooks/useFormattedPrice";
import { PriceOption } from "@/lib/utils/priceOptionUtils";
import { useEffect } from "react";

interface PriceOptionItemProps {
  option: PriceOption;
  index: number;
  contentType: string;
  showDeleteButton: boolean;
  onDelete: (id: number) => void;
  onChange: (
    id: number,
    field: keyof PriceOption,
    value: string | number | null,
  ) => void;
}

export default function PriceOptionItem({
  option,
  index,
  contentType,
  showDeleteButton,
  onDelete,
  onChange,
}: PriceOptionItemProps) {
  // 가격 포맷팅 훅 사용
  const [formattedPrice, rawPrice, handlePriceChange] = useFormattedPrice(
    option.price ? option.price.toString() : "0",
  );

  // 상위 컴포넌트에서 가격 변경될 때 동기화
  useEffect(() => {
    // 옵션의 가격과 rawPrice가 다를 때만 업데이트
    if (option.price !== parseInt(rawPrice) && !isNaN(option.price)) {
      handlePriceChange(option.price.toString());
    }
  }, [option.price]);

  // 필드 레이블 (컨텐츠 타입에 따라 다름)
  const durationLabel = contentType === "COACHING" ? "코칭 기간" : "전달 방식";

  // 기간 옵션
  const durationOptions =
    contentType === "COACHING"
      ? [
          { value: "ONE_DAY", label: "1일" },
          { value: "TWO_TO_SIX_DAYS", label: "2~6일" },
          { value: "MORE_THAN_ONE_WEEK", label: "7일 이상" },
        ]
      : [
          { value: "DOWNLOAD", label: "다운로드" },
          { value: "STREAMING", label: "스트리밍" },
          { value: "BOTH", label: "둘 다" },
        ];

  // 자료 제공 옵션
  const documentProvisionOptions = [
    { value: "PROVIDED", label: "제공" },
    { value: "NOT_PROVIDED", label: "미제공" },
  ];

  // 코칭 방식 옵션
  const coachingTypeOptions = [
    { value: "ONLINE", label: "온라인" },
    { value: "OFFLINE", label: "오프라인" },
  ];

  // 가격 변경 시 처리
  const handlePriceInputChange = (value: string) => {
    handlePriceChange(value);
    // 가격 변경 이벤트는 인풋에서 직접 입력할 때만 부모 컴포넌트에 알림
    const numericValue = parseInt(value.replace(/[^\d]/g, "")) || 0;
    onChange(option.optionId, "price", numericValue);
  };

  // CustomSelect 값 변경 처리 (빈 문자열을 null로 변환)
  const handleSelectChange = (field: keyof PriceOption, value: string) => {
    onChange(option.optionId, field, value || null);
  };

  return (
    <div className="relative rounded-lg border border-line-normal p-6">
      {/* 삭제 버튼 */}
      {showDeleteButton && (
        <button
          onClick={() => onDelete(option.optionId)}
          className="text-label-disabled absolute top-4 right-4 hover:text-label-normal"
          aria-label="삭제"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {/* 옵션 번호 */}
      <div className="mb-5 text-body-2-normal font-semibold text-label-normal">
        옵션 {index + 1}
      </div>

      {/* 옵션명 */}
      <div className="mb-4">
        <TextField
          label="이름"
          value={option.name}
          onChange={(e) => onChange(option.optionId, "name", e.target.value)}
          placeholder={
            contentType === "COACHING"
              ? "Ex. 사업계획서 컨설팅 1회"
              : "Ex. 전자책 단권"
          }
          className="w-full"
        />
      </div>

      {/* 설명 */}
      <div className="mb-4">
        <TextField
          label="설명"
          value={option.description}
          onChange={(e) =>
            onChange(option.optionId, "description", e.target.value)
          }
          placeholder={
            contentType === "COACHING"
              ? "Ex. 회당 30분씩 진행됩니다..."
              : "Ex. PDF 형식으로 제공됩니다..."
          }
          className="w-full"
        />
      </div>

      {/* 코칭 기간 또는 전달 방식 */}
      <div className="mb-4">
        <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
          {durationLabel}
        </p>
        <CustomSelect
          options={durationOptions}
          value={option.duration || ""}
          onChange={(e) => handleSelectChange("duration", e.target.value)}
          placeholder={
            contentType === "COACHING"
              ? "기간을 선택해주세요"
              : "전달 방식을 선택해주세요"
          }
          className="w-full"
        />
      </div>

      {/* 코칭 타입일 때만 표시하는 추가 필드 */}
      {contentType === "COACHING" && (
        <>
          {/* 자료 제공 여부 */}
          <div className="mb-4">
            <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
              자료 제공
            </p>
            <div className="flex w-full gap-4">
              {documentProvisionOptions.map((provisionOption) => (
                <Button
                  key={provisionOption.value}
                  buttonType="button"
                  onClick={() =>
                    onChange(
                      option.optionId,
                      "documentProvision",
                      provisionOption.value,
                    )
                  }
                  group={
                    option.documentProvision === provisionOption.value
                      ? "solid"
                      : "outlined"
                  }
                  type="tertiary"
                  className={`w-full justify-start text-body-2-normal text-label-normal ${
                    option.documentProvision === provisionOption.value
                      ? "border border-primary-sub-1"
                      : ""
                  }`}
                >
                  {provisionOption.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 코칭 방식 */}
          <div className="mb-4">
            <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
              코칭 방식
            </p>
            <div className="flex w-full gap-4">
              {coachingTypeOptions.map((typeOption) => (
                <Button
                  key={typeOption.value}
                  buttonType="button"
                  onClick={() =>
                    onChange(option.optionId, "coachingType", typeOption.value)
                  }
                  group={
                    option.coachingType === typeOption.value
                      ? "solid"
                      : "outlined"
                  }
                  type="tertiary"
                  className={`w-full justify-start text-body-2-normal text-label-normal ${
                    option.coachingType === typeOption.value
                      ? "border border-primary-sub-1"
                      : ""
                  }`}
                >
                  {typeOption.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 코칭 방식 설명 */}
          {option.coachingType && (
            <div className="mb-4">
              <TextField
                label="코칭 방식 설명"
                value={option.coachingTypeDescription}
                onChange={(e) =>
                  onChange(
                    option.optionId,
                    "coachingTypeDescription",
                    e.target.value,
                  )
                }
                placeholder="Ex. Zoom을 통한 온라인 코칭 또는 강남역 인근에서 오프라인 미팅"
                className="w-full"
              />
            </div>
          )}
        </>
      )}

      {/* 비용 */}
      <div>
        <TextField
          label="비용"
          value={formattedPrice}
          onChange={(e) => handlePriceInputChange(e.target.value)}
          placeholder="Ex. 10,000"
          className="w-full"
        />
      </div>
    </div>
  );
}

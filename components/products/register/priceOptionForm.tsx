"use client";

import { useState, useEffect } from "react";
import TextField from "@/components/text-field";
import CustomSelect from "@/components/custom-select";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import Button from "@/components/button";

// 가격 옵션 타입 정의
interface PriceOption {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  documentProvision: string;
  coachingType: string;
  coachingTypeDescription: string;
}

export default function PriceOptionForm() {
  const { contentType, setCoachingOptions, setDocumentOptions } =
    useNewProductStore();

  // 가격 옵션 상태 관리
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([
    {
      id: "option-1",
      name: "",
      description: "",
      duration: "",
      price: "",
      documentProvision: "",
      coachingType: "",
      coachingTypeDescription: "",
    },
  ]);

  // 상태 변경 시 스토어에 반영
  useEffect(() => {
    if (contentType === "coaching") {
      const formattedOptions = priceOptions.map((option) => ({
        id: option.id,
        name: option.name,
        description: option.description,
        price: parseInt(option.price) || 0,
        coachingPeriod: option.duration,
        documentProvision: option.documentProvision,
        coachingType: option.coachingType,
        coachingTypeDescription: option.coachingTypeDescription,
      }));
      setCoachingOptions(formattedOptions);
    } else {
      const formattedOptions = priceOptions.map((option) => ({
        id: option.id,
        name: option.name,
        description: option.description,
        price: parseInt(option.price) || 0,
        contentDeliveryMethod: option.duration,
      }));
      setDocumentOptions(formattedOptions);
    }
  }, [priceOptions, contentType, setCoachingOptions, setDocumentOptions]);

  // 기간 옵션
  const durationOptions =
    contentType === "coaching"
      ? [
          { value: "ONE_DAY", label: "1일" },
          { value: "TWO_TO_SIX_DAYS", label: "2~6일" },
          { value: "MORE_THAN_ONE_WEEK", label: "7일 이상" },
        ]
      : [
          { value: "download", label: "다운로드" },
          { value: "streaming", label: "스트리밍" },
          { value: "both", label: "둘 다" },
        ];

  // 자료 제공 옵션
  const documentProvisionOptions = [
    { value: "yes", label: "제공" },
    { value: "no", label: "미제공" },
  ];

  // 코칭 방식 옵션
  const coachingTypeOptions = [
    { value: "online", label: "온라인" },
    { value: "offline", label: "오프라인" },
  ];

  // 입력값 변경 처리
  const handleInputChange = (
    id: string,
    field: keyof PriceOption,
    value: string,
  ) => {
    setPriceOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, [field]: value } : option,
      ),
    );
  };

  // 가격 입력 처리 (숫자만 입력)
  const handlePriceChange = (id: string, value: string) => {
    // 숫자만 허용
    const numericValue = value.replace(/[^0-9]/g, "");
    handleInputChange(id, "price", numericValue);
  };

  // 새 옵션 추가
  const addOption = () => {
    const newOption: PriceOption = {
      id: `option-${Date.now()}`,
      name: "",
      description: "",
      duration: "",
      price: "",
      documentProvision: "",
      coachingType: "",
      coachingTypeDescription: "",
    };
    setPriceOptions([...priceOptions, newOption]);
  };

  // 옵션 삭제
  const removeOption = (id: string) => {
    setPriceOptions(priceOptions.filter((option) => option.id !== id));
  };

  // 필드 레이블 (컨텐츠 타입에 따라 다름)
  const durationLabel = contentType === "coaching" ? "코칭 기간" : "전달 방식";

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 옵션 폼 목록 */}
      <div className="flex flex-col gap-8">
        {priceOptions.map((option, index) => (
          <div
            key={option.id}
            className="border-background-strong relative rounded-lg border p-6"
          >
            {/* 삭제 버튼 (옵션이 2개 이상일 때만 표시) */}
            {priceOptions.length > 1 && (
              <button
                onClick={() => removeOption(option.id)}
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
                label="옵션명"
                value={option.name}
                onChange={(e) =>
                  handleInputChange(option.id, "name", e.target.value)
                }
                placeholder={
                  contentType === "coaching"
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
                  handleInputChange(option.id, "description", e.target.value)
                }
                placeholder={
                  contentType === "coaching"
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
                value={option.duration}
                onChange={(e) =>
                  handleInputChange(option.id, "duration", e.target.value)
                }
                placeholder={
                  contentType === "coaching"
                    ? "기간을 선택해주세요"
                    : "전달 방식을 선택해주세요"
                }
                className="w-full"
              />
            </div>

            {/* 코칭 타입일 때만 표시하는 추가 필드 */}
            {contentType === "coaching" && (
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
                          handleInputChange(
                            option.id,
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
                          handleInputChange(
                            option.id,
                            "coachingType",
                            typeOption.value,
                          )
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
                        handleInputChange(
                          option.id,
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
                value={option.price}
                onChange={(e) => handlePriceChange(option.id, e.target.value)}
                placeholder="₩"
                className="w-full"
                inputMode="numeric"
              />
            </div>
          </div>
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.49984 3.16699C8.49984 2.89085 8.27598 2.66699 7.99984 2.66699C7.72369 2.66699 7.49984 2.89085 7.49984 3.16699V7.50033H3.1665C2.89036 7.50033 2.6665 7.72418 2.6665 8.00033C2.6665 8.27647 2.89036 8.50033 3.1665 8.50033H7.49984V12.8337C7.49984 13.1098 7.72369 13.3337 7.99984 13.3337C8.27598 13.3337 8.49984 13.1098 8.49984 12.8337V8.50033H12.8332C13.1093 8.50033 13.3332 8.27647 13.3332 8.00033C13.3332 7.72418 13.1093 7.50033 12.8332 7.50033H8.49984V3.16699Z"
            fill="#008660"
          />
        </svg>
        가격 옵션 추가
      </button>
    </div>
  );
}

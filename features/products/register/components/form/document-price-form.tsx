"use client";

import { useState, useEffect, useRef } from "react";
import { useNewProductStore } from "../../store/useNewProductStore";
import TextField from "@/components/text-field";
import Button from "@/components/button";
import { useFormattedPrice } from "@/lib/hooks/useFormattedPrice";
import {
  PriceOption,
  createNewPriceOption,
  convertToDocumentOptions,
  convertFromDocumentOptions,
} from "@/lib/utils/priceOptionUtils";
import { uploadDocumentFile } from "@/lib/api/content";
import FileUpload from "@/components/file-upload";

// 문서 가격 옵션 아이템 컴포넌트
interface DocumentPriceItemProps {
  option: PriceOption;
  index: number;
  showDeleteButton: boolean;
  error?: boolean;
  onDelete: (id: string | number) => void;
  onChange: (
    id: string | number,
    field: keyof PriceOption,
    value: string | number | null,
  ) => void;
}

function DocumentPriceItem({
  option,
  index,
  showDeleteButton,
  error: hasError,
  onDelete,
  onChange,
}: DocumentPriceItemProps) {
  // 가격 포맷팅 훅 사용
  const [formattedPrice, rawPrice, handlePriceChange] = useFormattedPrice(
    option.price ? option.price.toString() : "0",
  );

  // 전달 방식 옵션
  const deliveryOptions = [
    { value: "IMMEDIATE_DOWNLOAD", label: "즉시 다운로드" },
    { value: "FUTURE_UPLOAD", label: "작업 후 업로드" },
  ];

  // 가격 변경 처리
  const handlePriceInputChange = (value: string) => {
    handlePriceChange(value);
    // 숫자만 입력 가능하도록 제한
    const numericValue = parseInt(value.replace(/[^\d]/g, "")) || 0;
    onChange(option.optionId, "price", numericValue);
  };

  // 파일 URL 변경 핸들러
  const handleFileUrlChange = (url: string | null) => {
    onChange(option.optionId, "documentFileUrl", url);
  };

  return (
    <div className="relative rounded-lg border border-line-normal p-6">
      {/* 삭제 버튼 */}
      {showDeleteButton && (
        <button
          type="button"
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
          label="옵션명"
          value={option.name}
          onChange={(e) => onChange(option.optionId, "name", e.target.value)}
          placeholder="Ex. 전자책 단권"
          error={hasError && !option.name}
          className="w-full"
          maxLength={20}
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
          placeholder="Ex. PDF 형식으로 제공됩니다..."
          error={hasError && !option.description}
          className="w-full"
          maxLength={60}
        />
      </div>

      {/* 콘텐츠 제공 방식 */}
      <div className="mb-4">
        <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
          콘텐츠 제공 방식
        </p>
        <div className="flex w-full gap-4">
          {deliveryOptions.map((opt) => (
            <Button
              key={opt.value}
              buttonType="button"
              onClick={() => onChange(option.optionId, "duration", opt.value)}
              group={option.duration === opt.value ? "solid" : "outlined"}
              type="tertiary"
              className={`w-full justify-start text-body-2-normal text-label-normal ${
                option.duration === opt.value
                  ? "border border-primary-sub-1"
                  : ""
              } ${hasError && !option.duration ? "border-status-error" : ""}`}
            >
              {opt.label}
            </Button>
          ))}
        </div>
        {hasError && !option.duration && (
          <p className="mt-1 text-sm text-status-error">
            콘텐츠 제공 방식을 선택해주세요
          </p>
        )}
      </div>

      {/* 파일 업로드 - 즉시 다운로드일 때만 표시 */}
      {option.duration === "IMMEDIATE_DOWNLOAD" && (
        <>
          <FileUpload
            uploadApi={uploadDocumentFile}
            acceptedTypes={[".pdf", ".zip"]}
            acceptedMimeTypes={[
              "application/pdf",
              "application/zip",
              "application/x-zip-compressed",
            ]}
            maxSizeInMB={10}
            uploadButtonText="파일 업로드"
            helpText="* 10MB 이하의 PDF, Zip 파일"
            dragDropText="파일을 끌어서 놓거나 버튼을 클릭하세요"
            initialFileUrl={option.documentFileUrl || undefined}
            onFileUrlChange={handleFileUrlChange}
            error={
              hasError &&
              option.duration === "IMMEDIATE_DOWNLOAD" &&
              !option.documentFileUrl &&
              !option.documentLinkUrl
            }
          />

          {/* 링크 업로드 - 즉시 다운로드일 때만 표시 */}
          <div className="mt-4">
            <TextField
              label="링크 업로드"
              value={option.documentLinkUrl || ""}
              onChange={(e) =>
                onChange(option.optionId, "documentLinkUrl", e.target.value)
              }
              placeholder="판매하려는 상품 링크를 추가해주세요"
              error={
                hasError &&
                option.duration === "IMMEDIATE_DOWNLOAD" &&
                !option.documentFileUrl &&
                !option.documentLinkUrl
              }
              className="w-full"
            />
          </div>
        </>
      )}

      {/* 비용 */}
      <div className="mt-4">
        <TextField
          label="비용"
          value={formattedPrice}
          onChange={(e) => handlePriceInputChange(e.target.value)}
          placeholder="Ex. 10,000"
          error={hasError && option.price <= 0}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default function DocumentPriceForm({
  error: hasError,
}: {
  error?: boolean;
}) {
  const { documentOptions, setDocumentOptions } = useNewProductStore();

  // 상태 초기화 여부 추적
  const initialized = useRef(false);
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);

  // 가격 옵션 상태 관리 (단일 옵션에서 배열로 변경)
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([
    { ...createNewPriceOption(), duration: "IMMEDIATE_DOWNLOAD" },
  ]);

  // 전달 방식 값 마이그레이션 (DOWNLOAD → IMMEDIATE_DOWNLOAD, UPLOAD → FUTURE_UPLOAD)
  const migrateDeliveryMethod = (options: PriceOption[]): PriceOption[] => {
    return options.map((option) => {
      if (option.duration === "DOWNLOAD") {
        return { ...option, duration: "IMMEDIATE_DOWNLOAD" };
      } else if (option.duration === "UPLOAD") {
        return { ...option, duration: "FUTURE_UPLOAD" };
      }
      return option;
    });
  };

  // 스토어의 옵션 데이터 로드 (최초 1회만)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // 스토어에 저장된 옵션이 있는 경우
      if (documentOptions.length > 0) {
        const convertedOptions = convertFromDocumentOptions(documentOptions);
        // 기존 전달 방식 값을 새로운 값으로 마이그레이션
        const migratedOptions = migrateDeliveryMethod(convertedOptions);
        setPriceOptions(migratedOptions);
      }
    }
  }, [documentOptions]);

  // 옵션 변경 시 스토어에 반영
  useEffect(() => {
    if (initialized.current && !isUpdatingStore && priceOptions.length > 0) {
      const timer = setTimeout(() => {
        setIsUpdatingStore(true);
        try {
          const convertedOptions = convertToDocumentOptions(priceOptions);
          setDocumentOptions(convertedOptions);
        } finally {
          setIsUpdatingStore(false);
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [priceOptions, setDocumentOptions, isUpdatingStore]);

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
    const newOption = {
      ...createNewPriceOption(),
      duration: "IMMEDIATE_DOWNLOAD",
    };
    setPriceOptions([...priceOptions, newOption]);
  };

  // 옵션 삭제
  const removeOption = (id: string | number) => {
    setPriceOptions(priceOptions.filter((option) => option.optionId !== id));
  };

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 에러 메시지 표시 */}
      {hasError && (
        <div className="mb-4 rounded-lg border border-status-error bg-red-50 p-3">
          <p className="text-body-2-normal text-status-error">
            모든 문서 옵션 정보를 올바르게 입력해주세요.
          </p>
        </div>
      )}

      {/* 옵션 폼 목록 */}
      <div className="flex flex-col gap-8">
        {priceOptions.map((option, index) => (
          <DocumentPriceItem
            key={String(option.optionId)}
            option={option}
            index={index}
            showDeleteButton={priceOptions.length > 1}
            error={hasError}
            onDelete={removeOption}
            onChange={handleInputChange}
          />
        ))}
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

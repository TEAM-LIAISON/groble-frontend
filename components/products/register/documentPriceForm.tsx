"use client";

import { useState, useEffect, useRef } from "react";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import TextField from "@/components/text-field";
import Button from "@/components/button";
import { useFormattedPrice } from "@/lib/hooks/useFormattedPrice";
import {
  DocumentOption,
  PriceOption,
  createNewPriceOption,
  convertToDocumentOptions,
  convertFromDocumentOptions,
} from "@/lib/utils/priceOptionUtils";
import { ClipIcon } from "@/components/icons/ClipIcon";

// 문서 가격 옵션 아이템 컴포넌트
interface DocumentPriceItemProps {
  option: PriceOption;
  index: number;
  showDeleteButton: boolean;
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
  onDelete,
  onChange,
}: DocumentPriceItemProps) {
  // 가격 포맷팅 훅 사용
  const [formattedPrice, rawPrice, handlePriceChange] = useFormattedPrice(
    option.price ? option.price.toString() : "0",
  );

  // 드래그 앤 드롭 상태 관리
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // 전달 방식 옵션
  const deliveryOptions = [
    { value: "DOWNLOAD", label: "즉시 다운로드" },
    { value: "UPLOAD", label: "작업 후 업로드" },
  ];

  // 가격 변경 처리
  const handlePriceInputChange = (value: string) => {
    handlePriceChange(value);
    const numericValue = parseInt(value.replace(/[^\d]/g, "")) || 0;
    onChange(option.optionId, "price", numericValue);
  };

  // 파일 업로드 핸들러
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.zip";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        handleFile(target.files[0]);
      }
    };
    input.click();
  };

  // 파일 처리 핸들러
  const handleFile = (file: File) => {
    // 파일 크기 검사 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    // 파일 타입 검사
    if (
      ![
        "application/pdf",
        "application/zip",
        "application/x-zip-compressed",
      ].includes(file.type)
    ) {
      alert("PDF 또는 ZIP 파일만 업로드 가능합니다.");
      return;
    }

    setUploadedFile(file);
    // 여기서 실제 파일 업로드 처리 로직 추가 예정
    console.log("파일 업로드:", file.name);
  };

  // 드래그 이벤트 핸들러
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="border-background-strong relative rounded-lg border p-6">
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
          label="옵션명"
          value={option.name}
          onChange={(e) => onChange(option.optionId, "name", e.target.value)}
          placeholder="Ex. 전자책 단권"
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
          placeholder="Ex. PDF 형식으로 제공됩니다..."
          className="w-full"
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
              }`}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 파일 업로드 - 즉시 다운로드일 때만 표시 */}
      {option.duration === "DOWNLOAD" && (
        <div
          className={`mb-4 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed ${
            isDragging
              ? "border-primary-main bg-primary-lightest"
              : "border-line-neutral"
          } py-9 transition-colors`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <div className="flex flex-col items-center">
              <div className="text-primary-main flex items-center gap-2">
                <ClipIcon />
                <span className="font-medium">{uploadedFile.name}</span>
              </div>
              <Button
                group="outlined"
                type="tertiary"
                size="x-small"
                onClick={() => setUploadedFile(null)}
                className="mt-2"
              >
                파일 변경
              </Button>
            </div>
          ) : (
            <>
              <Button
                group="solid"
                type="tertiary"
                size="x-small"
                onClick={handleFileUpload}
                className="flex items-center gap-2 hover:brightness-95"
              >
                <ClipIcon />
                파일 업로드
              </Button>
              <span className="mt-2 text-label-1-normal text-label-alternative">
                * 10MB 이하의 PDF, Zip 파일
              </span>
            </>
          )}
        </div>
      )}
      <span className="text-label-1-normal text-label-alternative">
        파일을 끌어서 놓거나 버튼을 클릭하세요
      </span>

      {/* 비용 */}
      <div className="mt-4">
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

export default function DocumentPriceForm() {
  const { documentOptions, setDocumentOptions } = useNewProductStore();

  // 상태 초기화 여부 추적
  const initialized = useRef(false);
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);

  // 가격 옵션 상태 관리 (단일 옵션에서 배열로 변경)
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([
    createNewPriceOption(),
  ]);

  // 스토어의 옵션 데이터 로드 (최초 1회만)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // 스토어에 저장된 옵션이 있는 경우
      if (documentOptions.length > 0) {
        const convertedOptions = convertFromDocumentOptions(documentOptions);
        setPriceOptions(convertedOptions);
      }
    }
  }, []);

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
  }, [priceOptions, setDocumentOptions]);

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
          <DocumentPriceItem
            key={String(option.optionId)}
            option={option}
            index={index}
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

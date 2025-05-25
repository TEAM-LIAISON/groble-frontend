"use client";

import { useState, useEffect, useRef } from "react";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import TextField from "@/components/text-field";
import Button from "@/components/button";
import { useFormattedPrice } from "@/lib/hooks/useFormattedPrice";
import {
  PriceOption,
  createNewPriceOption,
  convertToDocumentOptions,
  convertFromDocumentOptions,
} from "@/lib/utils/priceOptionUtils";
import { ClipIcon } from "@/components/icons/ClipIcon";
import { uploadDocumentFile } from "@/lib/api/content";

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
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 업로드 상태 추적
  const [isFileUploaded, setIsFileUploaded] = useState(
    !!option.documentFileUrl,
  );

  // 컴포넌트 마운트 시 파일 URL이 있으면 파일 업로드 상태 설정
  useEffect(() => {
    if (option.documentFileUrl) {
      setIsFileUploaded(true);
    }
  }, [option.documentFileUrl]);

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

  // 파일 업로드 핸들러
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
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
    }
  };

  // 파일 처리 핸들러
  const handleFile = async (file: File) => {
    // 파일 크기 검사 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("파일 크기는 10MB 이하여야 합니다.");
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
      setErrorMessage("PDF 또는 ZIP 파일만 업로드 가능합니다.");
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);
    setUploadedFile(file);

    try {
      // 파일 업로드 API 호출
      const fileUrl = await uploadDocumentFile(file);
      console.log("업로드된 파일 URL:", fileUrl);

      // 업로드된 파일 URL을 documentFileUrl에 저장
      onChange(option.optionId, "documentFileUrl", fileUrl);
      setIsFileUploaded(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("파일 업로드 중 오류가 발생했습니다.");
      }
      console.error("파일 업로드 오류:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 삭제 핸들러
  const handleFileDelete = () => {
    setUploadedFile(null);
    setIsFileUploaded(false);
    onChange(option.optionId, "documentFileUrl", null);
  };

  // 파일 이름 추출
  const getFileName = () => {
    if (uploadedFile) {
      return uploadedFile.name;
    } else if (option.documentFileUrl) {
      // URL에서 파일명 추출
      try {
        const url = new URL(option.documentFileUrl);
        const path = url.pathname;
        const filename = path.split("/").pop() || "업로드된 파일";
        return filename;
      } catch (e) {
        return "업로드된 파일";
      }
    }
    return "";
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

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.zip"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />

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
      {option.duration === "IMMEDIATE_DOWNLOAD" && (
        <>
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
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="text-primary-main flex items-center gap-2">
                  <svg
                    className="text-primary-main h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>업로드 중...</span>
                </div>
              </div>
            ) : isFileUploaded ? (
              <div className="flex flex-col items-center">
                <div className="text-primary-main flex items-center gap-2">
                  <ClipIcon />
                  <span className="font-medium">{getFileName()}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    group="outlined"
                    type="tertiary"
                    size="x-small"
                    onClick={handleFileUpload}
                    className="hover:brightness-95"
                  >
                    파일 변경
                  </Button>
                  <Button
                    group="outlined"
                    type="tertiary"
                    size="x-small"
                    onClick={handleFileDelete}
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:brightness-95"
                  >
                    삭제하기
                  </Button>
                </div>
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
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                )}
              </>
            )}
          </div>
          <span className="text-label-1-normal text-label-alternative">
            파일을 끌어서 놓거나 버튼을 클릭하세요
          </span>

          {/* 링크 업로드 - 즉시 다운로드일 때만 표시 */}
          <div className="mt-4">
            <TextField
              label="링크 업로드"
              value={option.documentLinkUrl || ""}
              onChange={(e) =>
                onChange(option.optionId, "documentLinkUrl", e.target.value)
              }
              placeholder="판매하려는 상품 링크를 추가해주세요"
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
          console.log("스토어에 반영된 documentOptions:", convertedOptions);
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

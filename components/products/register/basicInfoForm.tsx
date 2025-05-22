"use client";

import { useState, useEffect } from "react";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { categoryOptionsByType } from "@/lib/data/filterData";
import { ContentType } from "@/lib/api/contentApi";
import TextField from "@/components/text-field";
import Button from "@/components/button";
import CustomSelect from "@/components/custom-select";

export default function BasicInfoForm() {
  const {
    title,
    contentType,
    categoryId,
    setTitle,
    setContentType,
    setCategoryId,
  } = useNewProductStore();
  const [error, setError] = useState<{ title?: string; categoryId?: string }>(
    {},
  );

  // 컨텐츠 타입 변경 시 카테고리 초기화
  useEffect(() => {
    // categoryId를 undefined로 설정(store의 타입이 categoryId?: number임)
    setCategoryId("" as unknown as string);
  }, [contentType, setCategoryId]);

  // 제목 변경 처리
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // 검증: 제목이 비어있는지
    if (!newTitle.trim()) {
      setError((prev) => ({ ...prev, title: "제목을 입력해주세요." }));
    } else if (newTitle.length > 50) {
      setError((prev) => ({
        ...prev,
        title: "제목은 50자 이내로 입력해주세요.",
      }));
    } else {
      setError((prev) => ({ ...prev, title: undefined }));
    }
  };

  // 컨텐츠 타입 변경 처리
  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
  };

  // 카테고리 변경 처리 (문자열로 처리하도록 수정)
  const handleCategoryChange = (e: {
    target: { value: string; name?: string };
  }) => {
    const { value } = e.target;

    if (!value || value === "") {
      setError((prev) => ({ ...prev, categoryId: "카테고리를 선택해주세요." }));
      setCategoryId("" as unknown as string);
      return;
    }

    // store에 카테고리 ID 저장 (as unknown as number 사용하여 타입 문제 우회)
    setCategoryId(value as unknown as string);
    setError((prev) => ({ ...prev, categoryId: undefined }));
  };

  // 현재 컨텐츠 타입을 ContentType으로 변환 (소문자로 변환)
  const currentContentType = contentType.toLowerCase() as ContentType;

  // 현재 선택된 카테고리 옵션
  const categoryOptions =
    categoryOptionsByType[currentContentType] || categoryOptionsByType.coaching;

  // 카테고리 옵션을 CustomSelect 형식에 맞게 변환
  const formattedCategoryOptions = categoryOptions.map((option: { value: string; label: string }) => ({
    value: option.value,
    label: option.label,
  }));

  // 현재 선택된 카테고리 ID (이미 문자열이거나 문자열로 취급)
  const selectedCategoryId = categoryId !== undefined ? categoryId : "";

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 제목 입력 */}
      <TextField
        label="콘텐츠 이름"
        value={title}
        onChange={handleTitleChange}
        placeholder="30자 이내로 입력해주세요"
        maxLength={30}
        helperText={error.title}
        className="w-full"
      />

      {/* 컨텐츠 타입 선택 */}
      <p className="text-body-1-normal font-semibold text-label-normal">
        콘텐츠 유형
      </p>
      <div className="mt-2 flex w-full gap-4">
        <Button
          buttonType="button"
          onClick={() => handleContentTypeChange("coaching")}
          group={currentContentType === "coaching" ? "solid" : "outlined"}
          type={currentContentType === "coaching" ? "tertiary" : "tertiary"}
          className={`w-full justify-start text-body-2-normal text-label-normal ${
            currentContentType === "coaching"
              ? "border border-primary-sub-1"
              : ""
          }`}
        >
          코칭
        </Button>
        <Button
          buttonType="button"
          onClick={() => handleContentTypeChange("document")}
          group={currentContentType === "document" ? "solid" : "outlined"}
          type={currentContentType === "document" ? "tertiary" : "tertiary"}
          className={`w-full justify-start text-body-2-normal text-label-normal ${
            currentContentType === "document"
              ? "border border-primary-sub-1"
              : ""
          }`}
        >
          자료
        </Button>
      </div>

      {/* 카테고리 선택 */}
      <div className="mt-6">
        <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
          카테고리
        </p>
        <CustomSelect
          options={formattedCategoryOptions}
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          placeholder="카테고리를 선택해주세요"
          className="w-full"
          name="categoryId"
        />
        {error.categoryId && (
          <p className="mt-1 text-caption-1 text-accent-red-orange">
            {error.categoryId}
          </p>
        )}
      </div>
    </div>
  );
}

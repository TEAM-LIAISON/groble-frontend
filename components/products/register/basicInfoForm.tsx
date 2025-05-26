"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { categoryOptionsByType } from "@/lib/data/filterData";
import { ContentType } from "@/lib/api/contentApi";
import { ProductFormData } from "@/lib/schemas/productSchema";
import TextField from "@/components/text-field";
import Button from "@/components/button";
import CustomSelect from "@/components/custom-select";

export default function BasicInfoForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const {
    title,
    contentType,
    categoryId,
    setTitle,
    setContentType,
    setCategoryId,
  } = useNewProductStore();

  // 컨텐츠 타입이 실제로 변경될 때만 카테고리 초기화
  useEffect(() => {
    // 현재 선택된 카테고리가 있는 경우, 해당 카테고리가 현재 컨텐츠 타입과 호환되는지 확인
    if (categoryId) {
      const categoryIdStr = String(categoryId);
      const isCompatible =
        (contentType === "COACHING" && categoryIdStr.startsWith("C")) ||
        (contentType === "DOCUMENT" && categoryIdStr.startsWith("D"));

      // 호환되지 않는 경우에만 카테고리 초기화
      if (!isCompatible) {
        setCategoryId("" as unknown as string);
        setValue("categoryId", "");
      }
    }
  }, [contentType, categoryId, setCategoryId, setValue]);

  // 제목 변경 처리
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setValue("title", newTitle);
  };

  // 컨텐츠 타입 변경 처리
  const handleContentTypeChange = (type: ContentType) => {
    // 스토어의 다른 타입 옵션들 초기화
    const { setCoachingOptions, setDocumentOptions } =
      useNewProductStore.getState();

    if (type === "COACHING") {
      // 코칭으로 변경 시 문서 옵션 초기화
      setDocumentOptions([]);
      setValue("documentOptions", []);
    } else if (type === "DOCUMENT") {
      // 문서로 변경 시 코칭 옵션 초기화
      setCoachingOptions([]);
      setValue("coachingOptions", []);
    }

    setContentType(type);
    setValue("contentType", type);
  };

  // 카테고리 변경 처리 (문자열로 처리하도록 수정)
  const handleCategoryChange = (e: {
    target: { value: string; name?: string };
  }) => {
    const { value } = e.target;

    if (!value || value === "") {
      setCategoryId("" as unknown as string);
      setValue("categoryId", "");
      return;
    }

    // store에 카테고리 ID 저장 (as unknown as number 사용하여 타입 문제 우회)
    setCategoryId(value as unknown as string);
  };

  // 현재 컨텐츠 타입을 ContentType으로 변환 (대문자 유지)
  const currentContentType = contentType as ContentType;

  // 현재 선택된 카테고리 옵션 (대문자 키로 접근)
  const categoryOptions =
    categoryOptionsByType[currentContentType] || categoryOptionsByType.COACHING;

  // 카테고리 옵션을 CustomSelect 형식에 맞게 변환
  const formattedCategoryOptions = categoryOptions.map(
    (option: { value: string; label: string }) => ({
      value: option.value,
      label: option.label,
    }),
  );

  // 현재 선택된 카테고리 ID (이미 문자열이거나 문자열로 취급)
  const selectedCategoryId = categoryId !== undefined ? categoryId : "";

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 제목 입력 */}
      <TextField
        {...register("title", { required: "콘텐츠 이름을 입력해주세요." })}
        label="콘텐츠 이름"
        value={title}
        onChange={handleTitleChange}
        placeholder="30자 이내로 입력해주세요"
        maxLength={30}
        helperText={errors.title ? errors.title.message : undefined}
        error={!!errors.title}
        className="w-full"
      />

      {/* 컨텐츠 타입 선택 */}
      <p className="text-body-1-normal font-semibold text-label-normal">
        콘텐츠 유형
      </p>
      <div className="mt-2 flex w-full gap-4">
        <Button
          buttonType="button"
          onClick={() => handleContentTypeChange("DOCUMENT")}
          group={currentContentType === "DOCUMENT" ? "solid" : "outlined"}
          type={currentContentType === "DOCUMENT" ? "tertiary" : "tertiary"}
          className={`w-full justify-start text-body-2-normal text-label-normal ${
            currentContentType === "DOCUMENT"
              ? "border border-primary-sub-1"
              : ""
          }`}
        >
          자료
        </Button>
        <Button
          buttonType="button"
          onClick={() => handleContentTypeChange("COACHING")}
          group={currentContentType === "COACHING" ? "solid" : "outlined"}
          type={currentContentType === "COACHING" ? "tertiary" : "tertiary"}
          className={`w-full justify-start text-body-2-normal text-label-normal ${
            currentContentType === "COACHING"
              ? "border border-primary-sub-1"
              : ""
          }`}
        >
          코칭
        </Button>
      </div>

      {/* 카테고리 선택 */}
      <div className="mt-6">
        <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
          카테고리
        </p>
        <CustomSelect
          {...register("categoryId", { required: "카테고리를 선택해주세요." })}
          options={formattedCategoryOptions}
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          placeholder="카테고리를 선택해주세요"
          name="categoryId"
          error={!!errors.categoryId}
          className="w-full"
        />
      </div>
    </div>
  );
}

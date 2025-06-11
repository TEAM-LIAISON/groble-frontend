// File: src/features/products/register/components/form/basic-info-form.tsx
"use client";

import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useNewProductStore } from "@/features/products/register/store/useNewProductStore";
import { categoryOptionsByType } from "@/lib/data/filterData";
import { ProductFormData } from "@/lib/schemas/productSchema";
import TextField from "@/components/text-field";
import Button from "@/components/button";
import CustomSelect from "@/components/custom-select";
import { ProductContentType } from "@/entities/product/model";

export default function BasicInfoForm() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  // zustand 스토어 상태 · 액션
  const {
    title,
    contentType,
    categoryId,
    setTitle,
    setContentType,
    setCategoryId,
    setCoachingOptions,
    setDocumentOptions,
  } = useNewProductStore();

  // --- 1) 제목 동기화 ---
  useEffect(() => {
    setValue("title", title);
  }, [title, setValue]);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setValue("title", e.target.value, { shouldValidate: true });
  };

  // --- 2) 콘텐츠 타입 토글 ---
  const handleTypeToggle = (type: ProductContentType) => {
    if (type === contentType) return;

    // 이전 타입의 옵션 초기화
    if (type === "COACHING") {
      setDocumentOptions([]);
      setValue("documentOptions", []);
    } else {
      setCoachingOptions([]);
      setValue("coachingOptions", []);
    }

    setContentType(type);
    setValue("contentType", type, { shouldValidate: true });
  };

  // --- 3) 카테고리 옵션 준비 ---
  // 현재 contentType에 맞는 카테고리들
  const catOptions = categoryOptionsByType[contentType] || [];
  // React Hook Form 과 호환되는 옵션 형태로 변환
  const selectOptions = catOptions.map(({ value, label }) => ({
    value,
    label,
  }));

  // store → form 동기화
  useEffect(() => {
    setValue("contentType", contentType);
    setValue("categoryId", categoryId ?? "", { shouldValidate: true });
  }, [contentType, categoryId, setValue]);

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 1) 제목 */}
      <TextField
        {...register("title", { required: "콘텐츠 이름을 입력해주세요." })}
        label="콘텐츠 이름"
        value={title}
        onChange={onTitleChange}
        placeholder="30자 이내로 입력해주세요"
        maxLength={30}
        helperText={errors.title ? errors.title.message : undefined}
        error={!!errors.title}
        className="w-full"
      />

      {/* 2) 콘텐츠 유형 */}
      <p className="text-body-1-normal font-semibold text-label-normal">
        콘텐츠 유형
      </p>
      <div className="mt-2 flex w-full gap-4">
        {(["DOCUMENT", "COACHING"] as ProductContentType[]).map((type) => (
          <Button
            className={`w-full justify-start border border-primary-sub-1 text-body-2-normal text-label-normal`}
            buttonType="button"
            key={type}
            group={contentType === type ? "solid" : "outlined"}
            type={contentType === "COACHING" ? "tertiary" : "tertiary"}
            size="small"
            onClick={() => handleTypeToggle(type)}
          >
            {type === "COACHING" ? "코칭" : "자료"}
          </Button>
        ))}
      </div>

      {/* 3) 카테고리 */}
      <div className="mt-6">
        <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
          카테고리
        </p>

        <Controller
          control={control}
          name="categoryId"
          rules={{ required: "카테고리를 선택해주세요" }}
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              options={selectOptions}
              value={value}
              onChange={(val) => {
                setCategoryId(val.target.value);
                onChange(val.target.value);
              }}
              placeholder="카테고리를 선택해주세요"
              error={!!errors.categoryId}
            />
          )}
        />
      </div>
    </div>
  );
}

// File: src/features/products/register/components/form/basic-info-form.tsx
'use client';

import { useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useNewProductStore } from '@/features/products/register/store/useNewProductStore';
import { ProductFormData } from '@/lib/schemas/productSchema';
import { ProductContentType } from '@/entities/product/model';
import { TextField, CustomSelect } from '@groble/ui';
import SelectableButton from '@/shared/ui/SelectableButton';
import { categoryOptionsByType } from '@/lib/data/filterData';
import {
  createEmptyCoachingOption,
  createEmptyDocumentOption,
} from '@/features/products/register/utils/form-price-utils';

export default function BasicInfoForm() {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const title = watch('title');
  const contentType = watch('contentType');
  const categoryId = watch('categoryId');

  // zustand는 임시저장용으로만 사용
  const { setTitle, setContentType, setCategoryId } = useNewProductStore();

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setValue('title', newTitle);
      setTitle(newTitle); // 임시저장용
    },
    [setValue, setTitle]
  );

  const handleTypeToggle = useCallback(
    (type: ProductContentType) => {
      if (type === contentType) return;

      setValue('contentType', type);
      setContentType(type); // 임시저장용

      // 타입에 따라 옵션 초기화
      if (type === 'COACHING') {
        setValue('documentOptions', undefined);
        setValue('coachingOptions', [createEmptyCoachingOption()]);
      } else {
        setValue('coachingOptions', undefined);
        setValue('documentOptions', [createEmptyDocumentOption()]);
      }

      // 카테고리 초기화
      setValue('categoryId', '');
      setCategoryId(''); // 임시저장용
    },
    [contentType, setValue, setContentType, setCategoryId]
  );

  const handleCategoryChange = useCallback(
    (e: { target: { value: string; name?: string } }) => {
      const newCategoryId = e.target.value;
      setValue('categoryId', newCategoryId);
      setCategoryId(newCategoryId); // 임시저장용
    },
    [setValue, setCategoryId]
  );

  const catOptions = categoryOptionsByType[contentType] || [];
  const selectOptions = catOptions.map(
    (option: { value: string; label: string }) => ({
      value: option.value,
      label: option.label,
    })
  );

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 제목 */}
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextField
            {...field}
            label="콘텐츠 이름"
            onChange={handleTitleChange}
            placeholder="30자 이내로 입력해주세요"
            maxLength={30}
            helperText={errors.title?.message}
            error={!!errors.title}
            className="w-full"
          />
        )}
      />

      {/* 콘텐츠 유형 */}
      <div className="mt-6">
        <p className="mb-2 text-body-1-normal font-semibold text-label-normal">
          콘텐츠 유형
        </p>
        <div className="flex w-full gap-4">
          {(['DOCUMENT', 'COACHING'] as ProductContentType[]).map((type) => (
            <SelectableButton
              key={type}
              selected={contentType === type}
              onClick={() => handleTypeToggle(type)}
            >
              {type === 'COACHING' ? '서비스' : '자료'}
            </SelectableButton>
          ))}
        </div>
      </div>

      {/* 카테고리 */}
      <div className="mt-6">
        <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
          카테고리
        </p>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <CustomSelect
              {...field}
              options={selectOptions}
              onChange={handleCategoryChange}
              placeholder="카테고리를 선택해주세요"
              error={!!errors.categoryId}
            />
          )}
        />
      </div>
    </div>
  );
}

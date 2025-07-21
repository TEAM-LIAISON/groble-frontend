'use client';

import { useEffect } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import type { ProductFormData } from '@/lib/schemas/productSchema';
import { createEmptyCoachingOption } from '@/features/products/register/utils/form-price-utils';
import PriceOptionItem from '../price-option-item';

interface CoachingPriceFormProps {
  /** 전체 옵션 배열에 대한 validation 에러 여부 */
  error?: boolean;
}

export default function CoachingPriceForm({ error }: CoachingPriceFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  // useFieldArray 로 coachingOptions 배열을 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'coachingOptions',
  });

  // 최초 렌더 시 최소 한 개의 옵션이 있도록 보장
  useEffect(() => {
    if (fields.length === 0) {
      append(createEmptyCoachingOption());
    }
  }, [fields.length, append]);

  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex flex-col gap-8">
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`coachingOptions.${index}`}
            render={({ field: { value, onChange } }) => {
              // value가 undefined인 경우 기본값 설정
              const safeValue = value || createEmptyCoachingOption();

              return (
                <PriceOptionItem
                  /** PriceOptionItem 의 props 구조 */
                  option={{
                    optionId: safeValue.optionId,
                    // 나머지 공통 필드
                    name: safeValue.name || '',
                    description: safeValue.description || '',
                    price: safeValue.price || 0,
                    duration: '',
                    documentProvision: '',
                    coachingType: '',
                    coachingTypeDescription: '',
                    documentFileUrl: null,
                    documentLinkUrl: null,
                  }}
                  index={index}
                  contentType="COACHING"
                  showDeleteButton={fields.length > 1}
                  error={!!error}
                  onDelete={() => remove(index)}
                  onChange={(id, fieldName, fieldValue) => {
                    // 내부 value 객체를 복제한 뒤 해당 필드만 바꿔서 onChange 에 전달
                    const updated = { ...safeValue, [fieldName]: fieldValue };
                    onChange(updated);
                  }}
                />
              );
            }}
          />
        ))}
      </div>

      {/* 새 옵션 추가 버튼 */}
      <button
        type="button"
        onClick={() => append(createEmptyCoachingOption())}
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
            d="M8.5 3.167a.833.833 0 1 0-1.666 0V7.5H3.167a.833.833 0 1 0 0 1.667h3.667v4.333a.833.833 0 1 0 1.666 0V9.167h4.333a.833.833 0 1 0 0-1.667H8.5V3.167Z"
            fill="#008660"
          />
        </svg>
        가격 옵션 추가
      </button>
    </div>
  );
}

'use client';

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
                    name: safeValue.name || '',
                    description: safeValue.description || '',
                    price: safeValue.price || 0,
                    documentFileUrl: null,
                    documentLinkUrl: null,
                  }}
                  index={index}
                  contentType="COACHING"
                  showDeleteButton={fields.length > 1}
                  error={!!error}
                  onDelete={() => remove(index)}
                  onChange={(id, fieldName, fieldValue) => {
                    // 이름, 설명, 비용만 처리
                    if (
                      fieldName === 'name' ||
                      fieldName === 'description' ||
                      fieldName === 'price'
                    ) {
                      const updated = {
                        optionId: safeValue.optionId,
                        name:
                          fieldName === 'name'
                            ? (fieldValue as string)
                            : safeValue.name || '',
                        description:
                          fieldName === 'description'
                            ? (fieldValue as string)
                            : safeValue.description || '',
                        price:
                          fieldName === 'price'
                            ? (fieldValue as number)
                            : safeValue.price || 0,
                      };
                      onChange(updated);
                    }
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

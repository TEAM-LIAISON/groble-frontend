'use client';

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import type { ProductFormData } from '@/lib/schemas/productSchema';
import { createEmptyDocumentOption } from '@/features/products/register/utils/form-price-utils';
import PriceOptionItem from '../price-option-item';

interface DocumentPriceFormProps {
  /** 전체 옵션 배열에 대한 validation 에러 여부 */
  error?: boolean;
}

export default function DocumentPriceForm({ error }: DocumentPriceFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  // useFieldArray 로 documentOptions 배열을 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documentOptions',
  });

  return (
    <div className="mt-5 flex w-full flex-col">
      {/* 에러 메시지 표시 */}
      {error && (
        <div className="mb-4 rounded-lg border border-status-error bg-red-50 p-3">
          <p className="text-body-2-normal text-status-error">
            모든 문서 옵션 정보를 올바르게 입력해주세요. (파일 업로드 또는 링크
            중 하나는 필수)
          </p>
        </div>
      )}

      <div className="flex flex-col gap-8">
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`documentOptions.${index}`}
            render={({ field: { value, onChange } }) => {
              // value가 undefined인 경우 기본값 설정
              const safeValue = value || createEmptyDocumentOption();

              return (
                <PriceOptionItem
                  /** PriceOptionItem 의 props 구조 */
                  option={{
                    optionId: safeValue.optionId,
                    name: safeValue.name || '',
                    description: safeValue.description || '',
                    price: safeValue.price || 0,
                    documentFileUrl: safeValue.documentFileUrl || null,
                    documentLinkUrl: safeValue.documentLinkUrl || null,
                    documentOriginalFileName:
                      (safeValue as any).documentOriginalFileName || null,
                  }}
                  index={index}
                  contentType="DOCUMENT"
                  showDeleteButton={fields.length > 1}
                  error={!!error}
                  onDelete={() => remove(index)}
                  onChange={(id, fieldName, fieldValue) => {
                    // 모든 필드 처리 (이름, 설명, 비용, 파일URL, 링크URL)
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
                      documentFileUrl:
                        fieldName === 'documentFileUrl'
                          ? (fieldValue as string | null)
                          : safeValue.documentFileUrl || null,
                      documentLinkUrl:
                        fieldName === 'documentLinkUrl'
                          ? (fieldValue as string | null)
                          : safeValue.documentLinkUrl || null,
                    };
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
        onClick={() => append(createEmptyDocumentOption())}
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

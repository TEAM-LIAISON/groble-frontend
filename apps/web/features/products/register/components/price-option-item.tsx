'use client';

import { TextField } from '@groble/ui';
import { useFormattedPrice } from '@/lib/hooks/useFormattedPrice';
import { PriceOption } from '@/lib/utils/priceOptionUtils';
import { useEffect } from 'react';

interface PriceOptionItemProps {
  option: PriceOption;
  index: number;
  contentType: string;
  showDeleteButton: boolean;
  error?: boolean;
  onDelete: (id: number) => void;
  onChange: (
    id: number,
    field: keyof PriceOption,
    value: string | number | null
  ) => void;
}

export default function PriceOptionItem({
  option,
  index,
  contentType,
  showDeleteButton,
  error: hasError,
  onDelete,
  onChange,
}: PriceOptionItemProps) {
  // 가격 포맷팅 훅 사용
  const [formattedPrice, rawPrice, handlePriceChange] = useFormattedPrice(
    option.price ? option.price.toString() : '0'
  );

  // 상위 컴포넌트에서 가격 변경될 때 동기화
  useEffect(() => {
    // 옵션의 가격과 rawPrice가 다를 때만 업데이트
    if (option.price !== parseInt(rawPrice) && !isNaN(option.price)) {
      handlePriceChange(option.price.toString());
    }
  }, [option.price]);

  // 가격 변경 시 처리
  const handlePriceInputChange = (value: string) => {
    handlePriceChange(value);
    // 가격 변경 이벤트는 인풋에서 직접 입력할 때만 부모 컴포넌트에 알림
    const numericValue = parseInt(value.replace(/[^\d]/g, '')) || 0;
    onChange(option.optionId, 'price', numericValue);
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

      {/* 이름 */}
      <div className="mb-0">
        <TextField
          label="이름"
          maxLength={20}
          value={option.name}
          onChange={(e) => onChange(option.optionId, 'name', e.target.value)}
          placeholder={
            contentType === 'COACHING'
              ? 'Ex. 사업계획서 컨설팅 1회'
              : 'Ex. 전자책 단권'
          }
          // error={hasError && !option.name}
          className="w-full"
        />
      </div>

      {/* 설명 */}
      <div className="mb-0">
        <TextField
          label="설명"
          maxLength={60}
          value={option.description}
          onChange={(e) =>
            onChange(option.optionId, 'description', e.target.value)
          }
          placeholder={
            contentType === 'COACHING'
              ? 'Ex. 회당 30분씩 진행됩니다...'
              : 'Ex. PDF 형식으로 제공됩니다...'
          }
          error={hasError && !option.description}
          className="w-full"
        />
      </div>

      {/* 비용 */}
      <div>
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

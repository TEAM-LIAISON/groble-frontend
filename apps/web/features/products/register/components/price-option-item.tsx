'use client';

import { TextField } from '@groble/ui';
import { useFormattedPrice } from '@/lib/hooks/useFormattedPrice';
import { PriceOption } from '@/lib/utils/priceOptionUtils';
import { useEffect } from 'react';
import { uploadDocumentFile } from '@/lib/api/content';
import FileUpload from '@/components/file-upload';
import InfoTooltip from '@/components/ui/InfoTooltip';

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

  // 파일 URL 변경 핸들러
  const handleFileUrlChange = (url: string | null) => {
    onChange(option.optionId, 'documentFileUrl', url);
  };

  // 원본 파일명은 서버가 내려준 값을 표시용으로만 사용 (변경 이벤트는 없음)

  // DOCUMENT 타입에서 파일 또는 링크 중 하나는 필수
  const hasFileOrLinkError =
    contentType === 'DOCUMENT' &&
    hasError &&
    !option.documentFileUrl &&
    !option.documentLinkUrl;

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
      <div className="mb-4">
        <TextField
          label="옵션명"
          maxLength={20}
          value={option.name}
          onChange={(e) => onChange(option.optionId, 'name', e.target.value)}
          placeholder={
            contentType === 'COACHING'
              ? 'Ex. 사업계획서 컨설팅 1회'
              : 'Ex. 전자책 단권'
          }
          error={hasError && !option.name}
          className="w-full"
        />
      </div>

      {/* 설명 */}
      <div className="mb-4">
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

      {/* DOCUMENT 타입일 때만 파일 업로드 및 링크 입력 필드 표시 */}
      {contentType === 'DOCUMENT' && (
        <>
          {/* 파일 업로드 */}
          <div className="mb-4">
            <span className="flex gap-1 items-center">
              <p className="text-body-1-normal font-semibold text-label-normal">
                콘텐츠 업로드
              </p>
              <InfoTooltip
                text="자료형 콘텐츠는 결제 완료 후 즉시 전달되므로, 제공할 콘텐츠를 미리 업로드해 주세요."
                direction="right"
                width="27rem"
              />
            </span>
            <p className="mt-[0.13rem] text-body-2-normal text-label-alternative">
              파일 또는 링크를 업로드해주세요
            </p>

            <p className="text-body-2-normal text-label-normal mt-3 mb-2">
              파일 업로드
            </p>
            <FileUpload
              uploadApi={uploadDocumentFile}
              acceptedTypes={['.pdf', '.zip']}
              acceptedMimeTypes={[
                'application/pdf',
                'application/zip',
                'application/x-zip-compressed',
              ]}
              maxSizeInMB={10}
              uploadButtonText="파일 업로드"
              helpText="* 10MB 이하의 PDF, ZIP 파일을 업로드 해주세요"
              dragDropText="파일을 끌어서 놓거나 버튼을 클릭하세요"
              initialFileUrl={option.documentFileUrl || undefined}
              initialOriginalFileName={
                option.documentOriginalFileName || undefined
              }
              onFileUrlChange={handleFileUrlChange}
              error={hasFileOrLinkError}
            />
          </div>

          <hr className="my-4 border-line-normal" />

          {/* 링크 입력 */}
          <div className="mb-4">
            <TextField
              label="링크 업로드"
              value={option.documentLinkUrl || ''}
              onChange={(e) =>
                onChange(option.optionId, 'documentLinkUrl', e.target.value)
              }
              placeholder="판매하려는 상품 링크를 추가해주세요"
              error={hasFileOrLinkError}
              className="w-full"
            />
            {hasFileOrLinkError && (
              <p className="mt-1 text-sm text-status-error">
                파일 업로드 또는 링크 중 하나는 필수로 입력해주세요
              </p>
            )}
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
          error={hasError && option.price <= 0}
          className="w-full"
        />
      </div>
    </div>
  );
}

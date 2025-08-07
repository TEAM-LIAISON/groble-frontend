// features/products/detail/components/product-info.tsx
import { categoryOptionsByType } from '@/lib/data/filterData';
import Image from 'next/image';
import { ShareButton } from '@groble/ui';
import {
  ProductContentType,
  ProductDetailType,
} from '@/entities/product/model';

export type ProductInfoProps = Pick<
  ProductDetailType,
  | 'contentType'
  | 'title'
  | 'sellerProfileImageUrl'
  | 'sellerName'
  | 'categoryId'
>;

/** contentType → 한글 라벨 매핑 */
const TYPE_LABEL_MAP: Record<ProductContentType, string> = {
  COACHING: '코칭',
  DOCUMENT: '자료',
};

export default function ProductInfo({
  contentType,
  title,
  sellerProfileImageUrl,
  sellerName,
  categoryId,
}: ProductInfoProps) {
  // 1) 타입 라벨
  const typeLabel = TYPE_LABEL_MAP[contentType];

  // 2) 카테고리 라벨
  const categoryLabel =
    categoryOptionsByType[contentType]?.find(
      (opt) => opt.value === String(categoryId)
    )?.label ?? '알 수 없음';

  return (
    <div className="flex w-full flex-col">
      {/* 상단: 타입 태그 + 카테고리 태그 + 공유 버튼 */}
      <div className="mt-9 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="rounded-sm bg-primary-sub-1 px-2 py-1 text-caption-1 text-label-inverse">
            {typeLabel}
          </span>
          <span className="rounded-sm bg-component-fill-strong px-2 py-1 text-caption-1 text-label-neutral">
            {categoryLabel}
          </span>
        </div>
        <ShareButton className="h-5 w-5 cursor-pointer transition-transform hover:scale-110" />
      </div>

      {/* 제목 */}
      <h1 className="mt-3 text-heading-1 font-bold text-label-normal">
        {title}
      </h1>

      {/* 판매자 정보 */}
      <div className="mt-2 flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full bg-component-fill-strong">
          {sellerProfileImageUrl ? (
            <Image
              src={sellerProfileImageUrl}
              alt={`${sellerName} 프로필`}
              fill
              className="object-cover"
            />
          ) : (
            <></>
          )}
        </div>
        <span className="text-body-2-normal text-label-neutral">
          {sellerName}
        </span>
      </div>
    </div>
  );
}

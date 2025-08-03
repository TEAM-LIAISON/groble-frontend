// File: src/features/products/detail/components/product-sale-package.tsx

import type {
  ProductDetailType,
  ProductOptionType,
} from '@/entities/product/model';
import ProductOptionItem from './product-option-item';

export type ProductSalePackageProps = Pick<
  ProductDetailType,
  'options' | 'lowestPrice'
>;

export default function ProductSalePackage({
  options,
  lowestPrice,
}: ProductSalePackageProps) {
  if (!options || options.length === 0) {
    return null; // 옵션이 없으면 렌더하지 않음
  }
  const formattedPrice = lowestPrice.toLocaleString();
  const hasRange = options.length > 1;
  return (
    <section className="flex w-full flex-col rounded-lg bg-[#F7F7F8] p-4">
      {/* 가격 */}
      <div className="flex items-baseline justify-between">
        <h2
          className="text-heading-1 font-bold text-primary-sub-1"
          aria-label={`최저 가격 ${formattedPrice}원${hasRange ? ' 이상' : ''}`}
        >
          {formattedPrice}원{hasRange && <span>~</span>}
        </h2>
      </div>

      <hr className="my-3 border-line-normal" />

      {/* 옵션 리스트 */}
      <ul className="flex w-full flex-col gap-2">
        {options.map((option: ProductOptionType) => (
          <li key={option.optionId}>
            <ProductOptionItem
              optionId={option.optionId}
              name={option.name}
              description={option.description}
              price={option.price}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

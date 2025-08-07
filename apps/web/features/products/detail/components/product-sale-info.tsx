import { LinkButton } from '@groble/ui';

import { CalenderIcon } from '@/components/(improvement)/icons/Calender';
import { LocationIcon } from '@/components/(improvement)/icons/LocationIcon';
import { ClipIcon } from '@/components/(improvement)/icons/ClipIcon';
import { ProductDetailType, ProductOptionType } from '@/entities/product/model';
import ProductSalePackage from './product-sale-package';

/** ProductSaleInfo에서 필요한 Props */
export type ProductSaleInfoProps = Pick<
  ProductDetailType,
  'options' | 'contentType' | 'lowestPrice'
>;

export default function ProductSaleInfo({
  options,
  contentType,
  lowestPrice,
}: ProductSaleInfoProps) {
  return (
    <div className=" flex w-full flex-col-reverse md:flex-row md:gap-8">
      <div className="flex flex-col md:w-1/3">
        <LinkButton
          href={``}
          group="outlined"
          type="tertiary"
          size="x-small"
          className=" w-full hover:bg-background-alternative"
        >
          문의하기
        </LinkButton>
      </div>

      {/* 오른쪽 가격 */}
      <div className="mb-4 md:mb-0 md:w-[65%]">
        <ProductSalePackage options={options} lowestPrice={lowestPrice} />
      </div>
    </div>
  );
}

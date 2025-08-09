import { ProductOptionType } from '@/entities/product/model';

export type ProductOptionItemProps = Pick<
  ProductOptionType,
  'optionId' | 'name' | 'description' | 'price'
>;

export default function ProductOptionItem({
  optionId,
  name,
  description,
  price,
}: ProductOptionItemProps) {
  const formattedPrice = price.toLocaleString();

  return (
    <span className="flex flex-col ">
      <p className="text-body-2-normal font-semibold text-label-neutral">
        {name}
      </p>
      <span className="text-headline-1 font-semibold text-label-normal">
        {formattedPrice}원
      </span>
      <p className="flex items-center text-label-1-normal text-label-alternative mt-1">
        {/* <IndentIcon /> */}
        {description}
      </p>
    </span>
  );
}

const IndentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="7"
    height="4"
    viewBox="0 0 7 4"
    fill="none"
  >
    <path
      d="M0.209961 3.81969V0.179688H1.20396V2.82569H6.78996V3.81969H0.209961Z"
      fill="#878A93"
    />
  </svg>
);

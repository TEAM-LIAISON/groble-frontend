import { ProductOption } from "@/lib/types/productType";

interface ProductOptionItemProps {
  option: ProductOption;
}

export default function ProductOptionItem({ option }: ProductOptionItemProps) {
  return (
    <span className="flex flex-col-reverse md:flex md:flex-row md:justify-between">
      <div className="flex flex-col">
        <p className="text-label-1-normal font-semibold text-label-neutral">
          {option.name}
        </p>
        <p className="text-label-1-normal text-label-alternative">
          ⌙ {option.description}
        </p>
      </div>

      <span className="text-headline-1 font-semibold text-label-normal">
        ₩ {option.price.toLocaleString()}
      </span>
    </span>
  );
}

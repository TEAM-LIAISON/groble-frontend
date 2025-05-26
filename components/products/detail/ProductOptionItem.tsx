import { ProductOption } from "@/lib/types/productType";

interface ProductOptionItemProps {
  option: ProductOption;
}

export default function ProductOptionItem({ option }: ProductOptionItemProps) {
  return (
    <span className="flex flex-col-reverse gap-1 md:flex md:flex-row md:justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-body-2-normal font-semibold text-label-neutral">
          {option.name}
        </p>
        <p className="text-body-2-normal text-label-alternative">
          ㄴ {option.description}
        </p>
      </div>

      <span className="text-headline-1 font-semibold text-label-normal">
        ₩ {option.price.toLocaleString()}
      </span>
    </span>
  );
}

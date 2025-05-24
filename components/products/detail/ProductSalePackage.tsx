import { ProductOption } from "@/lib/types/productType";
import ProductOptionItem from "./ProductOptionItem";

interface ProductSalePackageProps {
  options: ProductOption[];
  lowestPrice: number;
}

export default function ProductSalePackage({
  options,
  lowestPrice,
}: ProductSalePackageProps) {
  console.log("options", options);
  return (
    <div className="flex w-full flex-col rounded-lg bg-[#F7F7F8] p-4">
      <p className="text-heading-1 font-bold text-primary-sub-1">
        ₩ {lowestPrice.toLocaleString()}
        {options.length > 1 && <>~</>}
      </p>

      <hr className="my-3 border-line-normal" />

      <div className="flex w-full flex-col gap-2">
        {options.map((option, index) => (
          <ProductOptionItem key={index} option={option} />
        ))}
      </div>
    </div>
  );
}

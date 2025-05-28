// File: src/features/products/register/components/section/price-option-section.tsx
import { useFormContext } from "react-hook-form";
import { ProductFormData } from "@/lib/schemas/productSchema";
import CoachingPriceForm from "../form/coaching-option-form";
import DocumentPriceForm from "../form/document-price-form";
import { ProductContentType } from "@/entities/product/model";

interface PriceOptionSectionProps {
  contentType: ProductContentType;
}

export default function PriceOptionSection({
  contentType,
}: PriceOptionSectionProps) {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const hasError =
    contentType === "DOCUMENT"
      ? Boolean(errors.documentOptions)
      : Boolean(errors.coachingOptions);

  return (
    <section>
      <h1 className="text-heading-1 font-semibold text-label-normal">
        가격 설정
      </h1>

      {contentType === "DOCUMENT" ? (
        <DocumentPriceForm error={hasError} />
      ) : (
        <CoachingPriceForm error={hasError} />
      )}
    </section>
  );
}

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

  // 더 세밀한 에러 체크
  const hasCoachingError = Boolean(
    contentType === "COACHING" &&
      (errors.coachingOptions ||
        (errors as any).coachingOptions?.message ||
        (errors as any).coachingOptions?.root),
  );

  const hasDocumentError = Boolean(
    contentType === "DOCUMENT" &&
      (errors.documentOptions ||
        (errors as any).documentOptions?.message ||
        (errors as any).documentOptions?.root),
  );

  const hasError = hasCoachingError || hasDocumentError;

  return (
    <section>
      <h1 className="text-heading-1 font-semibold text-label-normal">
        가격 설정
      </h1>

      {contentType === "DOCUMENT" ? (
        <DocumentPriceForm error={hasDocumentError} />
      ) : (
        <CoachingPriceForm error={hasCoachingError} />
      )}
    </section>
  );
}

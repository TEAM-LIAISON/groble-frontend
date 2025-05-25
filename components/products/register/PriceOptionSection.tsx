import { useFormContext } from "react-hook-form";
import { ProductFormData } from "@/lib/schemas/productSchema";
import CoachingPriceForm from "./CoachingOptionForm";
import DocumentPriceForm from "./documentPriceForm";

interface PriceOptionSectionProps {
  contentType: "COACHING" | "DOCUMENT";
}

export default function PriceOptionSection({
  contentType,
}: PriceOptionSectionProps) {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const renderPriceSettingComponent = () => {
    switch (contentType) {
      case "DOCUMENT":
        return <DocumentPriceForm error={!!errors.documentOptions} />;
      case "COACHING":
        return <CoachingPriceForm error={!!errors.coachingOptions} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-heading-1 font-semibold text-label-normal">
        가격 설정
      </h1>
      {renderPriceSettingComponent()}
    </div>
  );
}

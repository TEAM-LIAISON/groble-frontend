// File: src/features/products/register/components/section/basic-info-section.tsx
import { ProductFormData } from "@/lib/schemas/productSchema";
import { useFormContext } from "react-hook-form";
import BasicInfoForm from "../form/basic-info-form";

export default function BasicInfoSection() {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div>
      <h1 className="text-heading-1 font-semibold text-label-normal md:font-bold">
        기본 정보
      </h1>
      <BasicInfoForm />
    </div>
  );
}

import { useFormContext } from "react-hook-form";
import { ProductFormData } from "@/lib/schemas/productSchema";
import BasicInfoForm from "./basicInfoForm";

export default function BasicInfoSection() {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div>
      <h1 className="text-heading-1 font-semibold text-label-normal">
        기본 정보
      </h1>
      <BasicInfoForm />
    </div>
  );
}

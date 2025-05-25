import { useFormContext } from "react-hook-form";
import { ProductFormData } from "@/lib/schemas/productSchema";
import ThumbnailUploader from "./thumbnailUploader";

export default function ThumbnailSection() {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div>
      <h1 className="text-heading-1 font-semibold text-label-normal">
        대표 이미지
      </h1>
      <ThumbnailUploader />
    </div>
  );
}

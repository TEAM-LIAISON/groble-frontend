import { ProductFormData } from "@/lib/schemas/productSchema";
import { useFormContext } from "react-hook-form";
import ThumbnailUploader from "../form/thumbnail-uploader";

export default function ThumbnailSection() {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div>
      <h1 className="text-heading-1 font-semibold text-label-normal md:font-bold">
        대표 이미지
      </h1>
      <ThumbnailUploader />
    </div>
  );
}

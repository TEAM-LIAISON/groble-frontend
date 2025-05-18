"use client";
import ThumbnailUploader from "@/components/products/register/thumbnailUploader";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";

export default function NewProductPage() {
  return (
    <div className="flex w-full flex-col items-center pt-9 pb-20">
      <div className="w-full max-w-[1250px] px-5 pt-5 sm:px-8 lg:px-12">
        <h1 className="text-heading-1 font-semibold text-label-normal">
          대표 이미지
        </h1>
        <ThumbnailUploader />
      </div>
      <NewProductBottomBar />
    </div>
  );
}

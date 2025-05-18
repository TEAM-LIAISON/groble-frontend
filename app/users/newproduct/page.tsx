"use client";
import ThumbnailUploader from "@/components/products/register/thumbnailUploader";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";
import BasicInfoForm from "@/components/products/register/basicInfoForm";

export default function NewProductPage() {
  return (
    <div className="flex w-full flex-col items-center pt-9 pb-20">
      <div className="flex w-full max-w-[1250px] flex-col gap-[3.38rem] px-5 pt-5 sm:px-8 lg:px-12">
        {/* 대표 이미지 섹션 */}
        <div>
          <h1 className="text-heading-1 font-semibold text-label-normal">
            대표 이미지
          </h1>
          <ThumbnailUploader />
        </div>

        {/* 기본 정보 섹션 */}
        <div>
          <h1 className="text-heading-1 font-semibold text-label-normal">
            기본 정보
          </h1>
          <BasicInfoForm />
        </div>

        {/*  */}
      </div>
      <NewProductBottomBar />
    </div>
  );
}

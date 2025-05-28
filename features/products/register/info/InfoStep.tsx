// File: src/features/products/register/info/InfoStep.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ProductFormData } from "../types/form-types";
import { productSchema } from "@/lib/schemas/productSchema";
import { useNewProductStore } from "../store/useNewProductStore";
import { useLoadProduct } from "@/hooks/useLoadProduct";
import { useBeforeUnloadWarning } from "@/features/products/register/hooks/use-before-unload-warning";
import { useStepNavigation } from "@/features/products/register/hooks/use-step-navigation";

import ThumbnailSection from "../components/section/tuhumbnail-section";
import BasicInfoSection from "../components/section/basic-info-section";
import ContentDetailSection from "../components/section/content-detail-section";
import PriceOptionSection from "../components/section/price-option-section";
import NewProductBottomBar from "../components/new-product-bottom-bar";

export default function InfoStep() {
  const params = useSearchParams();
  const contentId = params.get("contentId") ?? "";

  const {
    setContentId,
    title,
    contentType,
    categoryId,
    thumbnailUrl,
    serviceTarget,
    serviceProcess,
    makerIntro,
    coachingOptions,
    documentOptions,
  } = useNewProductStore();

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });
  const { handleSubmit, reset, watch } = methods;
  const watchedType = watch("contentType");

  const { goNext, goPrev } = useStepNavigation();

  // URL → store
  useEffect(() => {
    if (contentId) setContentId(Number(contentId));
  }, [contentId, setContentId]);

  // store → form
  useEffect(() => {
    // 항상 discriminated union 형태를 지켜서 reset
    if (contentType === "COACHING") {
      reset({
        title,
        contentType,
        categoryId: categoryId ?? "",
        thumbnailUrl,
        serviceTarget,
        serviceProcess,
        makerIntro,
        coachingOptions,
      });
    } else {
      reset({
        title,
        contentType,
        categoryId: categoryId ?? "",
        thumbnailUrl,
        serviceTarget,
        serviceProcess,
        makerIntro,
        documentOptions,
      });
    }
  }, [
    reset,
    title,
    contentType,
    categoryId,
    thumbnailUrl,
    serviceTarget,
    serviceProcess,
    makerIntro,
    coachingOptions,
    documentOptions,
  ]);

  useBeforeUnloadWarning();
  useLoadProduct(contentId, reset);

  const onValid = () => goNext();
  const onInvalid = () => {
    console.warn("Validation errors", methods.getValues());
    alert("필수 항목을 모두 입력해 주세요.");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        <div className="flex w-full flex-col items-center pt-9 pb-28">
          <div className="flex w-full max-w-[1250px] flex-col gap-14 px-5 sm:px-8 lg:px-12">
            <ThumbnailSection />
            <BasicInfoSection />
            <ContentDetailSection />
            <PriceOptionSection contentType={watchedType} />
          </div>
          <NewProductBottomBar
            showNext
            nextText="다음"
            onPrev={goPrev}
            disabled={!methods.formState.isValid}
          />
        </div>
      </form>
    </FormProvider>
  );
}

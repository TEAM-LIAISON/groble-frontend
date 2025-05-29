// File: src/features/products/register/info/InfoStep.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ProductFormData } from "@/lib/schemas/productSchema";
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
    setTitle,
    setContentType,
    setCategoryId,
    setThumbnailUrl,
    setServiceTarget,
    setServiceProcess,
    setMakerIntro,
    setCoachingOptions,
    setDocumentOptions,
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

  // contentType 변경 시 다른 옵션 초기화
  useEffect(() => {
    if (watchedType && watchedType !== contentType) {
      setContentType(watchedType);

      if (watchedType === "COACHING") {
        // DOCUMENT → COACHING 변경 시 documentOptions 초기화
        setDocumentOptions([
          {
            optionId: Date.now(),
            name: "",
            description: "",
            price: 0,
            contentDeliveryMethod: "IMMEDIATE_DOWNLOAD",
            documentFileUrl: null,
            documentLinkUrl: null,
          },
        ]);
      } else if (watchedType === "DOCUMENT") {
        // COACHING → DOCUMENT 변경 시 coachingOptions 초기화
        setCoachingOptions([
          {
            optionId: Date.now(),
            name: "",
            description: "",
            price: 0,
            coachingPeriod: "ONE_DAY",
            documentProvision: "NOT_PROVIDED",
            coachingType: "ONLINE",
            coachingTypeDescription: "",
          },
        ]);
      }
    }
  }, [
    watchedType,
    contentType,
    setContentType,
    setCoachingOptions,
    setDocumentOptions,
  ]);

  useBeforeUnloadWarning();
  useLoadProduct(contentId, reset);

  const onValid = (data: ProductFormData) => {
    // form 데이터를 zustand 스토어에 저장
    setTitle(data.title);
    setContentType(data.contentType);
    setCategoryId(data.categoryId);
    setThumbnailUrl(data.thumbnailUrl);
    setServiceTarget(data.serviceTarget);
    setServiceProcess(data.serviceProcess);
    setMakerIntro(data.makerIntro);

    // contentType에 따라 옵션 저장 및 다른 옵션 초기화
    if (data.contentType === "COACHING" && data.coachingOptions) {
      setCoachingOptions(data.coachingOptions);
      // DOCUMENT 옵션 초기화
      setDocumentOptions([
        {
          optionId: Date.now(),
          name: "",
          description: "",
          price: 0,
          contentDeliveryMethod: "IMMEDIATE_DOWNLOAD",
          documentFileUrl: null,
          documentLinkUrl: null,
        },
      ]);
    } else if (data.contentType === "DOCUMENT" && data.documentOptions) {
      setDocumentOptions(data.documentOptions);
      // COACHING 옵션 초기화
      setCoachingOptions([
        {
          optionId: Date.now(),
          name: "",
          description: "",
          price: 0,
          coachingPeriod: "ONE_DAY",
          documentProvision: "NOT_PROVIDED",
          coachingType: "ONLINE",
          coachingTypeDescription: "",
        },
      ]);
    }

    // 저장 후 스토어 상태 확인 및 디버깅
    setTimeout(() => {
      const currentState = useNewProductStore.getState();
    }, 100);

    goNext();
  };

  const onInvalid = (errors: any) => {
    console.warn("Validation errors", errors);
    // 에러가 있을 때는 폼을 다시 검증하여 에러 스타일을 표시
    methods.trigger();
  };

  // 다음 버튼 클릭 핸들러 - 항상 실행 가능
  const handleNext = () => {
    // 수동으로 폼 유효성 검사 실행
    handleSubmit(onValid, onInvalid)();
  };

  return (
    <FormProvider {...methods}>
      <form noValidate>
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
            onNext={handleNext}
            disabled={false}
          />
        </div>
      </form>
    </FormProvider>
  );
}

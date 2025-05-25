"use client";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/lib/schemas/productSchema";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { useLoadProduct } from "@/hooks/useLoadProduct";
import { useBeforeUnloadWarning } from "@/hooks/useBeforeUnloadWarning";
import { useStepNavigation } from "@/hooks/useStepNavigation";
import ThumbnailSection from "@/components/products/register/ThumbnailSection";
import BasicInfoSection from "@/components/products/register/BasicInfoSection";
import ContentDetailSection from "@/components/products/register/ContentDetailSection";
import PriceOptionSection from "@/components/products/register/PriceOptionSection";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductContent() {
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");

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
    defaultValues: {
      title: "",
      contentType: "COACHING",
      categoryId: "",
      thumbnailUrl: "",
      serviceTarget: "",
      serviceProcess: "",
      makerIntro: "",
      coachingOptions: [],
      documentOptions: [],
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const { goNext, goPrev } = useStepNavigation();

  // 커스텀 훅들 사용
  useLoadProduct(contentId, reset);
  useBeforeUnloadWarning();

  // URL의 contentId를 스토어에 설정
  useEffect(() => {
    if (contentId) {
      setContentId(Number(contentId));
    }
  }, [contentId, setContentId]);

  // 스토어 데이터를 폼에 동기화
  useEffect(() => {
    setValue("title", title);
    setValue("contentType", contentType);
    setValue("categoryId", categoryId || "");
    setValue("thumbnailUrl", thumbnailUrl);
    setValue("serviceTarget", serviceTarget);
    setValue("serviceProcess", serviceProcess);
    setValue("makerIntro", makerIntro);
    setValue("coachingOptions", coachingOptions);
    setValue("documentOptions", documentOptions);
  }, [
    setValue,
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

  // 현재 선택된 콘텐츠 타입 감시
  const watchedContentType = watch("contentType");

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          () => goNext(),
          (errs) => {
            console.log("폼 유효성 검사 에러:", errs);
            alert("필수 항목을 모두 입력해 주세요.");
          },
        )}
        noValidate
      >
        <div className="flex w-full flex-col items-center pt-9 pb-28">
          <div className="flex w-full max-w-[1250px] flex-col gap-[3.38rem] px-5 pt-5 sm:px-8 lg:px-12">
            <ThumbnailSection />
            <BasicInfoSection />
            <ContentDetailSection />
            <PriceOptionSection contentType={watchedContentType} />
          </div>
          <NewProductBottomBar
            showNext={true}
            nextText="다음"
            onPrev={goPrev}
            disabled={false}
          />
        </div>
      </form>
    </FormProvider>
  );
}

// Suspense 경계로 감싸서 내보내는 메인 페이지 컴포넌트
export default function NewProductPage() {
  return (
    <Suspense
      fallback={<div className="w-full py-10 text-center">로딩 중...</div>}
    >
      <NewProductContent />
    </Suspense>
  );
}

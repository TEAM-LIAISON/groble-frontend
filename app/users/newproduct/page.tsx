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
    console.log("=== 스토어 → 폼 동기화 ===");
    console.log("documentOptions:", documentOptions);
    console.log("coachingOptions:", coachingOptions);
    console.log("contentType:", contentType);

    setValue("title", title);
    setValue("contentType", contentType);
    setValue("categoryId", categoryId || "");
    setValue("thumbnailUrl", thumbnailUrl);
    setValue("serviceTarget", serviceTarget);
    setValue("serviceProcess", serviceProcess);
    setValue("makerIntro", makerIntro);
    setValue("coachingOptions", coachingOptions);
    setValue("documentOptions", documentOptions);

    // 동기화 후 폼 상태 확인
    setTimeout(() => {
      const formData = methods.getValues();
      console.log("동기화 후 폼 데이터:", formData);
    }, 100);
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
          () => {
            console.log("폼 검증 성공! 다음 페이지로 이동합니다.");
            goNext();
          },
          (errs) => {
            console.log("=== 폼 유효성 검사 에러 ===");
            console.log("에러 객체:", errs);
            console.log("현재 폼 데이터:", methods.getValues());

            // 스토어 상태 확인
            const storeState = useNewProductStore.getState();
            console.log("=== 스토어 상태 ===");
            console.log("contentType:", storeState.contentType);
            console.log(
              "documentOptions 개수:",
              storeState.documentOptions.length,
            );
            console.log(
              "coachingOptions 개수:",
              storeState.coachingOptions.length,
            );

            // 자료 유형일 때 특별히 확인할 항목들
            if (storeState.contentType === "DOCUMENT") {
              console.log("=== 문서 옵션 상세 검사 ===");
              storeState.documentOptions.forEach((option, index) => {
                console.log(`옵션 ${index + 1}:`, {
                  name: option.name,
                  description: option.description,
                  price: option.price,
                  contentDeliveryMethod: option.contentDeliveryMethod,
                  documentFileUrl: option.documentFileUrl,
                  documentLinkUrl: option.documentLinkUrl,
                });
              });

              // 수동 스키마 검증 테스트
              console.log("=== 수동 스키마 검증 테스트 ===");
              try {
                const testData = methods.getValues();
                console.log("테스트할 데이터:", testData);
                const result = productSchema.safeParse(testData);
                console.log("스키마 검증 결과:", result);
                if (!result.success) {
                  console.log("스키마 검증 실패 이유:", result.error.issues);
                }
              } catch (error) {
                console.log("스키마 검증 중 오류:", error);
              }
            }

            alert(
              "필수 항목을 모두 입력해 주세요. 자세한 내용은 개발자 도구 콘솔을 확인해주세요.",
            );
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

            {/* 디버그 정보 */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-4">
                <h3 className="mb-2 text-lg font-semibold">디버그 정보</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>ContentType:</strong> {contentType}
                  </p>
                  <p>
                    <strong>WatchedContentType:</strong> {watchedContentType}
                  </p>
                  <p>
                    <strong>DocumentOptions 개수:</strong>{" "}
                    {documentOptions.length}
                  </p>
                  <p>
                    <strong>CoachingOptions 개수:</strong>{" "}
                    {coachingOptions.length}
                  </p>
                  {documentOptions.length > 0 && (
                    <div>
                      <p>
                        <strong>첫 번째 문서 옵션:</strong>
                      </p>
                      <pre className="mt-1 rounded bg-white p-2 text-xs">
                        {JSON.stringify(documentOptions[0], null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
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

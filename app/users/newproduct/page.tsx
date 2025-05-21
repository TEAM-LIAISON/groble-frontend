"use client";
import React, { Suspense, useEffect } from "react";
import ThumbnailUploader from "@/components/products/register/thumbnailUploader";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";
import BasicInfoForm from "@/components/products/register/basicInfoForm";
import PriceOptionForm from "@/components/products/register/priceOptionForm";
import DocumentPriceForm from "@/components/products/register/documentPriceForm";
import ContentDetailForm from "@/components/products/register/contentDetailForm";
import { useSearchParams } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { useQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/lib/api/contentApi";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductContent() {
  interface Option {
    optionId: number;
    optionType: string;
    name: string;
    description: string;
    price: number;
    coachingPeriod?: string;
    documentProvision?: string;
    coachingType?: string;
    coachingTypeDescription?: string;
    contentDeliveryMethod?: string;
    fileUrl?: string;
    documentFileUrl?: string;
  }

  const searchParams = useSearchParams();
  const contentId = searchParams.get("id");
  const {
    contentType,
    setTitle,
    setContentType,
    setCategoryId,
    setThumbnailUrl,
    setContentIntroduction,
    setServiceTarget,
    setServiceProcess,
    setMakerIntro,
    setCoachingOptions,
    setDocumentOptions,
    setContentId,
  } = useNewProductStore();

  // URL의 contentId를 스토어에 설정
  useEffect(() => {
    if (contentId) {
      setContentId(Number(contentId));
    }
  }, [contentId, setContentId]);

  // contentId가 있는 경우에만 데이터 불러오기
  const { data: contentData, isSuccess } = useQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => getContentDetail(contentId!),
    enabled: !!contentId, // contentId가 있을 때만 쿼리 실행
  });

  // 데이터 로드 성공 시 스토어에 저장
  useEffect(() => {
    if (isSuccess && contentData?.data) {
      const content = contentData.data;

      // 기본 정보 설정
      setTitle(content.title);
      setContentType(content.contentType);
      setCategoryId(content.categoryId);
      if (content.thumbnailUrl) setThumbnailUrl(content.thumbnailUrl);

      // 콘텐츠 소개 정보 설정
      if (content.contentIntroduction)
        setContentIntroduction(content.contentIntroduction);
      if (content.serviceTarget) setServiceTarget(content.serviceTarget);
      if (content.serviceProcess) setServiceProcess(content.serviceProcess);
      if (content.makerIntro) setMakerIntro(content.makerIntro);

      // 옵션 설정
      if (content.options && content.options.length > 0) {
        // 옵션 타입에 따라 분류하여 저장
        const coachingOptions = content.options
          .filter((option: Option) => option.optionType === "COACHING_OPTION")
          .map((option: Option) => ({
            optionId: String(option.optionId),
            name: option.name,
            description: option.description,
            price: option.price,
            coachingPeriod: option.coachingPeriod as
              | "ONE_DAY"
              | "TWO_TO_SIX_DAYS"
              | "MORE_THAN_ONE_WEEK",
            documentProvision: option.documentProvision as
              | "PROVIDED"
              | "NOT_PROVIDED",
            coachingType: option.coachingType as "ONLINE" | "OFFLINE",
            coachingTypeDescription: option.coachingTypeDescription || "",
          }));

        const documentOptions = content.options
          .filter((option: Option) => option.optionType === "DOCUMENT_OPTION")
          .map((option: Option) => {
            // contentDeliveryMethod 값 변환
            let deliveryMethod = null;

            if (option.contentDeliveryMethod) {
              // 이전 형식이 사용된 경우 변환
              if (option.contentDeliveryMethod === "DOWNLOAD") {
                deliveryMethod = "IMMEDIATE_DOWNLOAD";
              } else if (option.contentDeliveryMethod === "UPLOAD") {
                deliveryMethod = "FUTURE_UPLOAD";
              } else {
                // 기존 값이 있으면 그대로 사용
                deliveryMethod = option.contentDeliveryMethod;
              }
            }

            return {
              optionId: String(option.optionId),
              name: option.name,
              description: option.description,
              price: option.price,
              contentDeliveryMethod: deliveryMethod,
              fileUrl: option.fileUrl || null,
              documentFileUrl: option.documentFileUrl || option.fileUrl || null,
            };
          });

        if (coachingOptions.length > 0) setCoachingOptions(coachingOptions);
        if (documentOptions.length > 0) setDocumentOptions(documentOptions);
      }
    }
  }, [
    isSuccess,
    contentData,
    setTitle,
    setContentType,
    setCategoryId,
    setThumbnailUrl,
    setContentIntroduction,
    setServiceTarget,
    setServiceProcess,
    setMakerIntro,
    setCoachingOptions,
    setDocumentOptions,
  ]);

  // 컨텐츠 유형에 따른 가격 설정 컴포넌트 렌더링
  const renderPriceSettingComponent = () => {
    switch (contentType) {
      case "DOCUMENT":
        return <DocumentPriceForm />;
      case "COACHING":
      default:
        return <PriceOptionForm />;
    }
  };

  return (
    <div className="flex w-full flex-col items-center pt-9 pb-28">
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

        {/* 상세 설명 */}
        <div>
          <h1 className="text-heading-1 font-semibold text-label-normal">
            상세 설명
          </h1>
          <ContentDetailForm />
        </div>

        {/* 가격 설정 */}
        <div>
          <h1 className="text-heading-1 font-semibold text-label-normal">
            가격 설정
          </h1>
          {renderPriceSettingComponent()}
        </div>
      </div>
      <NewProductBottomBar />
    </div>
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

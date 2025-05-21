"use client";
import React, { Suspense, useEffect } from "react";
import ThumbnailUploader from "@/components/products/register/thumbnailUploader";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";
import BasicInfoForm from "@/components/products/register/basicInfoForm";
import PriceOptionForm from "@/components/products/register/priceOptionForm";
import DocumentPriceForm from "@/components/products/register/documentPriceForm";
import ContentDetailForm from "@/components/products/register/contentDetailForm";
// import CoachingPriceForm from "@/components/products/register/coachingPriceForm"; // 사용하지 않는 import 제거
import { useSearchParams } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { useQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/lib/api/contentApi";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductContent() {
  const [formValid, setFormValid] = React.useState(false);

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

  // 필수 입력값 검증
  const isFormValid = () => {
    const store = useNewProductStore.getState();
    // 기본 필수 필드 검증
    const hasBasicInfo = !!store.title && !!store.categoryId;

    // 썸네일 검증
    const hasThumbnail = !!store.thumbnailUrl;

    // 콘텐츠 상세 설명 검증 (contentIntroduction은 step2에서 검증하므로 제외)
    const hasContentDetail =
      !!store.serviceTarget && !!store.serviceProcess && !!store.makerIntro;

    // 가격 옵션 검증 (콘텐츠 타입에 따라 다름)
    let hasPriceOptions = false;

    if (store.contentType === "DOCUMENT") {
      // 문서 옵션이 있는지 검사
      if (store.documentOptions.length === 0) {
        hasPriceOptions = false;
      } else {
        // 모든 문서 옵션이 유효한지 검사
        let allValid = true;

        for (const option of store.documentOptions) {
          // 기본 필드 검증
          const hasName = !!option.name;
          const hasDescription = !!option.description;
          const hasValidPrice = option.price >= 0;
          const hasBasicFields = hasName && hasDescription && hasValidPrice;

          // 전달 방식 검증
          const hasDeliveryMethod = !!option.contentDeliveryMethod;

          // 파일 검증 - 전달 방식에 따라 다름
          let fileValid = true;

          if (!hasDeliveryMethod) {
            // 전달 방식이 선택되지 않았다면 유효하지 않음
            fileValid = false;
          } else if (option.contentDeliveryMethod === "IMMEDIATE_DOWNLOAD") {
            // 즉시 다운로드는 파일이 있어야 함
            fileValid = !!option.documentFileUrl;
          }
          // 작업 후 업로드는 파일이 없어도 됩니다

          // 전체 유효성
          const isOptionValid =
            hasBasicFields && hasDeliveryMethod && fileValid;

          if (!isOptionValid) {
            allValid = false;
          }
        }

        hasPriceOptions = allValid;
      }
    } else if (store.contentType === "COACHING") {
      // 코칭 옵션이 있는지 검사
      if (store.coachingOptions.length === 0) {
        hasPriceOptions = false;
      } else {
        // 모든 코칭 옵션이 유효한지 검사
        let allValid = true;

        for (const option of store.coachingOptions) {
          // 기본 필드 검증
          const hasName = !!option.name;
          const hasDescription = !!option.description;
          const hasValidPrice = option.price >= 0;
          const hasBasicFields = hasName && hasDescription && hasValidPrice;

          // 코칭 기간 검증
          const hasCoachingPeriod = !!option.coachingPeriod;

          // 자료 제공 여부 검증
          const hasDocumentProvision = !!option.documentProvision;

          // 코칭 방식 검증
          const hasCoachingType = !!option.coachingType;

          // 코칭 방식 설명 검증 - 코칭 방식이 있는 경우에만 설명 필요
          let hasCoachingTypeDescription = true;
          if (hasCoachingType) {
            hasCoachingTypeDescription = !!option.coachingTypeDescription;
          }

          // 전체 유효성
          const isOptionValid =
            hasBasicFields &&
            hasCoachingPeriod &&
            hasDocumentProvision &&
            hasCoachingType &&
            hasCoachingTypeDescription;

          if (!isOptionValid) {
            allValid = false;
          }
        }

        hasPriceOptions = allValid;
      }
    } else {
      hasPriceOptions = false;
    }

    return hasBasicInfo && hasThumbnail && hasContentDetail && hasPriceOptions;
  };

  // 폼 유효성 상태 업데이트
  useEffect(() => {
    const checkFormValidity = () => {
      const valid = isFormValid();

      setFormValid(valid);
    };

    // 초기 검사
    checkFormValidity();

    // 2초마다 폼 유효성 검사 (더 빠르게 반응하도록)
    const intervalId = setInterval(checkFormValidity, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // contentType 변경시 즉시 유효성 검사 실행 및 옵션 초기화
  useEffect(() => {
    // 선택되지 않은 옵션 초기화 (콘텐츠 타입에 따라 다르게 처리)
    if (contentType === "COACHING") {
      // 코칭 타입일 때는 문서 옵션 초기화
      setDocumentOptions([]);
    } else if (contentType === "DOCUMENT") {
      // 문서 타입일 때는 코칭 옵션 초기화
      setCoachingOptions([]);
    }

    // 컨텐츠 타입이 변경되면 즉시 폼 유효성 검사
    setTimeout(() => {
      const store = useNewProductStore.getState();

      // 유효성 검사 실행
      const valid = isFormValid();
      setFormValid(valid);
    }, 500);
  }, [contentType, setDocumentOptions, setCoachingOptions]);

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
      <NewProductBottomBar
        showNext={true}
        nextText="다음"
        nextPath="/users/newproduct/step2"
        disabled={!formValid}
      />
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

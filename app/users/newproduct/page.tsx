"use client";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ThumbnailUploader from "@/components/products/register/thumbnailUploader";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";
import BasicInfoForm from "@/components/products/register/basicInfoForm";
import PriceOptionForm from "@/components/products/register/priceOptionForm";
import DocumentPriceForm from "@/components/products/register/documentPriceForm";
import ContentDetailForm from "@/components/products/register/contentDetailForm";
import {
  useNewProductStore,
  initialState,
} from "@/lib/store/useNewProductStore";
import { useQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/lib/api/contentApi";
import { validateProductForm } from "@/lib/utils/productFormValidation";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductContent() {
  const [formValid, setFormValid] = React.useState(false);
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");

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

  // 외부 파일에서 가져온 폼 유효성 검사 함수 사용
  const isFormValid = () => {
    const store = useNewProductStore.getState();
    return validateProductForm(store, 1); // 스텝 1 유효성 검사
  };

  // 카테고리 ID에 따라 콘텐츠 타입 자동 설정
  useEffect(() => {
    const store = useNewProductStore.getState();

    if (store.categoryId) {
      const categoryIdStr = String(store.categoryId);

      // C001, C002는 코칭 콘텐츠, D001, D002는 자료 콘텐츠
      if (categoryIdStr.startsWith("C")) {
        if (store.contentType !== "COACHING") {
          setContentType("COACHING");
          setDocumentOptions([]);
        }
      } else if (categoryIdStr.startsWith("D")) {
        if (store.contentType !== "DOCUMENT") {
          setContentType("DOCUMENT");
          setCoachingOptions([]);
        }
      }
    }
  }, [setCategoryId, setContentType, setCoachingOptions, setDocumentOptions]);

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

  // 변경 사항 경고 구현
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 폼에 데이터가 입력되었는지 확인
      const store = useNewProductStore.getState();
      const hasData =
        store.title !== "" ||
        store.thumbnailUrl !== "" ||
        store.coachingOptions.length > 0 ||
        store.documentOptions.length > 0;

      if (hasData) {
        event.preventDefault();
        event.returnValue =
          "변경사항이 저장되지 않을 수 있습니다. 정말로 페이지를 벗어나시겠습니까?"; // 표준 메시지
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  // contentId가 있는 경우에만 데이터 불러오기
  const {
    data: contentData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => getContentDetail(contentId!),
    enabled: !!contentId, // contentId가 있을 때만 쿼리 실행
    staleTime: 0, // 항상 최신 데이터를 가져오도록 설정
    refetchOnWindowFocus: true, // 창에 포커스가 맞춰질 때 데이터 다시 가져오기
    refetchOnMount: true, // 컴포넌트가 마운트될 때 데이터 다시 가져오기
  });

  // 데이터 로드 성공 시 스토어에 저장
  useEffect(() => {
    if (isSuccess && contentData?.data) {
      const content = contentData.data;

      // 기본 정보 설정
      setTitle(content.title);
      setContentType(content.contentType);
      setCategoryId(content.categoryId.toString());
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
          .filter((option: any) => option.optionType === "COACHING_OPTION")
          .map((option: any) => ({
            optionId: option.optionId,
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
          .filter((option: any) => option.optionType === "DOCUMENT_OPTION")
          .map((option: any) => {
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
              optionId: option.optionId,
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
      default:
        return null;
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

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { apiFetch } from "@/lib/api/fetch";
import Button from "@/components/button";

interface DraftResponse {
  id: number;
}

export default function NewProductBottomBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const newProductState = useNewProductStore();
  const contentId = searchParams.get("id"); // URL에서 id 파라미터 가져오기

  // 임시 저장 처리
  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);

      // 현재 입력된 값만 포함하여 요청 데이터 구성
      const draftData: Record<string, any> = {};

      // 콘텐츠 ID가 있는 경우 포함 (수정인 경우)
      if (newProductState.contentId) {
        draftData.contentId = newProductState.contentId;
      }

      // 기본 정보
      if (newProductState.title) {
        draftData.title = newProductState.title;
      }
      draftData.contentType = newProductState.contentType;
      if (newProductState.categoryId) {
        draftData.categoryId = newProductState.categoryId;
      }
      if (newProductState.thumbnailUrl) {
        draftData.thumbnailUrl = newProductState.thumbnailUrl;
      }

      // 콘텐츠 소개 정보
      if (newProductState.contentIntroduction) {
        draftData.contentIntroduction = newProductState.contentIntroduction;
      }
      if (newProductState.serviceTarget) {
        draftData.serviceTarget = newProductState.serviceTarget;
      }
      if (newProductState.serviceProcess) {
        draftData.serviceProcess = newProductState.serviceProcess;
      }
      if (newProductState.makerIntro) {
        draftData.makerIntro = newProductState.makerIntro;
      }
      if (newProductState.contentDetailImageUrls.length > 0) {
        draftData.contentDetailImageUrls =
          newProductState.contentDetailImageUrls;
      }

      // 가격 옵션 - 코칭 옵션
      if (newProductState.coachingOptions.length > 0) {
        draftData.coachingOptions = newProductState.coachingOptions.map(
          (option) => ({
            name: option.name,
            description: option.description,
            price: option.price,
            coachingPeriod:
              option.coachingPeriod === "ONE_DAY"
                ? "ONE_DAY"
                : option.coachingPeriod === "TWO_TO_SIX_DAYS"
                  ? "TWO_TO_SIX_DAYS"
                  : "MORE_THAN_ONE_WEEK",
            // null 체크 후 변환
            documentProvision:
              option.documentProvision === "PROVIDED"
                ? "PROVIDED"
                : option.documentProvision === "NOT_PROVIDED"
                  ? "NOT_PROVIDED"
                  : "NOT_PROVIDED",
            // 이미 대문자로 저장되어 있으므로 변환하지 않음
            coachingType: option.coachingType || "OFFLINE",
            coachingTypeDescription: option.coachingTypeDescription,
          }),
        );
      }

      // 가격 옵션 - 문서 옵션
      if (newProductState.documentOptions.length > 0) {
        draftData.documentOptions = newProductState.documentOptions.map(
          (option) => ({
            name: option.name,
            description: option.description,
            price: option.price,
            contentDeliveryMethod: option.contentDeliveryMethod || null,
            documentFileUrl: option.documentFileUrl || null,
          }),
        );
      }

      const response = await apiFetch<DraftResponse>(
        "/api/v1/sell/content/draft",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(draftData),
        },
      );

      if (response.status === "SUCCESS" && response.data?.id) {
        // 응답으로 받은 contentId를 저장
        useNewProductStore.getState().setContentId(response.data.id);
        alert("임시 저장되었습니다.");

        // 이미 URL에 id가 있으면 라우팅하지 않고, 없는 경우에만 라우팅
        if (!contentId) {
          router.push(`/users/newproduct?id=${response.data.id}`);
        }
      } else {
        throw new Error(response.message || "임시 저장에 실패했습니다.");
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "임시 저장 중 오류가 발생했습니다.",
      );
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  // 다음 단계로 이동
  const handleNext = () => {
    // 다음 페이지로 이동 (contentId가 있으면 쿼리 파라미터로 전달)
    if (newProductState.contentId) {
      router.push(
        `/users/newproduct/step2?contentId=${newProductState.contentId}`,
      );
    } else {
      router.push("/users/newproduct/step2");
    }
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 w-full border-t border-line-normal bg-white">
      <div className="flex w-full justify-end p-4">
        <Button
          buttonType="button"
          onClick={handleSaveDraft}
          disabled={isSaving}
          group="solid"
          type="tertiary"
          size="large"
          className="mr-2 w-[7.5rem] hover:brightness-95"
        >
          {isSaving ? "저장 중..." : "임시 저장"}
        </Button>

        <Button
          buttonType="button"
          onClick={handleNext}
          type="primary"
          group="solid"
          size="large"
          className="w-[7.5rem] hover:brightness-95"
        >
          다음
        </Button>
      </div>
    </div>
  );
}

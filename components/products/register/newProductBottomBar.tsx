"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNewProductStore } from "@/lib/store/useNewProductStore";
import { apiFetch } from "@/lib/api/fetch";
import Button from "@/components/button";

interface DraftResponse {
  id: number;
}

interface NewProductBottomBarProps {
  showPrev?: boolean;
  showNext?: boolean;
  showSave?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onSave?: () => Promise<void>;
  prevText?: string;
  nextText?: string;
  saveText?: string;
  nextPath?: string;
  prevPath?: string;
  disabled?: boolean;
}

export default function NewProductBottomBar({
  showPrev = false,
  showNext = true,
  showSave = true,
  onPrev,
  onNext,
  onSave,
  prevText = "이전",
  nextText = "다음",
  saveText = "임시 저장",
  nextPath,
  prevPath,
  disabled = false,
}: NewProductBottomBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const newProductState = useNewProductStore();
  const contentId = searchParams.get("id") || searchParams.get("contentId"); // URL에서 id 파라미터 가져오기

  // 이전 단계로 이동
  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else if (prevPath) {
      // 직접 지정된 이전 경로가 있는 경우
      const path = contentId
        ? `${prevPath}${prevPath.includes("?") ? "&" : "?"}${prevPath.includes("contentId=") ? "" : "contentId="}${contentId}`
        : prevPath;
      router.push(path);
    } else {
      // 기본 이전 단계 이동 로직
      const currentPath = window.location.pathname;

      if (currentPath.includes("step2")) {
        // step2에서 step1으로 이동
        if (newProductState.contentId) {
          router.push(`/users/newproduct?id=${newProductState.contentId}`);
        } else {
          router.push("/users/newproduct");
        }
      } else if (currentPath.includes("step3")) {
        // step3에서 step2로 이동
        if (newProductState.contentId) {
          router.push(
            `/users/newproduct/step2?contentId=${newProductState.contentId}`,
          );
        } else {
          router.push("/users/newproduct/step2");
        }
      } else {
        // 그 외 기본 뒤로가기
        router.back();
      }
    }
  };

  // 임시 저장 처리
  const handleSaveDraft = async () => {
    if (onSave) {
      await onSave();
      return;
    }

    // 이미 저장 중이면 중복 호출 방지
    if (isSaving) {
      return;
    }

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

      if (newProductState.contentType === "COACHING") {
        // 코칭 타입인 경우 코칭 옵션만 처리
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
              documentProvision:
                option.documentProvision === "PROVIDED"
                  ? "PROVIDED"
                  : option.documentProvision === "NOT_PROVIDED"
                    ? "NOT_PROVIDED"
                    : "NOT_PROVIDED",
              coachingType: option.coachingType || "OFFLINE",
              coachingTypeDescription: option.coachingTypeDescription || "",
            }),
          );
        }
      } else if (newProductState.contentType === "DOCUMENT") {
        // 문서 타입인 경우 문서 옵션만 처리
        if (newProductState.documentOptions.length > 0) {
          draftData.documentOptions = newProductState.documentOptions.map(
            (option) => ({
              name: option.name,
              description: option.description,
              price: option.price,
              contentDeliveryMethod: option.contentDeliveryMethod || null,
              documentFileUrl: option.documentFileUrl || null,
              documentLinkUrl: option.documentLinkUrl || null,
            }),
          );
        }
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

        // 임시 저장 성공 메시지 표시
        alert("임시 저장되었습니다.");

        // URL에 contentId 파라미터 추가하여 라우팅
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("contentId", response.data.id.toString());
        router.push(currentUrl.toString());

        return response.data.id; // contentId 반환
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

    return null; // 기본 반환값
  };

  // 다음 단계로 이동 (임시 저장 없이 바로 이동)
  const handleNext = () => {
    // 다음 단계로 이동
    if (onNext) {
      onNext();
    } else if (nextPath) {
      // 직접 지정된 다음 경로가 있는 경우
      const path = contentId
        ? `${nextPath}${nextPath.includes("?") ? "&" : "?"}${nextPath.includes("contentId=") ? "" : "contentId="}${contentId}`
        : nextPath;
      router.push(path);
    } else {
      // 현재 경로 확인
      const currentPath = window.location.pathname;

      // 기본 다음 단계 이동 로직
      if (currentPath.includes("step2")) {
        // step2에서 step3로 이동
        if (newProductState.contentId) {
          router.push(
            `/users/newproduct/step3?contentId=${newProductState.contentId}`,
          );
        } else {
          router.push("/users/newproduct/step3");
        }
      } else if (currentPath.includes("step3")) {
        // step3에서 완료 페이지로 이동 (예: 마이페이지)
        router.push("/users/myproducts");
      } else {
        // 기본 step1에서 step2로 이동
        if (newProductState.contentId) {
          router.push(
            `/users/newproduct/step2?contentId=${newProductState.contentId}`,
          );
        } else {
          router.push("/users/newproduct/step2");
        }
      }
    }
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 w-full border-t border-line-normal bg-white">
      <div className="flex w-full justify-end p-4">
        {/* 오른쪽 영역 - 임시 저장 및 다음 버튼 */}
        <div className="flex gap-2">
          {showSave && (
            <Button
              buttonType="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              group="solid"
              type="tertiary"
              size="medium"
              className="w-[7.5rem] hover:brightness-95"
            >
              {isSaving ? "저장 중..." : saveText}
            </Button>
          )}

          {prevPath && (
            <Button
              buttonType="button"
              onClick={handlePrev}
              group="solid"
              type="secondary"
              size="medium"
              className="w-[7.5rem] hover:brightness-95"
            >
              {prevText}
            </Button>
          )}

          {showNext && (
            <Button
              buttonType="button"
              onClick={handleNext}
              type="primary"
              group="solid"
              size="medium"
              disabled={disabled}
              className={`w-[7.5rem] ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : "hover:brightness-95"}`}
            >
              {nextText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

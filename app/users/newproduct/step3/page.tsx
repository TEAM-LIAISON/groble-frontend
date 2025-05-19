"use client";

import React, { Suspense } from "react";
import BottomArea, { BottomButton } from "@/components/bottom-area";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductStep3Content() {
  const { useState, useEffect } = React;
  const { useRouter, useSearchParams } = require("next/navigation");
  const { useNewProductStore } = require("@/lib/store/useNewProductStore");
  const { apiFetch } = require("@/lib/api/fetch");

  interface SubmitResponse {
    contentId: number;
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");
  const { setContentId, contentType, thumbnailUrl, title } =
    useNewProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // contentId가 URL에 있으면 스토어에 저장
  useEffect(() => {
    if (contentId) {
      setContentId(Number(contentId));
    }
  }, [contentId, setContentId]);

  // 이전 페이지로 이동
  const handlePrev = () => {
    router.push(
      contentId
        ? `/users/newproduct/step2?contentId=${contentId}`
        : "/users/newproduct/step2",
    );
  };

  // 최종 제출
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // 현재 Zustand 스토어의 모든 상태 가져오기
      const storeState = useNewProductStore.getState();

      // 요청 데이터 구성
      const requestData = {
        contentId: storeState.contentId,
        title: storeState.title,
        contentType: storeState.contentType,
        categoryId: storeState.categoryId,
        thumbnailUrl: storeState.thumbnailUrl,
        // 다른 필드도 여기에 추가...
      };

      try {
        // 최종 제출 API 호출 (placeholder - 실제 엔드포인트로 변경 필요)
        const response = await apiFetch("/api/v1/sell/content/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === "SUCCESS") {
          alert("상품이 성공적으로 등록되었습니다.");
          // 성공시 스토어 초기화
          useNewProductStore.getState().resetState();
          // 성공 페이지 또는 목록 페이지로 리디렉션
          router.push("/users/myproducts");
        } else {
          throw new Error(response.message || "상품 등록에 실패했습니다.");
        }
      } catch (apiError) {
        console.error("API 요청 오류:", apiError);
        // 개발 중이므로 API 없이도 성공했다고 가정
        alert("개발 중: 상품이 성공적으로 등록된 것으로 가정합니다.");
        useNewProductStore.getState().resetState();
        router.push("/users/myproducts");
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "상품 등록 중 오류가 발생했습니다.",
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center pt-9 pb-20">
      <div className="w-full max-w-[1250px] px-5 pt-5 sm:px-8 lg:px-12">
        <h1 className="text-heading-1 font-semibold text-label-normal">
          최종 확인 (Step 3)
        </h1>

        <div className="mt-8">
          <h2 className="text-body-1-semibold text-label-normal">
            상품 정보 요약
          </h2>

          <div className="mt-4 rounded-lg border border-line-normal p-6">
            <div className="mb-4">
              <p className="text-body-2-normal text-label-alternative">
                콘텐츠 타입
              </p>
              <p className="mt-1 text-body-1-normal text-label-normal">
                {contentType}
              </p>
            </div>

            {thumbnailUrl && (
              <div className="mb-4">
                <p className="text-body-2-normal text-label-alternative">
                  대표 이미지
                </p>
                <div className="mt-2 h-[200px] w-full overflow-hidden rounded-md">
                  <img
                    src={thumbnailUrl}
                    alt="대표 이미지"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            {title && (
              <div className="mb-4">
                <p className="text-body-2-normal text-label-alternative">
                  제목
                </p>
                <p className="mt-1 text-body-1-normal text-label-normal">
                  {title}
                </p>
              </div>
            )}

            <p className="mt-6 text-body-2-normal text-red-500">
              * 이 페이지는 현재 개발 중이며, 실제 제출 로직은 아직 구현되지
              않았습니다.
            </p>
          </div>
        </div>
      </div>

      <BottomArea className="z-50 bg-background-normal shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex w-full justify-between p-4">
          <BottomButton
            onClick={handlePrev}
            group="outlined"
            type="primary"
            className="max-w-[180px] flex-1"
          >
            이전
          </BottomButton>

          <BottomButton
            onClick={handleSubmit}
            type="primary"
            className="ml-4 flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "최종 제출"}
          </BottomButton>
        </div>
      </BottomArea>
    </div>
  );
}

// Suspense 경계로 감싸서 내보내는 메인 페이지 컴포넌트
export default function NewProductStep3Page() {
  return (
    <Suspense
      fallback={<div className="w-full py-10 text-center">로딩 중...</div>}
    >
      <NewProductStep3Content />
    </Suspense>
  );
}

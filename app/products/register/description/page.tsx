// pages/users/newproduct/step2.tsx
"use client";

import { SimpleEditor } from "@/components/(improvement)/editor/tiptap-templates/simple/simple-editor";
import NewProductBottomBar from "@/features/products/register/components/new-product-bottom-bar";
import React, { Suspense } from "react";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductStep2Content() {
  const { useRouter, useSearchParams } = require("next/navigation");

  const {
    useNewProductStore,
  } = require("@/features/products/register/store/useNewProductStore");

  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");
  const { setContentId } = useNewProductStore();

  React.useEffect(() => {
    if (contentId) setContentId(Number(contentId));
  }, [contentId, setContentId]);

  const handlePrev = () => router.push("/products/register");
  const handleNext = () =>
    router.push(
      contentId
        ? `/products/register/description?contentId=${contentId}`
        : "/products/register/review",
    );

  return (
    <div className="flex min-h-[calc(100vh-150px)] w-full flex-col items-center pb-24">
      <div className="flex w-full max-w-[1250px] flex-1 flex-col px-5 pt-5 sm:px-8 lg:px-12">
        {/* 콘텐츠 소개 가이드 라인 */}

        {/* 에디터 */}
        <div className="hide-scrollbar mt-9 flex w-full flex-1 flex-col">
          <SimpleEditor />
        </div>
      </div>
      <NewProductBottomBar
        prevPath="/products/register"
        onNext={handleNext}
        disabled={false}
      />
    </div>
  );
}

// Suspense 경계로 감싸서 내보내는 메인 페이지 컴포넌트
export default function NewProductStep2Page() {
  return (
    <Suspense
      fallback={<div className="w-full py-10 text-center">로딩 중...</div>}
    >
      <NewProductStep2Content />
    </Suspense>
  );
}

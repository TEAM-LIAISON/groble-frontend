// pages/users/newproduct/step2.tsx
"use client";

import React, { Suspense } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductStep2Content() {
  const { useRouter, useSearchParams } = require("next/navigation");
  const { useNewProductStore } = require("@/lib/store/useNewProductStore");

  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");
  const { setContentId } = useNewProductStore();

  React.useEffect(() => {
    if (contentId) setContentId(Number(contentId));
  }, [contentId, setContentId]);

  const handlePrev = () => router.push("/users/newproduct");
  const handleNext = () =>
    router.push(
      contentId
        ? `/users/newproduct/step3?contentId=${contentId}`
        : "/users/newproduct/step3",
    );

  return (
    <div className="flex min-h-[calc(100vh-150px)] w-full flex-col items-center pb-24">
      <div className="flex w-full max-w-[1250px] flex-1 flex-col px-5 pt-5 sm:px-8 lg:px-12">
        <h1 className="text-heading-1 font-semibold text-label-normal">
          상세 설명
        </h1>
        <div className="hide-scrollbar mt-3 flex w-full flex-1 flex-col">
          <SimpleEditor />
        </div>
      </div>
      <NewProductBottomBar
        nextPath="/users/newproduct/step3"
        prevPath="/users/newproduct"
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

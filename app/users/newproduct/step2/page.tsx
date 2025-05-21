// pages/users/newproduct/step2.tsx
"use client";

import React, { Suspense } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import NewProductBottomBar from "@/components/products/register/newProductBottomBar";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductStep2Content() {
  const { useState, useEffect } = React;
  const { useRouter, useSearchParams } = require("next/navigation");
  const { useNewProductStore } = require("@/lib/store/useNewProductStore");

  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");
  const { setContentId } = useNewProductStore();
  const [isEditorContentValid, setIsEditorContentValid] = useState(false);

  React.useEffect(() => {
    if (contentId) setContentId(Number(contentId));
  }, [contentId, setContentId]);
  
  // 에디터 내용 검증 함수
  const validateEditorContent = () => {
    const { contentIntroduction } = useNewProductStore.getState();
    
    // HTML 태그를 제거한 텍스트 추출
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentIntroduction || '';
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // 공백을 제거한 텍스트 내용이 있는지 확인
    const isValid = textContent.trim().length > 0;
    
    setIsEditorContentValid(isValid);
    return isValid;
  };
  
  // 초기 검증 및 정기적 검증 설정
  useEffect(() => {
    // 초기 검증 실행
    validateEditorContent();
    
    // 3초마다 에디터 내용 검증
    const intervalId = setInterval(validateEditorContent, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

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
        disabled={!isEditorContentValid}
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

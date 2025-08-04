// app/products/register/description/page.tsx
'use client';

import { Suspense, useEffect } from 'react';
import { SimpleEditor } from '@/components/(improvement)/editor/tiptap-templates/simple/simple-editor';
import WebHeader from '@/components/(improvement)/layout/header';
import NewProductBottomBar from '@/features/products/register/components/new-product-bottom-bar';
import { useProductForm } from '@/features/products/register/hooks/use-product-form';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useNewProductStore } from '@/features/products/register/store/useNewProductStore';

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductStep2Content() {
  const {
    form,
    isLoading,
    saveAndNavigate,
    saveOnly,
    isSaving,
    contentId,
    serverData,
  } = useProductForm();
  const router = useRouter();
  const { contentIntroduction, setContentIntroduction } = useNewProductStore(); // 에디터 내용 가져오기

  // 서버 데이터가 로드되었을 때 에디터에 내용 설정
  useEffect(() => {
    if (serverData) {
      setContentIntroduction(serverData.contentIntroduction || '');
    }
  }, [serverData, setContentIntroduction]);

  const handlePrev = () => {
    const prevUrl = contentId
      ? `/products/register/info?contentId=${contentId}`
      : '/products/register/info';
    // UX 개선: 즉시 이동 (캐싱된 데이터 활용)
    router.push(prevUrl);
  };

  const handleNext = async () => {
    const formData = form.getValues();
    // 에디터 내용을 formData에 추가
    const dataWithEditor = {
      ...formData,
      contentIntroduction: contentIntroduction || '',
    };
    await saveAndNavigate(dataWithEditor, '/products/register/review');
  };

  const handleSave = async () => {
    const formData = form.getValues();
    // 에디터 내용을 formData에 추가
    const dataWithEditor = {
      ...formData,
      contentIntroduction: contentIntroduction || '',
    };
    await saveOnly(dataWithEditor);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="large" color="text-primary-500" />
          <p className="mt-4 text-body-2-reading text-label-assistive">
            데이터를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-150px)] w-full flex-col items-center pb-24">
      <div className="flex w-full max-w-[1250px] flex-1 flex-col px-5 pt-5 md:py-9 sm:px-8 lg:px-12">
        {/* 에디터 */}
        <div className="hide-scrollbar flex w-full flex-1 flex-col">
          <SimpleEditor />
        </div>
      </div>
      <NewProductBottomBar
        showPrev
        showNext
        showSave
        onPrev={handlePrev}
        onNext={handleNext}
        onSave={handleSave}
        isNextLoading={isSaving}
        prevText="이전"
        nextText="다음"
        saveText="임시 저장"
      />
    </div>
  );
}

export default function NewProductStep2() {
  return (
    <>
      <WebHeader mobileBack="back" />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="large" color="text-primary-500" />
          </div>
        }
      >
        <NewProductStep2Content />
      </Suspense>
    </>
  );
}

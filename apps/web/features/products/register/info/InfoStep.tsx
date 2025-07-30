// File: src/features/products/register/info/InfoStep.tsx
'use client';

import { Suspense } from 'react';
import { FormProvider } from 'react-hook-form';
import { useProductForm } from '../hooks/use-product-form';
import { useStepNavigation } from '../hooks/use-step-navigation';
import { useBeforeUnloadWarning } from '../hooks/use-before-unload-warning';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

import ThumbnailSection from '../components/section/tuhumbnail-section';
import BasicInfoSection from '../components/section/basic-info-section';
import ContentDetailSection from '../components/section/content-detail-section';
import PriceOptionSection from '../components/section/price-option-section';
import NewProductBottomBar from '../components/new-product-bottom-bar';

function InfoStepContent() {
  const { form, handleSubmit, isLoading, saveAndNavigate, isSaving } =
    useProductForm();

  const { goPrev } = useStepNavigation();
  const { watch } = form;
  const watchedType = watch('contentType');

  useBeforeUnloadWarning();

  // 다음 단계로 이동
  const handleNext = handleSubmit(async (data) => {
    await saveAndNavigate(data, '/products/register/description');
  });

  // 로딩 상태 표시
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
    <FormProvider {...form}>
      <form>
        <div className="flex min-h-screen flex-col items-center bg-white pt-12 pb-28">
          <div className="flex w-full max-w-[1250px] flex-col gap-[3.38rem] px-5">
            <ThumbnailSection />
            <BasicInfoSection />
            <ContentDetailSection />
            <PriceOptionSection contentType={watchedType} />
          </div>
          <NewProductBottomBar
            showPrev={false}
            showNext
            showSave
            onNext={handleNext}
            disabled={false}
            isNextLoading={isSaving}
            nextText="다음"
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default function InfoStep() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="large" color="text-primary-500" />
        </div>
      }
    >
      <InfoStepContent />
    </Suspense>
  );
}

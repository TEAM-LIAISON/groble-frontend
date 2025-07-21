// File: src/features/products/register/info/InfoStep.tsx
'use client';

import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ProductFormData } from '@/lib/schemas/productSchema';
import { productSchema } from '@/lib/schemas/productSchema';
import { useNewProductStore } from '../store/useNewProductStore';
import { useLoadProduct } from '../hooks/use-load-product';
import { useBeforeUnloadWarning } from '@/features/products/register/hooks/use-before-unload-warning';
import { useStepNavigation } from '@/features/products/register/hooks/use-step-navigation';

import ThumbnailSection from '../components/section/tuhumbnail-section';
import BasicInfoSection from '../components/section/basic-info-section';
import ContentDetailSection from '../components/section/content-detail-section';
import PriceOptionSection from '../components/section/price-option-section';
import NewProductBottomBar from '../components/new-product-bottom-bar';

export default function InfoStep() {
  const params = useSearchParams();
  const contentId = params.get('contentId');

  const {
    setContentId,
    setTitle,
    setContentType,
    setCategoryId,
    setThumbnailUrl,
    setServiceTarget,
    setServiceProcess,
    setMakerIntro,
    setCoachingOptions,
    setDocumentOptions,
    title,
    contentType,
    categoryId,
    thumbnailUrl,
    serviceTarget,
    serviceProcess,
    makerIntro,
    coachingOptions,
    documentOptions,
  } = useNewProductStore();

  // tanstack-query로 데이터 로딩
  const {
    data: loadedFormData,
    isLoading,
    isSuccess,
  } = useLoadProduct(contentId);

  // 기본값 또는 로드된 데이터를 사용한 초기값 계산
  const defaultValues = useMemo((): ProductFormData => {
    // 로드된 데이터가 있으면 사용, 없으면 store 데이터 사용
    if (isSuccess && loadedFormData) {
      return loadedFormData;
    }

    // store에서 현재 데이터로 기본값 생성
    if (contentType === 'COACHING') {
      return {
        title,
        contentType,
        categoryId: categoryId ?? '',
        thumbnailUrl,
        serviceTarget,
        serviceProcess,
        makerIntro,
        coachingOptions,
      };
    } else {
      return {
        title,
        contentType,
        categoryId: categoryId ?? '',
        thumbnailUrl,
        serviceTarget,
        serviceProcess,
        makerIntro,
        documentOptions,
      };
    }
  }, [
    isSuccess,
    loadedFormData,
    title,
    contentType,
    categoryId,
    thumbnailUrl,
    serviceTarget,
    serviceProcess,
    makerIntro,
    coachingOptions,
    documentOptions,
  ]);

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    values: defaultValues, // values를 사용하여 반응적으로 업데이트
  });

  const { handleSubmit, watch } = methods;
  const watchedType = watch('contentType');

  const { goNext, goPrev } = useStepNavigation();

  // contentId URL 파라미터가 변경되면 store에 설정
  useMemo(() => {
    if (contentId) {
      setContentId(Number(contentId));
    }
  }, [contentId, setContentId]);

  // contentType 변경 시 다른 옵션 초기화 (메모이제이션으로 최적화)
  const handleContentTypeChange = useCallback(
    (newContentType: 'COACHING' | 'DOCUMENT') => {
      if (newContentType !== contentType) {
        setContentType(newContentType);

        if (newContentType === 'COACHING') {
          // DOCUMENT → COACHING 변경 시 documentOptions 초기화
          setDocumentOptions([
            {
              optionId: Date.now(),
              name: '',
              description: '',
              price: 0,
              documentFileUrl: null,
              documentLinkUrl: null,
            },
          ]);
        } else if (newContentType === 'DOCUMENT') {
          // COACHING → DOCUMENT 변경 시 coachingOptions 초기화
          setCoachingOptions([
            {
              optionId: Date.now(),
              name: '',
              description: '',
              price: 0,
            },
          ]);
        }
      }
    },
    [contentType, setContentType, setCoachingOptions, setDocumentOptions]
  );

  // watchedType가 변경되면 옵션 초기화 처리
  useMemo(() => {
    if (watchedType && watchedType !== contentType) {
      handleContentTypeChange(watchedType);
    }
  }, [watchedType, contentType, handleContentTypeChange]);

  useBeforeUnloadWarning();

  const onValid = useCallback(
    (data: ProductFormData) => {
      // form 데이터를 zustand 스토어에 저장
      setTitle(data.title);
      setContentType(data.contentType);
      setCategoryId(data.categoryId);
      setThumbnailUrl(data.thumbnailUrl);
      setServiceTarget(data.serviceTarget);
      setServiceProcess(data.serviceProcess);
      setMakerIntro(data.makerIntro);

      // contentType에 따라 옵션 저장 및 다른 옵션 초기화
      if (data.contentType === 'COACHING' && data.coachingOptions) {
        setCoachingOptions(data.coachingOptions);
        // DOCUMENT 옵션 초기화
        setDocumentOptions([
          {
            optionId: Date.now(),
            name: '',
            description: '',
            price: 0,
            documentFileUrl: null,
            documentLinkUrl: null,
          },
        ]);
      } else if (data.contentType === 'DOCUMENT' && data.documentOptions) {
        setDocumentOptions(data.documentOptions);
        // COACHING 옵션 초기화
        setCoachingOptions([
          {
            optionId: Date.now(),
            name: '',
            description: '',
            price: 0,
          },
        ]);
      }

      goNext();
    },
    [
      setTitle,
      setContentType,
      setCategoryId,
      setThumbnailUrl,
      setServiceTarget,
      setServiceProcess,
      setMakerIntro,
      setCoachingOptions,
      setDocumentOptions,
      goNext,
    ]
  );

  const onInvalid = useCallback(
    (errors: any) => {
      console.warn('Validation errors', errors);
      // 에러가 있을 때는 폼을 다시 검증하여 에러 스타일을 표시
      methods.trigger();
    },
    [methods]
  );

  // 다음 버튼 클릭 핸들러 - 항상 실행 가능
  const handleNext = useCallback(() => {
    // 수동으로 폼 유효성 검사 실행
    handleSubmit(onValid, onInvalid)();
  }, [handleSubmit, onValid, onInvalid]);

  // 로딩 중이면 로딩 표시
  if (contentId && isLoading) {
    return (
      <div className="flex w-full flex-col items-center pt-9 pb-28">
        <div className="flex w-full max-w-[1250px] flex-col gap-14 px-5 sm:px-8 lg:px-12">
          <div className="text-center py-20">
            <div className="text-lg text-gray-600">
              제품 정보를 불러오는 중...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form noValidate>
        <div className="flex w-full flex-col items-center pt-9 pb-28">
          <div className="flex w-full max-w-[1250px] flex-col gap-[3.38rem] px-5 ">
            <ThumbnailSection />
            <BasicInfoSection />
            <ContentDetailSection />
            <PriceOptionSection contentType={watchedType} />
          </div>
          <NewProductBottomBar
            showNext
            nextText="다음"
            onPrev={goPrev}
            onNext={handleNext}
            disabled={false}
          />
        </div>
      </form>
    </FormProvider>
  );
}

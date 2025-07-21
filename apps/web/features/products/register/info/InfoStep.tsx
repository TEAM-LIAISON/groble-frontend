// File: src/features/products/register/info/InfoStep.tsx
'use client';

import { useMemo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ProductFormData } from '@/lib/schemas/productSchema';
import { productSchema } from '@/lib/schemas/productSchema';
import { useNewProductStore } from '../store/useNewProductStore';
import { useLoadProduct } from '../hooks/use-load-product';
import { useBeforeUnloadWarning } from '@/features/products/register/hooks/use-before-unload-warning';
import { useStepNavigation } from '@/features/products/register/hooks/use-step-navigation';
import { fetchClient } from '@/shared/api/api-fetch';

import ThumbnailSection from '../components/section/tuhumbnail-section';
import BasicInfoSection from '../components/section/basic-info-section';
import ContentDetailSection from '../components/section/content-detail-section';
import PriceOptionSection from '../components/section/price-option-section';
import NewProductBottomBar from '../components/new-product-bottom-bar';

interface DraftResponse {
  id: number;
}

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
  const { data: loadedData, isLoading, isSuccess } = useLoadProduct(contentId);

  // 데이터 로딩 완료 시 스토어 업데이트 (한 번만)
  const [storeUpdated, setStoreUpdated] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);

  // contentId가 변경되면 storeUpdated 리셋
  useEffect(() => {
    setStoreUpdated(false);
  }, [contentId]);

  useEffect(() => {
    if (isSuccess && loadedData && !storeUpdated) {
      const { detail, coachingOptions, documentOptions } = loadedData;

      // Zustand 스토어 업데이트
      setContentId(detail.contentId);
      setTitle(detail.title);
      setContentType(detail.contentType);
      setCategoryId(String(detail.categoryId));
      setThumbnailUrl(detail.thumbnailUrl);
      setServiceTarget(detail.serviceTarget ?? '');
      setServiceProcess(detail.serviceProcess ?? '');
      setMakerIntro(detail.makerIntro ?? '');
      setCoachingOptions(coachingOptions);
      setDocumentOptions(documentOptions);

      setStoreUpdated(true);
    }
  }, [
    isSuccess,
    loadedData,
    storeUpdated,
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
  ]);

  // 기본값 또는 로드된 데이터를 사용한 초기값 계산
  const defaultValues = useMemo((): ProductFormData => {
    // 로드된 데이터가 있으면 사용
    if (isSuccess && loadedData) {
      return loadedData.formData;
    }

    // contentId가 있는 경우 로딩 완료까지 대기
    if (contentId && !isSuccess) {
      // 기본값 반환 (로딩 중)
      return {
        title: '',
        contentType: 'COACHING',
        categoryId: '',
        thumbnailUrl: '',
        serviceTarget: '',
        serviceProcess: '',
        makerIntro: '',
        coachingOptions: [],
      };
    }

    // contentId가 없는 경우에만 store 데이터 사용
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
    loadedData,
    contentId,
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

  // API 호출을 통한 데이터 저장
  const saveProductData = useCallback(
    async (data: ProductFormData) => {
      try {
        setIsNextLoading(true);

        // 현재 스토어 상태 가져오기
        const currentState = useNewProductStore.getState();

        // 현재 입력된 값만 포함하여 요청 데이터 구성
        const saveData: Record<string, any> = {};

        // 콘텐츠 ID가 있는 경우 포함 (수정인 경우)
        if (currentState.contentId) {
          saveData.contentId = currentState.contentId;
        }

        // 기본 정보
        if (data.title) {
          saveData.title = data.title;
        }
        saveData.contentType = data.contentType;
        if (data.categoryId) {
          saveData.categoryId = data.categoryId;
        }
        if (data.thumbnailUrl) {
          saveData.thumbnailUrl = data.thumbnailUrl;
        }

        // 콘텐츠 소개 정보
        if (data.serviceTarget) {
          saveData.serviceTarget = data.serviceTarget;
        }
        if (data.serviceProcess) {
          saveData.serviceProcess = data.serviceProcess;
        }
        if (data.makerIntro) {
          saveData.makerIntro = data.makerIntro;
        }

        if (data.contentType === 'COACHING') {
          // 코칭 타입인 경우 코칭 옵션만 처리
          if (data.coachingOptions && data.coachingOptions.length > 0) {
            saveData.coachingOptions = data.coachingOptions.map((option) => ({
              name: option.name,
              description: option.description,
              price: option.price,
            }));
          }
        } else if (data.contentType === 'DOCUMENT') {
          // 문서 타입인 경우 문서 옵션만 처리
          if (data.documentOptions && data.documentOptions.length > 0) {
            saveData.documentOptions = data.documentOptions.map((option) => ({
              name: option.name,
              description: option.description,
              price: option.price,
              documentFileUrl: option.documentFileUrl || null,
              documentLinkUrl: option.documentLinkUrl || null,
            }));
          }
        }

        const response = await fetchClient<DraftResponse>(
          '/api/v1/sell/content/draft',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveData),
          }
        );

        if (response.status === 'SUCCESS' && response.data?.id) {
          // 응답으로 받은 contentId를 저장
          setContentId(response.data.id);

          // 성공 후 다음 페이지로 이동
          goNext();
        } else {
          throw new Error(response.message || '저장에 실패했습니다.');
        }
      } catch (error) {
        console.error('저장 중 오류:', error);
        alert(
          error instanceof Error
            ? error.message
            : '저장 중 오류가 발생했습니다.'
        );
      } finally {
        setIsNextLoading(false);
      }
    },
    [setContentId, goNext]
  );

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

      // API 호출로 데이터 저장 후 페이지 이동
      saveProductData(data);
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
      saveProductData,
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

  // 다음 버튼 클릭 핸들러 - 로딩 중에는 중복 실행 방지
  const handleNext = useCallback(() => {
    if (isNextLoading) return; // 로딩 중에는 중복 클릭 방지

    // 수동으로 폼 유효성 검사 실행
    handleSubmit(onValid, onInvalid)();
  }, [handleSubmit, onValid, onInvalid, isNextLoading]);

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
            isNextLoading={isNextLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}

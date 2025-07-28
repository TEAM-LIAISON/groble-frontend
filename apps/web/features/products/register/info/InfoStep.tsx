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
  id?: number;
  contentId?: number;
}

export default function InfoStep() {
  const params = useSearchParams();
  const contentId = params.get('contentId');

  const { setContentId } = useNewProductStore();
  const [isNextLoading, setIsNextLoading] = useState(false);

  // tanstack-query로 데이터 로딩
  const { data: loadedData, isLoading, isSuccess } = useLoadProduct(contentId);

  // 초기값 계산 (단순화 - 고정값 사용)
  const defaultValues = useMemo((): ProductFormData => {
    // 기본값 (고정)
    const defaultFormData: ProductFormData = {
      title: '',
      contentType: 'COACHING',
      categoryId: '',
      thumbnailUrl: '',
      serviceTarget: '',
      serviceProcess: '',
      makerIntro: '',
      coachingOptions: [
        {
          optionId: 1,
          name: '',
          description: '',
          price: 0,
        },
      ],
    };
    return defaultFormData;
  }, []); // 빈 의존성 배열로 고정

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    defaultValues, // values 대신 defaultValues 사용
  });

  const { handleSubmit, watch, reset } = methods;
  const watchedType = watch('contentType');

  // 데이터 로드 완료 시 폼에 적용
  useEffect(() => {
    if (isSuccess && loadedData) {
      console.log('데이터 로드 완료 - 폼에 적용:', loadedData.formData);

      // reset 메서드로 폼 데이터 업데이트 (한 번만)
      reset(loadedData.formData);
    }
  }, [isSuccess, loadedData, reset]);

  const { goNext, goPrev } = useStepNavigation();

  // contentId URL 파라미터 설정
  useEffect(() => {
    if (contentId) {
      setContentId(Number(contentId));
    }
  }, [contentId, setContentId]);

  useBeforeUnloadWarning();

  // API 호출을 통한 데이터 저장 (단순화)
  const saveProductData = useCallback(
    async (data: ProductFormData) => {
      try {
        setIsNextLoading(true);

        const currentState = useNewProductStore.getState();

        // 기본 정보 구성
        const saveData: Record<string, any> = {
          ...(currentState.contentId && { contentId: currentState.contentId }),
          title: data.title,
          contentType: data.contentType,
          categoryId: data.categoryId,
          thumbnailUrl: data.thumbnailUrl,
          ...(data.serviceTarget && { serviceTarget: data.serviceTarget }),
          ...(data.serviceProcess && { serviceProcess: data.serviceProcess }),
          ...(data.makerIntro && { makerIntro: data.makerIntro }),
        };

        // contentType에 따른 옵션 처리
        if (
          data.contentType === 'COACHING' &&
          data.coachingOptions &&
          data.coachingOptions.length > 0
        ) {
          saveData.coachingOptions = data.coachingOptions
            .filter((option) => option.name?.trim())
            .map((option) => ({
              name: option.name,
              description: option.description,
              price: option.price,
            }));
        } else if (
          data.contentType === 'DOCUMENT' &&
          data.documentOptions &&
          data.documentOptions.length > 0
        ) {
          saveData.documentOptions = data.documentOptions
            .filter((option) => option.name?.trim())
            .map((option) => ({
              name: option.name,
              description: option.description,
              price: option.price,
              documentFileUrl: option.documentFileUrl || null,
              documentLinkUrl: option.documentLinkUrl || null,
            }));
        }

        console.log('임시저장 데이터:', saveData);

        const response = await fetchClient<DraftResponse>(
          '/api/v1/sell/content/draft',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(saveData),
          }
        );

        if (response.code === 201 || response.code === 200) {
          if (response.data?.contentId) {
            setContentId(response.data.contentId);
          }
          goNext();
        }
      } catch (error) {
        console.error('저장 중 오류:', error);
      } finally {
        setIsNextLoading(false);
      }
    },
    [setContentId, goNext]
  );

  const onValid = useCallback(
    (data: ProductFormData) => {
      saveProductData(data);
    },
    [saveProductData]
  );

  const onInvalid = useCallback(
    (errors: any) => {
      console.log('폼 검증 실패:', errors);
      methods.trigger();
    },
    [methods]
  );

  const handleNext = useCallback(() => {
    if (isNextLoading) return;
    handleSubmit(onValid, onInvalid)();
  }, [handleSubmit, onValid, onInvalid, isNextLoading]);

  // 로딩 중 표시
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
          <div className="flex w-full max-w-[1250px] flex-col gap-[3.38rem] px-5">
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

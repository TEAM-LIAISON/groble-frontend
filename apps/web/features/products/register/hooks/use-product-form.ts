import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSaveDraft, useDraft } from './use-draft';
import {
  transformFormToDraft,
  transformServerToForm,
  createDefaultFormData,
  isFormDataEqual,
} from '../utils/form-data-transform';
import {
  productSchema,
  type ProductFormData,
} from '@/lib/schemas/productSchema';
import { showToast } from '@/shared/ui/Toast';
import { useNewProductStore } from '../store/useNewProductStore';

/**
 * 프로덕트 폼 통합 관리 hook
 * - 서버를 단일 진실의 소스로 사용
 * - React Query로 캐싱
 * - URL contentId 기반 상태 복원
 */
export function useProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get('contentId');

  // React Query hooks
  const {
    data: serverData,
    isLoading,
    isSuccess,
    isFetching,
    isPreviousData,
  } = useDraft(contentId);
  const saveDraftMutation = useSaveDraft();

  // Zustand store (Review 페이지와 데이터 동기화용)
  const {
    setTitle,
    setContentType,
    setCategoryId,
    setThumbnailUrl,
    setContentIntroduction,
    setServiceTarget,
    setServiceProcess,
    setMakerIntro,
    setCoachingOptions,
    setDocumentOptions,
    setContentId: setStoreContentId,
  } = useNewProductStore();

  // UX 개선: 캐시가 있으면 로딩 스피너 표시하지 않음
  const shouldShowLoading = contentId && isLoading && !serverData;

  // 원본 데이터 저장 (변경사항 비교용)
  const [originalFormData, setOriginalFormData] =
    useState<ProductFormData | null>(null);

  // React Hook Form
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    defaultValues: createDefaultFormData(),
  });

  const { reset, handleSubmit, getValues } = form;

  // Zustand store 업데이트 함수 (Review 페이지와 데이터 동기화)
  const updateZustandStore = useCallback(
    (data: ProductFormData, contentIdValue?: number) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('=== Zustand Store 업데이트 ===');
        console.log('FormData:', data);
        console.log('ContentId:', contentIdValue);
      }

      // 기본 정보 업데이트
      setTitle(data.title);
      setContentType(data.contentType);
      setCategoryId(data.categoryId);
      setThumbnailUrl(data.thumbnailUrl);
      setContentIntroduction(data.contentIntroduction || '');
      setServiceTarget(data.serviceTarget);
      setServiceProcess(data.serviceProcess);
      setMakerIntro(data.makerIntro);

      if (contentIdValue) {
        setStoreContentId(contentIdValue);
      }

      // contentType에 따른 옵션 업데이트
      if (data.contentType === 'COACHING' && data.coachingOptions) {
        setCoachingOptions(
          data.coachingOptions.map((option) => ({
            optionId: option.optionId,
            name: option.name,
            description: option.description,
            price: option.price,
          }))
        );
        setDocumentOptions([]); // 다른 타입 옵션 초기화
      } else if (data.contentType === 'DOCUMENT' && data.documentOptions) {
        setDocumentOptions(
          data.documentOptions.map((option) => ({
            optionId: option.optionId,
            name: option.name,
            description: option.description,
            price: option.price,
            documentFileUrl: option.documentFileUrl || null,
            documentLinkUrl: option.documentLinkUrl || null,
          }))
        );
        setCoachingOptions([]); // 다른 타입 옵션 초기화
      }
    },
    [
      setTitle,
      setContentType,
      setCategoryId,
      setThumbnailUrl,
      setContentIntroduction,
      setServiceTarget,
      setServiceProcess,
      setMakerIntro,
      setCoachingOptions,
      setDocumentOptions,
      setStoreContentId,
    ]
  );

  // 서버 데이터 로드 완료 시 폼에 반영
  useEffect(() => {
    if (isSuccess && serverData) {
      if (process.env.NODE_ENV === 'development') {
        console.log('=== useProductForm 서버 데이터 로드 완료 ===');
        console.log('serverData:', serverData);
      }

      const formData = transformServerToForm(serverData);

      if (process.env.NODE_ENV === 'development') {
        console.log('변환된 formData:', formData);
      }

      reset(formData);
      // 원본 데이터로 저장 (변경사항 비교용)
      setOriginalFormData(formData);

      // 서버 데이터로 Zustand store도 업데이트
      updateZustandStore(formData, serverData.contentId);

      if (process.env.NODE_ENV === 'development') {
        console.log('폼 reset 완료');
      }
    }
  }, [isSuccess, serverData, reset, updateZustandStore]);

  // 임시저장 및 페이지 이동 (UX 개선: 즉시 이동 + 백그라운드 저장 + 변경사항 검사)
  const saveAndNavigate = useCallback(
    async (data: ProductFormData, nextPath: string) => {
      try {
        // 변경사항 검사: 원본 데이터와 현재 데이터 비교
        const hasChanges = originalFormData
          ? !isFormDataEqual(data, originalFormData)
          : true;

        if (process.env.NODE_ENV === 'development') {
          console.log('=== 변경사항 검사 ===');
          console.log('originalFormData:', originalFormData);
          console.log('currentFormData:', data);
          console.log('hasChanges:', hasChanges);
        }

        // 즉시 라우팅 (UX 개선)
        const currentContentId = contentId || 'temp';
        const nextUrl = `${nextPath}?contentId=${currentContentId}`;

        if (process.env.NODE_ENV === 'development') {
          console.log('즉시 이동할 URL:', nextUrl);
        }
        router.push(nextUrl);

        // 변경사항이 있는 경우에만 백그라운드에서 저장
        if (hasChanges) {
          if (process.env.NODE_ENV === 'development') {
            console.log('변경사항 감지 - API 호출 진행');
          }

          const draftData = transformFormToDraft(
            data,
            contentId ? Number(contentId) : undefined
          );

          if (process.env.NODE_ENV === 'development') {
            console.log('임시저장 데이터:', draftData);
          }

          try {
            const response = await saveDraftMutation.mutateAsync(draftData);

            if (response.code === 201 || response.code === 200) {
              const newContentId =
                response.data?.contentId || response.data?.id;

              if (newContentId && newContentId !== currentContentId) {
                // 새로운 contentId로 URL 업데이트 (replace로 히스토리 대체)
                const updatedUrl = `${nextPath}?contentId=${newContentId}`;

                if (process.env.NODE_ENV === 'development') {
                  console.log('URL 업데이트:', updatedUrl);
                }

                router.replace(updatedUrl);
              }

              // 저장 성공 시 새로운 원본 데이터로 업데이트
              setOriginalFormData(data);

              // Zustand store도 업데이트 (Review 페이지와 데이터 동기화)
              updateZustandStore(data, newContentId);

              return newContentId;
            }
          } catch (saveError) {
            console.error('백그라운드 저장 실패:', saveError);
            // 저장 실패해도 페이지는 이미 이동했으므로 사용자 경험 유지
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.log('변경사항 없음 - API 호출 스킵');
          }
        }

        return currentContentId;
      } catch (error) {
        console.error('saveAndNavigate 실패:', error);
        throw error;
      }
    },
    [contentId, originalFormData, saveDraftMutation, router, updateZustandStore]
  );

  // 임시저장만 (페이지 이동 없음 + 변경사항 검사)
  const saveOnly = useCallback(
    async (data?: ProductFormData) => {
      try {
        const formData = data || getValues();

        // 변경사항 검사: 원본 데이터와 현재 데이터 비교
        const hasChanges = originalFormData
          ? !isFormDataEqual(formData, originalFormData)
          : true;

        if (process.env.NODE_ENV === 'development') {
          console.log('=== 임시저장 변경사항 검사 ===');
          console.log('hasChanges:', hasChanges);
        }

        if (!hasChanges) {
          if (process.env.NODE_ENV === 'development') {
            console.log('변경사항 없음 - 임시저장 API 호출 스킵');
          }
          return contentId ? Number(contentId) : null;
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('변경사항 감지 - 임시저장 API 호출 진행');
        }

        const draftData = transformFormToDraft(
          formData,
          contentId ? Number(contentId) : undefined
        );

        const response = await saveDraftMutation.mutateAsync(draftData);

        if (response.code === 201 || response.code === 200) {
          const newContentId = response.data?.contentId || response.data?.id;

          if (newContentId && !contentId) {
            // contentId가 없었다면 URL에 추가
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.set('contentId', String(newContentId));
            const currentPath = window.location.pathname;
            router.replace(`${currentPath}?${currentParams.toString()}`);
          }

          // 저장 성공 시 새로운 원본 데이터로 업데이트
          setOriginalFormData(formData);

          // Zustand store도 업데이트 (Review 페이지와 데이터 동기화)
          updateZustandStore(formData, newContentId);

          return newContentId;
        }

        throw new Error(response.message || '임시 저장에 실패했습니다.');
      } catch (error) {
        console.error('saveOnly 실패:', error);
        throw error;
      }
    },
    [
      contentId,
      originalFormData,
      getValues,
      saveDraftMutation,
      searchParams,
      router,
      updateZustandStore,
    ]
  );

  return {
    // Form 관련
    form,
    handleSubmit,

    // 데이터 상태
    isLoading: shouldShowLoading,
    serverData,
    contentId,

    // 액션
    saveAndNavigate,
    saveOnly,

    // 로딩 상태
    isSaving: saveDraftMutation.isPending,
  };
}

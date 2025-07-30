'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { Button } from '@groble/ui';
import { useNewProductStore } from '../store/useNewProductStore';
import { fetchClient } from '@/shared/api/api-fetch';
import type { ProductFormData } from '@/lib/schemas/productSchema';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { showToast } from '@/shared/ui/Toast';

interface DraftResponse {
  id: number;
}

interface NewProductBottomBarProps {
  showPrev?: boolean;
  showNext?: boolean;
  showSave?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onSave?: () => Promise<void>;
  prevText?: string;
  nextText?: string;
  saveText?: string;
  nextPath?: string;
  prevPath?: string;
  disabled?: boolean;
  isNextLoading?: boolean;
}

export default function NewProductBottomBar({
  showPrev = true,
  showNext = true,
  showSave = true,
  onPrev,
  onNext,
  onSave,
  prevText = '이전',
  nextText = '다음',
  saveText = '임시 저장',
  nextPath,
  prevPath,
  disabled = false,
  isNextLoading = false,
}: NewProductBottomBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isSaving, setIsSaving] = useState(false);
  const newProductState = useNewProductStore();
  const contentId = searchParams.get('id') || searchParams.get('contentId'); // URL에서 id 파라미터 가져오기

  // FormProvider 내부에서만 사용 가능하므로 try-catch로 감싸기
  let formContext: any = null;
  try {
    formContext = useFormContext();
  } catch (error) {
    // FormProvider 외부에서 사용되는 경우 무시
  }

  // 다음 단계로 이동
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextPath) {
      // 직접 지정된 다음 경로가 있는 경우
      const path = contentId
        ? `${nextPath}${nextPath.includes('?') ? '&' : '?'}${
            nextPath.includes('contentId=') ? '' : 'contentId='
          }${contentId}`
        : nextPath;
      router.push(path);
    } else {
      // 기본 다음 단계 이동 로직
      const currentPath = pathname || '/products/register';

      if (currentPath.includes('step2')) {
        // step2에서 step3으로 이동
        if (newProductState.contentId) {
          router.push(
            `/products/register/review?contentId=${newProductState.contentId}`
          );
        } else {
          router.push('/products/register/review');
        }
      } else if (currentPath === '/products/register') {
        // step1에서 step2로 이동
        if (newProductState.contentId) {
          router.push(
            `/products/register/description?contentId=${newProductState.contentId}`
          );
        } else {
          router.push('/products/register/description');
        }
      }
    }
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else if (prevPath) {
      // 직접 지정된 이전 경로가 있는 경우
      const path = contentId
        ? `${prevPath}${prevPath.includes('?') ? '&' : '?'}${
            prevPath.includes('contentId=') ? '' : 'contentId='
          }${contentId}`
        : prevPath;
      router.push(path);
    } else {
      // 기본 이전 단계 이동 로직
      const currentPath = pathname || '/products/register';

      if (currentPath.includes('step2')) {
        // step2에서 step1으로 이동
        if (newProductState.contentId) {
          router.push(`/products/register?id=${newProductState.contentId}`);
        } else {
          router.push('/products/register');
        }
      } else if (currentPath.includes('step3')) {
        // step3에서 step2로 이동
        if (newProductState.contentId) {
          router.push(
            `/products/register/description?contentId=${newProductState.contentId}`
          );
        } else {
          router.push('/products/register/description');
        }
      } else {
        // 그 외 기본 뒤로가기
        router.back();
      }
    }
  };

  // 임시 저장 처리
  const handleSaveDraft = async () => {
    if (onSave) {
      await onSave();
      return;
    }

    // 이미 저장 중이면 중복 호출 방지
    if (isSaving) {
      return;
    }

    try {
      setIsSaving(true);

      // 현재 폼 데이터 가져오기 (폼이 있는 경우에만)
      let currentFormData: ProductFormData | null = null;
      if (formContext && formContext.getValues) {
        try {
          currentFormData = formContext.getValues() as ProductFormData;

          // 폼 데이터를 스토어에 저장
          const {
            setTitle,
            setContentType,
            setCategoryId,
            setThumbnailUrl,
            setServiceTarget,
            setServiceProcess,
            setMakerIntro,
            setCoachingOptions,
            setDocumentOptions,
          } = useNewProductStore.getState();

          if (currentFormData.title) setTitle(currentFormData.title);
          if (currentFormData.contentType)
            setContentType(currentFormData.contentType);
          if (currentFormData.categoryId)
            setCategoryId(currentFormData.categoryId);
          if (currentFormData.thumbnailUrl)
            setThumbnailUrl(currentFormData.thumbnailUrl);
          if (currentFormData.serviceTarget)
            setServiceTarget(currentFormData.serviceTarget);
          if (currentFormData.serviceProcess)
            setServiceProcess(currentFormData.serviceProcess);
          if (currentFormData.makerIntro)
            setMakerIntro(currentFormData.makerIntro);

          // contentType에 따라 옵션 저장
          if (
            currentFormData.contentType === 'COACHING' &&
            currentFormData.coachingOptions
          ) {
            setCoachingOptions(currentFormData.coachingOptions);
          } else if (
            currentFormData.contentType === 'DOCUMENT' &&
            currentFormData.documentOptions
          ) {
            setDocumentOptions(currentFormData.documentOptions);
          }
        } catch (error) {
          console.warn('폼 데이터 가져오기 실패:', error);
        }
      }

      // 업데이트된 스토어 상태 가져오기
      const updatedState = useNewProductStore.getState();

      // 현재 입력된 값만 포함하여 요청 데이터 구성
      const draftData: Record<string, any> = {};

      // 콘텐츠 ID가 있는 경우 포함 (수정인 경우)
      if (updatedState.contentId) {
        draftData.contentId = updatedState.contentId;
      }

      // 기본 정보
      if (updatedState.title) {
        draftData.title = updatedState.title;
      }
      draftData.contentType = updatedState.contentType;
      if (updatedState.categoryId) {
        draftData.categoryId = updatedState.categoryId;
      }
      if (updatedState.thumbnailUrl) {
        draftData.thumbnailUrl = updatedState.thumbnailUrl;
      }

      // 콘텐츠 소개 정보
      if (updatedState.contentIntroduction) {
        draftData.contentIntroduction = updatedState.contentIntroduction;
      }
      if (updatedState.serviceTarget) {
        draftData.serviceTarget = updatedState.serviceTarget;
      }
      if (updatedState.serviceProcess) {
        draftData.serviceProcess = updatedState.serviceProcess;
      }
      if (updatedState.makerIntro) {
        draftData.makerIntro = updatedState.makerIntro;
      }
      if (updatedState.contentDetailImageUrls.length > 0) {
        draftData.contentDetailImageUrls = updatedState.contentDetailImageUrls;
      }

      if (updatedState.contentType === 'COACHING') {
        // 코칭 타입인 경우 코칭 옵션만 처리

        if (
          updatedState.coachingOptions &&
          updatedState.coachingOptions.length > 0
        ) {
          draftData.coachingOptions = updatedState.coachingOptions.map(
            (option) => ({
              name: option.name,
              description: option.description,
              price: option.price,
            })
          );
        }
      } else if (updatedState.contentType === 'DOCUMENT') {
        // 문서 타입인 경우 문서 옵션만 처리

        if (
          updatedState.documentOptions &&
          updatedState.documentOptions.length > 0
        ) {
          draftData.documentOptions = updatedState.documentOptions.map(
            (option) => ({
              name: option.name,
              description: option.description,
              price: option.price,
              documentFileUrl: option.documentFileUrl || null,
              documentLinkUrl: option.documentLinkUrl || null,
            })
          );
        }
      }

      const response = await fetchClient<DraftResponse>(
        '/api/v1/sell/content/draft',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(draftData),
        }
      );

      if (response.status === 'SUCCESS' && response.data?.id) {
        // 응답으로 받은 contentId를 저장
        useNewProductStore.getState().setContentId(response.data.id);

        // 임시 저장 성공 메시지 표시 (토스트로 변경)
        showToast.success('임시 저장되었습니다.');

        // URL에 contentId 파라미터 추가하여 라우팅
        const currentPath = pathname;
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('contentId', response.data.id.toString());
        router.push(`${currentPath}?${currentParams.toString()}`);

        return response.data.id; // contentId 반환
      } else {
        throw new Error(response.message || '임시 저장에 실패했습니다.');
      }
    } catch (error) {
      showToast.error(
        error instanceof Error
          ? error.message
          : '임시 저장 중 오류가 발생했습니다.'
      );
      console.error(error);
    } finally {
      setIsSaving(false);
    }

    return null; // 기본 반환값
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 w-full border-t border-line-normal bg-white">
      <div className="flex w-full justify-end p-4">
        {/* 오른쪽 영역 - 임시저장 - 이전 - 다음 순서 */}
        <div className="flex gap-2">
          {showSave && (
            <Button
              buttonType="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              group="solid"
              type="tertiary"
              size="medium"
              className="w-[7.5rem] hover:brightness-95"
            >
              {isSaving ? '저장 중...' : saveText}
            </Button>
          )}

          {showPrev && onPrev && (
            <Button
              buttonType="button"
              onClick={onPrev}
              group="solid"
              type="secondary"
              size="medium"
              className="w-[7.5rem] hover:brightness-95"
            >
              {prevText}
            </Button>
          )}

          {showNext && (
            <Button
              buttonType={onNext ? 'button' : 'submit'}
              onClick={onNext ? handleNext : undefined}
              group="solid"
              type="primary"
              size="medium"
              disabled={disabled || isNextLoading}
              className={`w-[7.5rem] ${
                disabled || isNextLoading
                  ? 'pointer-events-none cursor-not-allowed opacity-50'
                  : 'hover:brightness-95'
              }`}
            >
              {isNextLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="small" color="text-white" />
                </div>
              ) : (
                nextText
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

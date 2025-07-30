'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import NewProductBottomBar from '@/features/products/register/components/new-product-bottom-bar';
import { showToast } from '@/shared/ui/Toast';
import React, { Suspense } from 'react';

// 타입 정의
interface SubmitResponse {
  contentId: number;
}

interface CoachingOption {
  name: string;
  description: string;
  price: number;
}

interface DocumentOptionRequest {
  name: string;
  description: string;
  price: number;

  documentFileUrl?: string | null;
}

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function NewProductStep3Content() {
  const { useState, useEffect } = React;
  const { useRouter, useSearchParams } = require('next/navigation');
  const {
    useNewProductStore,
  } = require('@/features/products/register/store/useNewProductStore');

  const { fetchClient } = require('@/shared/api/api-fetch');
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get('contentId');
  const { setContentId, contentType, thumbnailUrl, title } =
    useNewProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // contentId가 URL에 있으면 스토어에 저장
  useEffect(() => {
    if (contentId) {
      setContentId(Number(contentId));
    }
  }, [contentId, setContentId]);

  const handlePrev = () => {
    const prevUrl = contentId
      ? `/products/register/description?contentId=${contentId}`
      : '/products/register/description';
    router.push(prevUrl);
  };

  // 심사 요청 처리
  const handleSubmitForReview = async () => {
    try {
      setIsSubmitting(true);

      // 현재 Zustand 스토어의 모든 상태 가져오기
      const storeState = useNewProductStore.getState();

      // 요청 데이터 구성 (임시 저장과 동일한 형태)
      const requestData: Record<string, any> = {};

      // 콘텐츠 ID가 있는 경우 포함
      if (storeState.contentId) {
        requestData.contentId = storeState.contentId;
      }

      // 기본 정보
      if (storeState.title) {
        requestData.title = storeState.title;
      }
      // contentType은 이미 대문자이므로 그대로 전송
      requestData.contentType = storeState.contentType;
      if (storeState.categoryId) {
        requestData.categoryId = storeState.categoryId;
      }
      if (storeState.thumbnailUrl) {
        requestData.thumbnailUrl = storeState.thumbnailUrl;
      }

      // 콘텐츠 소개 정보
      if (storeState.contentIntroduction) {
        requestData.contentIntroduction = storeState.contentIntroduction;
      }
      if (storeState.serviceTarget) {
        requestData.serviceTarget = storeState.serviceTarget;
      }
      if (storeState.serviceProcess) {
        requestData.serviceProcess = storeState.serviceProcess;
      }
      if (storeState.makerIntro) {
        requestData.makerIntro = storeState.makerIntro;
      }
      if (storeState.contentDetailImageUrls.length > 0) {
        requestData.contentDetailImageUrls = storeState.contentDetailImageUrls;
      }

      // contentType에 따라 해당하는 옵션만 전송
      if (storeState.contentType === 'COACHING') {
        // 코칭 타입인 경우 코칭 옵션만 처리
        if (
          storeState.coachingOptions &&
          storeState.coachingOptions.length > 0
        ) {
          requestData.coachingOptions = storeState.coachingOptions.map(
            (option: CoachingOption) => ({
              name: option.name,
              description: option.description,
              price: option.price,
            })
          );
        }
      } else if (storeState.contentType === 'DOCUMENT') {
        // 문서 타입인 경우 문서 옵션만 처리
        if (
          storeState.documentOptions &&
          storeState.documentOptions.length > 0
        ) {
          requestData.documentOptions = storeState.documentOptions.map(
            (option: DocumentOptionRequest) => ({
              name: option.name,
              description: option.description,
              price: option.price,
              deliveryMethod: 'DOWNLOAD',
              documentFileUrl: option.documentFileUrl || null,
            })
          );
        }
      }

      // 심사 요청 API 호출
      const response = await fetchClient('/api/v1/sell/content/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 'SUCCESS') {
        showToast.success('심사 요청이 완료되었습니다.');
        // 성공시 스토어 초기화
        useNewProductStore.getState().resetState();
        // 성공 페이지 또는 목록 페이지로 리디렉션
        setTimeout(() => {
          router.push('/manage/store/dashboard');
        }, 1500);
      } else {
        throw new Error(response.message || '심사 요청에 실패했습니다.');
      }
    } catch (error) {
      showToast.error(
        error instanceof Error
          ? error.message
          : '심사 요청 중 오류가 발생했습니다.'
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center pt-9 pb-20">
      <div className="w-full max-w-[1250px] px-5 pt-5 sm:px-8 lg:px-12">
        <h1 className="text-heading-1 font-semibold text-label-normal md:font-bold">
          상품 판매 전 안내
        </h1>

        <div className="mt-8 mb-20">
          <div className="rounded-lg bg-component-fill-alternative py-6 px-4">
            <ul className="list-disc space-y-2 pl-5 text-label-1-normal text-label-normal">
              <li>
                그로블은 별도 심사 없이 누구나 상품을 등록하고 판매할 수 있어요.
              </li>
              <li>
                등록된 상품은 상시 모니터링되며, 문제가 확인되면 판매가 중단될
                수 있어요.
              </li>
              <li>
                타인의 저작권을 침해한 상품은 법적 책임과 함께 삭제될 수 있어요.
              </li>
              <li>
                등록한 상품은 구매자의 권리를 해치지 않는 범위 내에서만 수정할
                수 있어요.
              </li>
              <li>
                타인 권리 침해, 허위 정보, 불완전한 상품 등록은 제재될 수
                있어요.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <NewProductBottomBar
        showSave={false}
        showNext={true}
        showPrev={true}
        onPrev={handlePrev}
        nextText="판매하기"
        prevText="이전"
        onNext={handleSubmitForReview}
      />
    </div>
  );
}

// Suspense 경계로 감싸서 내보내는 메인 페이지 컴포넌트
export default function NewProductStep3Page() {
  return (
    <>
      <WebHeader />
      <Suspense
        fallback={<div className="w-full py-10 text-center">로딩 중...</div>}
      >
        <NewProductStep3Content />
      </Suspense>
    </>
  );
}

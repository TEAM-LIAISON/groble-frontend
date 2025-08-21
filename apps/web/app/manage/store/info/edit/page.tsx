/**
 * 마켓 관리 편집 페이지
 * 마켓의 기본 정보를 수정하는 페이지
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MarketNameEdit,
  MarketLogoEdit,
  MarketLinkEdit,
  ContactInfoEdit,
} from '@/features/manage/store/ui';
import { RepresentativeContentEdit } from '@/features/manage/store/ui/RepresentativeContentEdit';
import {
  useStoreInfo,
  useUpdateStoreInfo,
} from '@/features/manage/hooks/useStoreInfo';
import type { ContactInfoRequest } from '@/features/manage/types/storeTypes';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { showToast } from '@/shared/ui/Toast';
import MobileStoreHeader from '@/features/manage/store/ui/MobileStoreHeader';
import MobileFloatingButton from '@/shared/ui/MobileFloatingButton';

interface FormData {
  marketName: string;
  marketLinkUrl: string;
  profileImageUrl: string;
  contactInfo: ContactInfoRequest;
  representativeContentId?: string;
}

/**
 * 마켓 관리 편집 페이지 컴포넌트
 */
export default function StoreInfoEditPage() {
  const router = useRouter();
  const { data: marketInfo, isLoading } = useStoreInfo();
  const updateStoreInfo = useUpdateStoreInfo();

  // 폼 데이터 상태
  const [formData, setFormData] = useState<FormData>({
    marketName: '',
    marketLinkUrl: '',
    profileImageUrl: '',
    contactInfo: {},
    representativeContentId: '',
  });

  // 초기 데이터 상태
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isMarketLinkVerified, setIsMarketLinkVerified] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (marketInfo) {
      const initial: FormData = {
        marketName: marketInfo.marketName || '',
        marketLinkUrl: marketInfo.marketLinkUrl || '', // 실제 API 응답에서 가져오기
        profileImageUrl: marketInfo.profileImageUrl || '',
        contactInfo: marketInfo.contactInfo || {},
        representativeContentId:
          marketInfo.representativeContent?.contentId?.toString() || '',
      };

      setFormData(initial);
      setInitialData(initial);

      // 마켓 링크가 있으면 검증된 것으로 간주
      if (marketInfo.marketLinkUrl) {
        setIsMarketLinkVerified(true);
      }
    }
  }, [marketInfo]);

  // 변경사항 감지
  const hasChanges = () => {
    if (!initialData) return false;

    return (
      formData.marketName !== initialData.marketName ||
      formData.marketLinkUrl !== initialData.marketLinkUrl ||
      formData.profileImageUrl !== initialData.profileImageUrl ||
      JSON.stringify(formData.contactInfo) !==
        JSON.stringify(initialData.contactInfo) ||
      formData.representativeContentId !==
        initialData.representativeContentId ||
      logoFile !== null
    );
  };

  // 필수 데이터 체크
  const hasRequiredData = () => {
    // 마켓 링크가 있고 확인되어야 함
    const hasMarketLink =
      formData.marketLinkUrl.trim() !== '' && isMarketLinkVerified;

    // 문의 수단이 최소 1개 이상 있어야 함
    const hasContactInfo = Object.values(formData.contactInfo).some(
      (value) => value && value.trim() !== ''
    );

    return hasMarketLink && hasContactInfo;
  };

  // 완료 버튼 활성화 조건
  const isCompleteButtonEnabled = () => {
    return hasChanges() && hasRequiredData() && !updateStoreInfo.isPending;
  };

  const handleSave = async () => {
    try {
      const updateData = {
        marketName: formData.marketName,
        marketLinkUrl: formData.marketLinkUrl || undefined,
        profileImageUrl: formData.profileImageUrl || undefined,
        contactInfo:
          Object.keys(formData.contactInfo).length > 0
            ? formData.contactInfo
            : undefined,
        representativeContentId: formData.representativeContentId
          ? Number(formData.representativeContentId)
          : undefined,
      };

      await updateStoreInfo.mutateAsync(updateData);
      showToast.success('마켓 정보가 성공적으로 저장되었습니다.');
      router.push('/manage/store/info');
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
    }
  };

  const handleCancel = () => {
    router.push('/manage/store/info');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <MobileStoreHeader title="마켓 관리" />
      <div className="mx-auto rounded-xl bg-white px-5 md:px-9 md:py-12 md:pb-12 md:shadow-card md:mt-16 mt-2">
        {/* 페이지 헤더 */}
        <header className="mb-8 hidden md:block">
          <div className="flex items-center justify-between">
            <h1 className="text-heading-1 font-bold text-label-normal">
              마켓 관리
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-label-alternative border border-line-normal rounded-lg hover:bg-background-alternative transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={!isCompleteButtonEnabled()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isCompleteButtonEnabled()
                    ? 'bg-[#D8FFF4] text-primary-sub-1 hover:brightness-95 cursor-pointer'
                    : 'bg-background-alternative text-label-alternative cursor-not-allowed'
                }`}
              >
                {updateStoreInfo.isPending ? '저장 중...' : '완료'}
              </button>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="space-y-0">
          {/* 마켓 이름 */}
          <MarketNameEdit
            value={formData.marketName}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, marketName: value }))
            }
          />

          {/* 마켓 로고 */}
          <MarketLogoEdit
            logoUrl={formData.profileImageUrl}
            onLogoChange={(fileUrl) => {
              if (fileUrl) {
                setFormData((prev) => ({ ...prev, profileImageUrl: fileUrl }));
              }
            }}
          />

          {/* 마켓 링크 */}
          <MarketLinkEdit
            value={formData.marketLinkUrl}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, marketLinkUrl: value }))
            }
            onVerificationChange={setIsMarketLinkVerified}
          />

          {/* 문의 수단 */}
          <ContactInfoEdit
            value={formData.contactInfo}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, contactInfo: value }))
            }
          />

          {/* 대표 콘텐츠 설정 */}
          <RepresentativeContentEdit
            contentList={marketInfo?.contentCardList || []}
            selectedContentId={formData.representativeContentId}
            onContentSelect={(contentId) =>
              setFormData((prev) => ({
                ...prev,
                representativeContentId: contentId,
              }))
            }
          />
        </main>
      </div>

      {/* 모바일 플로팅 버튼 */}
      <MobileFloatingButton
        onClick={handleSave}
        disabled={!isCompleteButtonEnabled()}
      >
        {updateStoreInfo.isPending ? '저장 중...' : '완료'}
      </MobileFloatingButton>
    </>
  );
}

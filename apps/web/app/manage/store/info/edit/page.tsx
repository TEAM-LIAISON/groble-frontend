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
import {
  useStoreInfo,
  useUpdateStoreInfo,
} from '@/features/manage/hooks/useStoreInfo';
import type { ContactInfoRequest } from '@/features/manage/types/storeTypes';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

interface FormData {
  marketName: string;
  marketLinkUrl: string;
  profileImageUrl: string;
  contactInfo: ContactInfoRequest;
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
  });

  // 초기 데이터 상태
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // 초기 데이터 설정
  useEffect(() => {
    if (marketInfo) {
      const initial: FormData = {
        marketName: marketInfo.marketName || '',
        marketLinkUrl: '', // API 응답에 marketLinkUrl이 없어서 빈 값으로 설정
        profileImageUrl: marketInfo.profileImageUrl || '',
        contactInfo: marketInfo.contactInfo || {},
      };

      setFormData(initial);
      setInitialData(initial);
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
      logoFile !== null
    );
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
      };

      await updateStoreInfo.mutateAsync(updateData);
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
    <div className="mx-auto mt-6 rounded-xl bg-white px-9 py-12">
      {/* 페이지 헤더 */}
      <header className="mb-8">
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
              disabled={!hasChanges() || updateStoreInfo.isPending}
              className={`px-4 py-2 rounded-lg transition-colors ${
                hasChanges() && !updateStoreInfo.isPending
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
          onLogoChange={(file) => {
            setLogoFile(file);
            // 파일이 선택되면 URL을 생성하여 미리보기용으로 사용
            if (file) {
              const url = URL.createObjectURL(file);
              setFormData((prev) => ({ ...prev, profileImageUrl: url }));
            }
          }}
        />

        {/* 마켓 링크 */}
        <MarketLinkEdit
          value={formData.marketLinkUrl}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, marketLinkUrl: value }))
          }
        />

        {/* 문의 수단 */}
        <ContactInfoEdit
          value={formData.contactInfo}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, contactInfo: value }))
          }
        />
      </main>
    </div>
  );
}

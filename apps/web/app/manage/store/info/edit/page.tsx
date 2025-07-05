/**
 * 마켓 관리 편집 페이지
 * 마켓의 기본 정보를 수정하는 페이지
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MarketNameEdit,
  MarketLogoEdit,
  MarketLinkEdit,
  RepresentativeContentEdit,
} from '@/features/manage/store/ui';

/**
 * 마켓 관리 편집 페이지 컴포넌트
 */
export default function StoreInfoEditPage() {
  const router = useRouter();
  const [marketName, setMarketName] = useState('주주님의 마켓');
  const [marketLink, setMarketLink] = useState('');
  const [selectedField, setSelectedField] = useState('유튜브 선택');
  const [selectedContentId, setSelectedContentId] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSave = () => {
    // 저장 로직 구현
    console.log('저장하기', {
      marketName,
      marketLink,
      selectedField,
      selectedContentId,
      logoFile,
    });
    router.push('/manage/store/info');
  };

  const handleCancel = () => {
    router.push('/manage/store/info');
  };

  return (
    <div className="mx-auto mt-6 rounded-xl bg-white px-9 py-12">
      {/* 페이지 헤더 */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-1 font-bold text-label-normal">
            마켓 관리
          </h1>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#D8FFF4] text-primary-sub-1 rounded-lg cursor-pointer hover:brightness-95"
          >
            완료
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="space-y-0">
        {/* 마켓 이름 */}
        <MarketNameEdit value={marketName} onChange={setMarketName} />

        {/* 마켓 로고 */}
        <MarketLogoEdit onLogoChange={setLogoFile} />

        {/* 마켓 링크 */}
        <MarketLinkEdit value={marketLink} onChange={setMarketLink} />

        {/* 대표 콘텐츠 설정 */}
        <RepresentativeContentEdit
          selectedContentId={selectedContentId}
          onContentSelect={setSelectedContentId}
        />
      </main>
    </div>
  );
}

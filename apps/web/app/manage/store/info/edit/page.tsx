/**
 * 마켓 관리 편집 페이지
 * 마켓의 기본 정보를 수정하는 페이지
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  InputField,
  MarketLogoUpload,
  MarketLinkSetting,
  FieldSelection,
  RepresentativeContent,
  BasicInfoEditSection,
  OperationInfoEditSection,
} from '@/features/manage/store/ui';

/**
 * 마켓 관리 편집 페이지 컴포넌트
 */
export default function StoreInfoEditPage() {
  const router = useRouter();
  const [marketName, setMarketName] = useState('주주님의 마켓');
  const [marketLink, setMarketLink] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [representative, setRepresentative] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    // 저장 로직 구현
    console.log('저장하기');
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
            className="px-4 py-2 bg-primary-normal text-white rounded-lg 
                     hover:bg-primary-strong transition-colors
                     text-body-2-semibold"
          >
            완료
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="space-y-8">
        {/* 마켓 이름 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-title-3-bold text-label-normal">마켓 이름</h2>
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <InputField
            label="마켓 이름"
            placeholder="마켓 이름을 입력해주세요"
            required
            value={marketName}
            onChange={setMarketName}
          />
        </section>

        {/* 마켓 로고 */}
        <section>
          <MarketLogoUpload />
        </section>

        {/* 마켓 링크 */}
        <section>
          <MarketLinkSetting value={marketLink} onChange={setMarketLink} />
        </section>

        {/* 분야 수단 */}
        <section>
          <FieldSelection />
        </section>

        {/* 대표 콘텐츠 설정 */}
        <section>
          <RepresentativeContent />
        </section>

        {/* 기본 정보 */}
        <BasicInfoEditSection
          phone={phone}
          email={email}
          website={website}
          description={description}
          onPhoneChange={setPhone}
          onEmailChange={setEmail}
          onWebsiteChange={setWebsite}
          onDescriptionChange={setDescription}
        />

        {/* 운영 정보 */}
        <OperationInfoEditSection
          businessNumber={businessNumber}
          representative={representative}
          address={address}
          onBusinessNumberChange={setBusinessNumber}
          onRepresentativeChange={setRepresentative}
          onAddressChange={setAddress}
        />

        {/* 버튼 영역 */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-line-normal rounded-lg hover:bg-surface-neutral transition-colors"
          >
            <span className="text-body-2-semibold text-label-normal">취소</span>
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary-normal text-white rounded-lg hover:bg-primary-strong transition-colors"
          >
            <span className="text-body-2-semibold">저장하기</span>
          </button>
        </div>
      </main>
    </div>
  );
}

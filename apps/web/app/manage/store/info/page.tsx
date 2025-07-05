/**
 * 스토어 기본 정보 관리 페이지
 * 마켓의 기본 정보를 설정하고 관리하는 페이지
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '기본 정보 - 스토어 관리',
  description: '마켓의 기본 정보를 설정하고 관리합니다.',
};

/**
 * 기본 정보 입력 필드 인터페이스
 */
interface InfoFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'url';
  description?: string;
}

/**
 * 기본 정보 입력 필드 컴포넌트
 */
function InfoField({
  label,
  placeholder,
  required = false,
  type = 'text',
  description,
}: InfoFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1 text-body-1-semibold text-label-normal">
        {label}
        {required && <span className="text-system-error">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-line-normal rounded-lg 
                   focus:border-primary-normal focus:outline-none
                   placeholder:text-label-alternative"
      />
      {description && (
        <p className="text-body-3-normal text-label-alternative">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * 기본 정보 섹션 컴포넌트
 */
function BasicInfoSection() {
  return (
    <section className="bg-white rounded-xl p-6 border border-line-normal">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-title-3-bold text-label-normal">기본 정보</h2>
        <button
          className="px-4 py-2 bg-primary-normal text-white rounded-lg 
                          hover:bg-primary-strong transition-colors
                          text-body-2-semibold"
        >
          저장하기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField
          label="마켓 이름"
          placeholder="마켓 이름을 입력해주세요"
          required
          description="고객에게 보여질 마켓의 이름입니다."
        />

        <InfoField
          label="연락처"
          placeholder="010-0000-0000"
          type="tel"
          required
          description="고객 문의 시 사용될 연락처입니다."
        />

        <InfoField
          label="이메일"
          placeholder="example@email.com"
          type="email"
          required
          description="공식 연락용 이메일 주소입니다."
        />

        <InfoField
          label="웹사이트"
          placeholder="https://example.com"
          type="url"
          description="마켓 공식 웹사이트 주소입니다."
        />
      </div>

      <div className="mt-6">
        <label className="flex items-center gap-1 text-body-1-semibold text-label-normal mb-2">
          마켓 소개
        </label>
        <textarea
          placeholder="마켓에 대한 소개를 작성해주세요"
          rows={4}
          className="w-full px-4 py-3 border border-line-normal rounded-lg 
                     focus:border-primary-normal focus:outline-none
                     placeholder:text-label-alternative resize-none"
        />
        <p className="text-body-3-normal text-label-alternative mt-2">
          고객들에게 보여질 마켓 소개 문구입니다.
        </p>
      </div>
    </section>
  );
}

/**
 * 운영 정보 섹션 컴포넌트
 */
function OperationInfoSection() {
  return (
    <section className="bg-white rounded-xl p-6 border border-line-normal">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-title-3-bold text-label-normal">운영 정보</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField
          label="사업자 등록번호"
          placeholder="000-00-00000"
          description="사업자 등록번호를 입력해주세요."
        />

        <InfoField
          label="대표자명"
          placeholder="홍길동"
          required
          description="사업자 등록증상의 대표자명입니다."
        />

        <div className="md:col-span-2">
          <InfoField
            label="사업장 주소"
            placeholder="서울특별시 강남구 테헤란로 427"
            description="사업자 등록증상의 사업장 주소입니다."
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface-neutral rounded-lg">
        <h3 className="text-body-1-semibold text-label-normal mb-2">
          안내사항
        </h3>
        <ul className="space-y-1 text-body-3-normal text-label-alternative">
          <li>• 사업자 등록번호는 세금계산서 발행 시 필요합니다.</li>
          <li>• 운영 정보는 관리자 승인 후 변경됩니다.</li>
          <li>• 허위 정보 입력 시 서비스 이용이 제한될 수 있습니다.</li>
        </ul>
      </div>
    </section>
  );
}

/**
 * 기본 정보 관리 페이지 컴포넌트
 */
export default function StoreInfoPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 페이지 헤더 */}
      <header className="mb-8">
        <h1 className="text-title-2-bold text-label-normal mb-2">
          기본 정보 관리
        </h1>
        <p className="text-body-2-normal text-label-alternative">
          마켓의 기본 정보와 운영 정보를 설정하고 관리할 수 있습니다.
        </p>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="space-y-8">
        <BasicInfoSection />
        <OperationInfoSection />
      </main>
    </div>
  );
}

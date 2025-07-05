import InputField from './InputField';

/**
 * 운영 정보 섹션 컴포넌트 - 뷰어용
 */
export function OperationInfoViewSection() {
  return (
    <section className="bg-white rounded-xl p-6 border border-line-normal">
      <div className="mb-6">
        <h2 className="text-title-3-bold text-label-normal">운영 정보</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

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
 * 운영 정보 섹션 컴포넌트 - 편집용
 */
interface OperationInfoEditSectionProps {
  businessNumber: string;
  representative: string;
  address: string;
  onBusinessNumberChange: (value: string) => void;
  onRepresentativeChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export function OperationInfoEditSection({
  businessNumber,
  representative,
  address,
  onBusinessNumberChange,
  onRepresentativeChange,
  onAddressChange,
}: OperationInfoEditSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 border border-line-normal">
      <h2 className="text-title-3-bold text-label-normal mb-6">운영 정보</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="사업자 등록번호"
          placeholder="000-00-00000"
          value={businessNumber}
          onChange={onBusinessNumberChange}
        />

        <InputField
          label="대표자명"
          placeholder="홍길동"
          required
          value={representative}
          onChange={onRepresentativeChange}
        />

        <div className="md:col-span-2">
          <InputField
            label="사업장 주소"
            placeholder="서울특별시 강남구 테헤란로 427"
            value={address}
            onChange={onAddressChange}
          />
        </div>
      </div>
    </section>
  );
}

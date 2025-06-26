import Link from 'next/link';
import Checkbox from '@/components/ui/CheckBox';

type AgreementsType = {
  all: boolean;
  privacy: boolean;
  service: boolean;
  marketing: boolean;
  age: boolean;
  maker: boolean;
};

interface TermsCheckboxListProps {
  agreements: AgreementsType;
  userType: 'maker' | 'buyer';
  onIndividualAgree: (key: keyof AgreementsType) => (checked: boolean) => void;
  onMarketingModalOpen?: () => void;
}

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="#9DA3AB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TermsCheckboxList({
  agreements,
  userType,
  onIndividualAgree,
  onMarketingModalOpen,
}: TermsCheckboxListProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* 전체 동의 */}
      <div className="py-2 flex items-center">
        <Checkbox
          selected={agreements.all}
          onChange={onIndividualAgree('all')}
          label="약관 전체동의"
          size="medium"
          textClass="text-body-1-normal font-semibold text-label-normal"
        />
      </div>
      <hr className="border-line-normal" />

      {/* 개별 약관 동의 */}
      <div className="flex flex-col gap-2">
        {/* 만 14세 이상입니다 */}
        <div className="flex items-center justify-between py-2">
          <Checkbox
            selected={agreements.age}
            onChange={onIndividualAgree('age')}
            label="[필수] 만 14세 이상입니다"
            size="medium"
            textClass="text-body-2-normal text-label-normal"
          />
        </div>

        {/* 개인정보 수집 및 이용 동의 */}
        <div className="flex items-center justify-between py-2">
          <Checkbox
            selected={agreements.privacy}
            onChange={onIndividualAgree('privacy')}
            label="[필수] 개인정보 수집 및 이용 동의"
            size="medium"
            textClass="text-body-2-normal text-label-normal"
          />
          <Link
            href="https://paint-crowley-ff2.notion.site/1f2c158365ac808cb22ecd38fe6d3ef7?pvs=4"
            className="p-2 hover:bg-gray-50 rounded"
            target="_blank"
          >
            <ArrowIcon />
          </Link>
        </div>

        {/* 서비스 이용약관 동의 */}
        <div className="flex items-center justify-between py-2">
          <Checkbox
            selected={agreements.service}
            onChange={onIndividualAgree('service')}
            label="[필수] 서비스 이용약관 동의"
            size="medium"
            textClass="text-body-2-normal text-label-normal"
          />
          <Link
            href="/https://paint-crowley-ff2.notion.site/1f2c158365ac80c39fc3ef1b8764f53a?pvs=4"
            className="p-2 hover:bg-gray-50 rounded"
            target="_blank"
          >
            <ArrowIcon />
          </Link>
        </div>

        {/* 메이커 이용약관 동의 */}
        {userType === 'maker' && (
          <div className="flex items-center justify-between py-2">
            <Checkbox
              selected={agreements.maker}
              onChange={onIndividualAgree('maker')}
              label="[필수] 메이커 이용약관 동의"
              size="medium"
              textClass="text-body-2-normal text-label-normal"
            />
            <Link
              href="https://paint-crowley-ff2.notion.site/1f2c158365ac80afafe6c9d7c1011d39?pvs=4"
              className="p-2 hover:bg-gray-50 rounded"
              target="_blank"
            >
              <ArrowIcon />
            </Link>
          </div>
        )}

        {/* 마케팅 정보 수신 동의 */}
        <div className="flex items-center justify-between py-2">
          <Checkbox
            selected={agreements.marketing}
            onChange={onIndividualAgree('marketing')}
            label="[선택] 마케팅 활용 및 수신 동의"
            size="medium"
            textClass="text-body-2-normal text-label-normal"
          />
          {onMarketingModalOpen && (
            <button
              onClick={onMarketingModalOpen}
              className="p-2 hover:bg-gray-50 rounded"
              type="button"
            >
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

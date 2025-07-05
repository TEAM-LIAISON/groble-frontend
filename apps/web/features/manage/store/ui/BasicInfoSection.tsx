import InputField from './InputField';
import HighlightText from './HighlightText';
import { VertifyBadgeIcon } from '@/components/(improvement)/icons/Vertify_badge';
import Image from 'next/image';

/**
 * 기본 정보 섹션 컴포넌트 - 뷰어용
 */
export function BasicInfoViewSection() {
  return (
    <section className="flex flex-col">
      {/* 마켓 이름 */}
      <div className="my-6 flex gap-1 items-center">
        <h1 className="text-body-1-normal font-bold text-label-normal">
          <HighlightText>주주님의 마켓</HighlightText>
        </h1>

        <VertifyBadgeIcon />
      </div>

      {/* 마켓 로고 */}
      <div className="flex flex-col">
        <h2 className="text-body-2-normal font-bold text-label-normal">
          마켓 로고
        </h2>
        <hr className="my-3 border-line-normal" />

        <div className="w-[4rem] h-[4rem] rounded-full relative">
          <Image
            src={'/assets/common/icons/Avatar.svg'}
            alt="마켓 로고"
            fill
            className="rounded-full"
          />
        </div>
      </div>

      {/* 문의 수단 */}
      <div className="flex flex-col mt-10">
        <h2 className="text-body-2-normal font-bold text-label-normal">
          문의 수단
        </h2>
        <hr className="my-3 border-line-normal" />
        {/* 문의 수단 없을 경우 */}
        {/* <div className="rounded-lg bg-background-alternative py-4 px-3 max-w-[20.9rem] text-label-1-normal font-semibold text-label-alternative">
          문의 수단을 추가해주세요
        </div> */}

        {/* 문의 수단 있을 경우 */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-label-1-normal font-semibold text-label-alternative">
              인스타그램
            </p>
            <div className="rounded-lg bg-background-alternative py-4 px-3 max-w-[20.9rem] text-label-1-normal font-semibold text-label-normal">
              www.instagram.com/willowovv/
            </div>
          </div>
        </div>
      </div>

      {/* 대표 콘텐츠 */}
      <div className="flex flex-col mt-10">
        <h2 className="text-body-2-normal font-bold text-label-normal">
          대표 콘텐츠
        </h2>
        <hr className="my-3 border-line-normal" />

        {/* 대표 콘텐츠 있을 경우 */}
        {/* <p className="text-label-1-normal font-semibold text-label-alternative">
          대표 콘텐츠를 추가해주세요
        </p> */}

        {/* 대표 콘텐츠 없을 경우 */}
        <div className="flex gap-3 items-center">
          <div className="w-[5rem] h-[5rem] rounded-sm relative">
            <Image
              src={'/assets/common/icons/Avatar.svg'}
              alt="대표 콘텐츠"
              fill
              className="rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-1 ">
            <p className="text-body-1-normal font-semibold text-label-normal">
              한번에 배우는 뭘 배우는 제목
              <br /> 제목은 최대 두줄
            </p>
            <p className="text-label-1-normal font-semibold text-label-alternative">
              김로블
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 기본 정보 섹션 컴포넌트 - 편집용
 */
interface BasicInfoEditSectionProps {
  phone: string;
  email: string;
  website: string;
  description: string;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function BasicInfoEditSection({
  phone,
  email,
  website,
  description,
  onPhoneChange,
  onEmailChange,
  onWebsiteChange,
  onDescriptionChange,
}: BasicInfoEditSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 border border-line-normal">
      <h2 className="text-title-3-bold text-label-normal mb-6">기본 정보</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="연락처"
          placeholder="010-0000-0000"
          type="tel"
          required
          value={phone}
          onChange={onPhoneChange}
        />

        <InputField
          label="이메일"
          placeholder="example@email.com"
          type="email"
          required
          value={email}
          onChange={onEmailChange}
        />

        <InputField
          label="웹사이트"
          placeholder="https://example.com"
          type="url"
          value={website}
          onChange={onWebsiteChange}
        />
      </div>

      <div className="mt-6">
        <label className="flex items-center gap-1 text-body-1-semibold text-label-normal mb-2">
          마켓 소개
        </label>
        <textarea
          placeholder="마켓에 대한 소개를 작성해주세요"
          rows={4}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full px-4 py-3 border border-line-normal rounded-lg 
                     focus:border-primary-normal focus:outline-none
                     placeholder:text-label-alternative resize-none"
        />
      </div>
    </section>
  );
}

import Image from 'next/image';
import { ArrowIcon } from '../assets';

export default function IntroContentSection3() {
  return (
    <div className="flex flex-col">
      <div>
        <span className="rounded-sm bg-[#D8FFF4] px-3 py-2 text-primary-sub-1">
          대시보드
        </span>
      </div>
      <h2 className="text-title-3 md:text-title-2 font-bold text-label-normal relative mt-5">
        스토어 현황을 한 눈에 확인해요.
      </h2>
      <p className="text-heading-1 text-label-alternative mt-1">
        총 수익, 조회수, 고객수, 유입 경로 등을 확인할 수 있어요.
      </p>

      <Image
        src="/images/intro/section-3-ui-pc.svg"
        alt="section-3-ui-pc"
        width={1040}
        height={511}
        className="mt-6 md:block hidden"
      />

      <div className="w-full mt-5 md:hidden block">
        <Image
          src="/images/intro/section-3-ui-mobile.svg"
          alt="section-3-ui-mobile"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

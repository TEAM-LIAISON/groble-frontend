import Image from 'next/image';

export default function IntroContentSection4() {
  return (
    <div className="flex flex-col md:items-start items-center">
      <div className="flex flex-col md:items-start items-center max-w-[14.5rem] md:max-w-none">
        <span className="text-body-1-normal font-semibold rounded-sm bg-[#D8FFF4] px-3 py-2 text-primary-sub-1">
          마켓 관리
        </span>
        <h2 className="text-center text-title-3 md:text-title-2 font-bold text-label-normal relative mt-5">
          나의 브랜드 마켓을
          <br className="md:hidden block" /> 생성하고 관리해요
        </h2>
      </div>
      <p className="text-body-2-normal md:text-heading-1 text-label-alternative mt-1 text-center">
        마켓명, 로고, URL, 문의 수단을 설정할 수 있어요
      </p>

      <Image
        src="/images/intro/section-4-ui-pc.svg"
        alt="section-4-ui-pc"
        width={1040}
        height={817}
        className="mt-6 md:block hidden scale-[1.03]"
      />

      <div className="w-full mt-5 md:hidden block">
        <Image
          src="/images/intro/section-4-ui-mobile.svg"
          alt="section-4-ui-mobile"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto scale-[1.03]"
        />
      </div>
    </div>
  );
}

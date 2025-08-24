import FadeUp from '@/shared/ui/interaction/fade-up';
import Image from 'next/image';

export default function IntroContentSection5() {
  return (
    <div className="flex flex-col md:items-start items-center">
      <FadeUp>
        <div className="flex flex-col md:items-start items-center max-w-[14.5rem] md:max-w-none">
          <span className="text-body-1-normal font-semibold rounded-sm bg-[#D8FFF4] px-3 py-2 text-primary-sub-1">
            상품 관리
          </span>
          <h2 className="text-center text-title-3 md:text-title-1 font-bold text-label-normal relative mt-5">
            콘텐츠를 등록하고
            <br className="md:hidden block" /> 자유롭게 판매해요
          </h2>
        </div>
        <p className="text-body-2-normal md:text-heading-1 text-label-alternative mt-1 text-center">
          콘텐츠 등록 및 수정, 판매를 통해
          <br className="md:hidden block" /> 데이터를 확인하고 관리할 수 있어요
        </p>
      </FadeUp>

      <FadeUp delay={0.2}>
        <Image
          src="/images/intro/section-5-1-ui-pc.svg"
          alt="section-5-ui-pc"
          width={1040}
          height={817}
          className="mt-6 md:block hidden scale-[1.03]"
        />
      </FadeUp>
      <FadeUp delay={0.2}>
        <Image
          src="/images/intro/section-5-2-ui-pc.svg"
          alt="section-5-2-ui-pc"
          width={1040}
          height={817}
          className="mt-6 md:block hidden scale-[1.03]"
        />
      </FadeUp>

      <FadeUp delay={0.2} className="w-full mt-5 md:hidden block">
        <Image
          src="/images/intro/section-5-1-ui-mobile.svg"
          alt="section-5-1-ui-mobile"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto scale-[1.03]"
          unoptimized
        />
      </FadeUp>
      <FadeUp delay={0.2} className="w-full mt-5 md:hidden block">
        <Image
          src="/images/intro/section-5-2-ui-mobile.svg"
          alt="section-5-2-ui-mobile"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto scale-[1.03]"
          unoptimized
        />
      </FadeUp>
    </div>
  );
}

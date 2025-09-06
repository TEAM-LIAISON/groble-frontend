import FadeUp from '@/shared/ui/interaction/fade-up';
import Image from 'next/image';

export default function IntroContentSection3() {
  return (
    <div className="flex flex-col md:items-start items-center px-5">
      <FadeUp className="flex flex-col md:items-start items-center max-w-[14.5rem] md:max-w-none">
        <div>
          <span className="text-body-1-normal font-semibold rounded-sm bg-[#D8FFF4] px-3 py-2 text-primary-sub-1">
            대시보드
          </span>
        </div>
        <h2 className="text-center text-title-3 md:text-title-2 font-bold text-label-normal relative mt-5">
          스토어 운영 현황을
          <br className="md:hidden block" /> 한 눈에 확인해요
        </h2>
        <p className="text-body-2-normal md:text-headline-1 text-label-alternative mt-1 text-center ">
          총 수익, 조회수, 고객수, 유입 경로 등을 확인할 수 있어요
        </p>
      </FadeUp>

      <FadeUp delay={0.2}>
        <Image
          src="/images/intro/section-3-ui-pc.svg"
          alt="section-3-ui-pc"
          width={1040}
          height={511}
          className="mt-6 md:block hidden scale-[1.03]"
          unoptimized
        />
      </FadeUp>

      <FadeUp delay={0.2} className="w-full mt-5 md:hidden block">
        <Image
          src="/images/intro/section-3-ui-mobile.png"
          alt="section-3-ui-mobile"
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

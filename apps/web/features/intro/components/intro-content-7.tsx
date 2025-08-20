import FadeUp from '@/shared/ui/interaction/fade-up';
import Image from 'next/image';

export default function IntroContentSection7() {
  return (
    <div className="flex flex-col md:items-start items-center">
      <FadeUp>
        <div className="flex flex-col md:items-start items-center">
          <span className="text-body-1-normal font-semibold rounded-sm bg-[#D8FFF4] px-3 py-2 text-primary-sub-1">
            정산 관리
          </span>
          <h2 className="text-center text-title-3 md:text-title-2 font-bold text-label-normal relative mt-5">
            정산 현황을 한 눈에 확인해요
          </h2>
        </div>
        <p className="text-body-2-normal md:text-heading-1 text-label-alternative mt-1 text-center">
          누적 금액, 예정 금액, 정산 내역, 상태를
          <br className="md:hidden block" />
          확인할 수 있어요.
        </p>
      </FadeUp>

      <FadeUp delay={0.2}>
        <Image
          src="/images/intro/section-7-ui-pc.svg"
          alt="section-7-ui-pc"
          width={1040}
          height={715}
          className="mt-6 md:block hidden scale-[1.03]"
        />
      </FadeUp>
      <FadeUp delay={0.2} className="w-full mt-5 md:hidden block">
        <Image
          src="/images/intro/section-7-ui-mobile.svg"
          alt="section-7-ui-mobile"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto scale-[1.03]"
        />
      </FadeUp>
    </div>
  );
}

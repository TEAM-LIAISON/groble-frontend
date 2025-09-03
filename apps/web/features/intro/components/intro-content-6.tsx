import FadeUp from '@/shared/ui/interaction/fade-up';
import Image from 'next/image';

export default function IntroContentSection6() {
  return (
    <div className="flex flex-col md:items-start items-center px-5">
      <FadeUp>
        <div className="flex flex-col md:items-start items-center">
          <span className="text-body-1-normal font-semibold rounded-sm bg-[#D8FFF4] px-3 py-2 text-primary-sub-1">
            상품 관리
          </span>
          <h2 className="text-center text-title-3 md:text-title-2 font-bold text-label-normal relative mt-5">
            나의 판매 데이터와
            <br className="md:hidden block" /> 리뷰를 관리해요
          </h2>
        </div>
        <p className="text-body-2-normal md:text-headline-1 text-label-alternative mt-1 text-center">
          판매 리스트를 확인하고,
          <br className="md:hidden block" /> 고객이 남긴 리뷰에 답글로 소통할 수
          있어요
        </p>
      </FadeUp>

      <FadeUp delay={0.2}>
        <Image
          src="/images/intro/section-6-ui-pc.svg"
          alt="section-6-ui-pc"
          width={1040}
          height={1016}
          className="mt-6 md:block hidden scale-[1.03]"
          unoptimized
        />
      </FadeUp>

      {/* 모바일 이미지 */}
      <FadeUp delay={0.2} className="w-full mt-5 md:hidden block">
        <Image
          src="/images/intro/section-6-ui-mobile.png"
          alt="section-6-ui-mobile"
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

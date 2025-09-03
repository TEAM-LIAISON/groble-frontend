import FadeIn from '@/shared/ui/interaction/fade-in';
import Image from 'next/image';

export default function IntroHeroSection() {
  return (
    <>
      <FadeIn className="flex sm:flex-row flex-col sm:items-center px-5">
        <Image src="/images/groble-3d-1.svg" alt="groble-3d-icon" width={120} height={129} className="mb-12 md:mr-6" />
        <div className="flex flex-col md:px-5">
          <div className="text-title-3 md:text-title-2 font-bold text-label-normal md:leading-10 mb-2">
            지금, 그로블에 당신만의
            <br />
            <span className="text-primary-sub-1">특화된 콘텐츠를 등록</span>
            해보세요
          </div>
          <p className="text-body-1-normal text-label-alternative md:text-headline-1 mb-3">
            그로블은 단순 판매를 넘어, 고객과 관계를 만들고,
            <br /> 지속적인 수익을 창출하는 공간입니다.
          </p>

          <div className="flex flex-wrap gap-1.5 text-caption-1 font-semibold py-2">
            <span className="rounded-full px-3 py-1.5 bg-[#D8FFF4] text-primary-sub-1">
              #전자책
            </span>
            <span className="rounded-full px-3 py-1.5 bg-[#D8FFF4] text-primary-sub-1">
              #문서 · 템플릿
            </span>
            <span className="rounded-full px-3 py-1.5 bg-[#D8FFF4] text-primary-sub-1">
              #강의 · 컨설팅
            </span>
            <span className="rounded-full px-3 py-1.5 bg-[#D8FFF4] text-primary-sub-1">
              #제작 · 대행
            </span>
          </div>
        </div>
      </FadeIn>
    </>
  );
}

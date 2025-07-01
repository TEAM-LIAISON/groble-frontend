import Image from 'next/image';

export default function IntroHeroSection() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[67.5rem] flex flex-col py-[3.5rem]">
        {/* 첫번째 섹션 */}
        <div className="flex sm:flex-row flex-col gap-11 sm:items-center">
          <div className="w-[7.5rem] h-[8rem] relative">
            <Image src={'/images/groble-3d-1.svg'} alt="intro-1" fill />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-title-3 md:text-title-2 font-bold text-label-normal md:leading-10">
              지금, 그로블에 당신만의
              <br />
              <span className="text-primary-sub-1">특화된 콘텐츠를 등록</span>
              해보세요
            </div>
            <p className="text-body-1-normal text-label-alternative md:text-headline-1">
              그로블은 단순 판매를 넘어, 고객과 관계를 만들고,
              <br /> 지속적인 수익을 창출하는 공간입니다.
            </p>

            <div className="mt-1 flex flex-wrap gap-[0.38rem] text-caption-1 font-semibold">
              <span className="rounded-full px-3 py-[0.38rem] bg-[#D8FFF4] text-primary-sub-1">
                #전자책
              </span>
              <span className="rounded-full px-3 py-[0.38rem] bg-[#D8FFF4] text-primary-sub-1">
                #문서 · 템플릿
              </span>
              <span className="rounded-full px-3 py-[0.38rem] bg-[#D8FFF4] text-primary-sub-1">
                #강의 · 컨설팅
              </span>
              <span className="rounded-full px-3 py-[0.38rem] bg-[#D8FFF4] text-primary-sub-1">
                #제작 · 대행
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

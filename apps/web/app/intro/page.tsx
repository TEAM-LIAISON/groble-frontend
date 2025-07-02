import WebHeader from '@/components/(improvement)/layout/header';
import { IntroContentSection1, IntroHeroSection } from '@/features/intro';
import IntroContentSection2 from '@/features/intro/components/intro-content-2';
import IntroContentSection3 from '@/features/intro/components/intro-content-3';
import IntroContentSection4 from '@/features/intro/components/intro-content-4';

export default function IntroPage() {
  return (
    <>
      <WebHeader />

      <div className="flex flex-col gap-[3.5rem] ">
        <div className="w-full flex justify-center">
          <div className="w-[67.5rem] flex flex-col py-[3.5rem] gap-[3.5rem] px-5">
            <IntroHeroSection />
            {/* 그로블은 메이커를 위한 서비스입니다. */}
            <IntroContentSection1 />
            {/* 이런 메이커를 찾고 있어요 */}
            <IntroContentSection2 />
            {/* 그로블 서비스 흐름 */}
            <IntroContentSection3 />
            {/* 얼리메이커를 위한 혜택 */}
            <IntroContentSection4 />
          </div>
        </div>
      </div>
    </>
  );
}

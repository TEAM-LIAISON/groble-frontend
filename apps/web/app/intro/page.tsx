'use client';

import Footer from '@/components/(improvement)/layout/footer';
import WebHeader from '@/components/(improvement)/layout/header';
import NavigationBar from '@/components/navigation-bar';
import {
  IntroContentSection1,
  IntroHeroSection,
  IntroFloatingButton,
} from '@/features/intro';
import FaqSection from '@/features/intro/components/faq-section';
import IntroContentSection2 from '@/features/intro/components/intro-content-2';
import IntroContentSection3 from '@/features/intro/components/intro-content-3';
import IntroContentSection4 from '@/features/intro/components/intro-content-4';
import IntroContentSection5 from '@/features/intro/components/intro-content-5';
import IntroContentSection6 from '@/features/intro/components/intro-content-6';
import { useUserStore } from '@/lib/store/useUserStore';

export default function IntroPage() {
  const { user } = useUserStore();
  const isLoggedIn = !!user && user.isLogin === true;
  return (
    <div className="w-full">
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

            {/* 콘텐츠 종류별 판매가이드 */}
            <IntroContentSection5 />

            {/* 콘텐츠 종류별 판매가이드 */}
            <IntroContentSection6 />

            {/* FAQ */}
            <FaqSection />
          </div>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>

      {/* 로그인 상태에 따른 조건부 렌더링 */}
      {isLoggedIn ? <NavigationBar /> : <IntroFloatingButton />}
    </div>
  );
}

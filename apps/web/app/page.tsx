'use client';

import { useEffect } from 'react';
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
import IntroContentSection7 from '@/features/intro/components/intro-content-7';
import IntroContentSection8 from '@/features/intro/components/intro-content-8';
import { useUserStore } from '@/lib/store/useUserStore';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { amplitudeEvents } from '@/lib/utils/amplitude';

export default function HomePage() {
  const { user, isHydrated } = useUserStore();
  const isLoggedIn = !!user && user.isLogin === true;

  // 페이지 뷰 이벤트 트래킹
  useEffect(() => {
    amplitudeEvents.pageView("Home Page", {
      user_type: isLoggedIn ? (user?.isGuest ? "guest" : "member") : "anonymous",
      is_logged_in: isLoggedIn,
    });
  }, [isLoggedIn, user?.isGuest]);

  if (!isHydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <WebHeader />
      <div className="flex flex-col gap-14">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[720px] flex flex-col md:py-14 py-12 gap-12 md:gap-14">
            <IntroHeroSection />
            {/* 그로블은 메이커를 위한 서비스입니다. */}
            <IntroContentSection1 />

            {/* 이런 메이커를 찾고 있어요 */}
            <IntroContentSection2 />

            {/* 스토어 운영 현황을 한 눈에 확인해요 */}
            <IntroContentSection3 />

            {/* 나의 브랜드 마켓을 생성하고 관리해요 */}
            <IntroContentSection4 />

            {/* 콘텐츠를 등록하고 자유롭게 판매해요 */}
            <IntroContentSection5 />

            {/* 나의 판매 데이터와 리뷰를 관리해요 */}
            <IntroContentSection6 />

            {/* 정산 현황을 한 눈에 확인해요 */}
            <IntroContentSection7 />

            {/* 콘텐츠 종류별 판매가이드 */}
            <IntroContentSection8 />

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


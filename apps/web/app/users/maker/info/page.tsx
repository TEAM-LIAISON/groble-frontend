'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import MakerInfoForm from '@/features/makerAuth/ui/MakerInfoForm';
import { Suspense, useEffect } from 'react';
import { amplitudeEvents } from '@/lib/utils/amplitude';

function MakerInfoContent() {
  // 메이커 인증 페이지 뷰 이벤트 트래킹
  useEffect(() => {
    amplitudeEvents.pageView('Maker Authentication Page', {
      page_type: 'maker_auth',
      step: 'info',
    });
  }, []);

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)] md:pt-10">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <MakerInfoForm />
        </div>
      </div>
    </>
  );
}

export default function MakerInfoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MakerInfoContent />
    </Suspense>
  );
}

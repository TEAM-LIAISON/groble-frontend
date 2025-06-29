'use client';

import WebHeader from '@/components/(improvement)/layout/header';
import MakerInfoForm from '@/features/makerAuth/ui/MakerInfoForm';
import { Suspense } from 'react';

function MakerInfoContent() {
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

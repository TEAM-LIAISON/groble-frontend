import WebHeader from '@/components/(improvement)/layout/header';
import Header, { Back } from '@/components/header';
import MakerCertForm from '@/features/makerAuth/maker-cert';
import { Suspense } from 'react';

export default function MakerCertPage() {
  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
        <div className="w-full md:mt-[150px] md:max-w-[480px]">
          <main className="px-5 md:p-0">
            <Suspense fallback={<div>로딩 중...</div>}>
              <MakerCertForm />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}

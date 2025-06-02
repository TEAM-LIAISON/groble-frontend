import Header, { Back } from "@/components/header";
import MakerCertForm from "@/features/makerAuth/maker-cert";
import { Suspense } from "react";

export default function MakerCertPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />

        <main className="px-5 md:p-0">
          <Suspense fallback={<div>로딩 중...</div>}>
            <MakerCertForm />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

import Header, { Back } from "@/components/header";
import MakerInfoForm from "@/features/makerAuth/maker-info";
import { Suspense } from "react";

export default function MakerInfoPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[9rem] md:max-w-[480px]">
        <Header left={<Back />} />

        <main className="px-5 md:p-0">
          <Suspense fallback={<div>로딩 중...</div>}>
            <MakerInfoForm />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

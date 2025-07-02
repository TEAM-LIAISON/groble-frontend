import WebHeader from '@/components/(improvement)/layout/header';
import { IntroContentSection1, IntroHeroSection } from '@/features/intro';

export default function IntroPage() {
  return (
    <>
      <WebHeader />

      <div className="flex flex-col gap-[3.5rem] px-5">
        <div className="w-full flex justify-center">
          <div className="w-[67.5rem] flex flex-col py-[3.5rem] gap-[3.5rem]">
            <IntroHeroSection />
            <IntroContentSection1 />
          </div>
        </div>
      </div>
    </>
  );
}

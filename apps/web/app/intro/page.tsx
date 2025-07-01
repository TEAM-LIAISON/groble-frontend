import WebHeader from '@/components/(improvement)/layout/header';
import { IntroHeroSection } from '@/features/intro';

export default function IntroPage() {
  return (
    <>
      <WebHeader />
      <div className="flex flex-col gap-[3.5rem] px-5">
        <IntroHeroSection />
      </div>
    </>
  );
}

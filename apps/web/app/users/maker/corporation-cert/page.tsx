import WebHeader from '@/components/(improvement)/layout/header';
import MakerCorporationCertForm from '@/features/makerAuth/maker-corporation-cert-form';

export default function MakerCorporationCertPage() {
  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
        <div className="w-full md:mt-9 md:max-w-[480px]">
          <main className="p-5 md:p-0">
            <h1 className="text-heading-1 font-semibold text-label-normal md:text-title-3 md:font-bold">
              개인 • 법인 사업자
            </h1>
            <p className="mt-[0.12rem] text-body-2-normal font-medium text-label-alternative md:text-body-1-normal">
              사업자등록증과 동일하게 작성해 주세요
            </p>
            <MakerCorporationCertForm />
          </main>
        </div>
      </div>
    </>
  );
}

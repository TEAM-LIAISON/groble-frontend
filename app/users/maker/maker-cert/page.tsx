import Header, { Back } from "@/components/header";
import MakerCertForm from "@/features/makerAuth/maker-cert";
import PrivateInfoForm from "@/features/makerAuth/maker-info";

export default function MakerCertPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />

        <main className="p-5 md:p-0">
          <MakerCertForm />
        </main>
      </div>
    </div>
  );
}

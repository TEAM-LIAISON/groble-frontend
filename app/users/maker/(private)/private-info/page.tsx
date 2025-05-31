import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import PrivateInfoForm from "@/features/makerAuth/privateInfo/PrivateInfoForm";

export default function PrivateMakerInfoPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />

        <main className="p-5 md:p-0">
          <h1 className="text-title-3 font-bold text-label-normal">
            개인 메이커
          </h1>

          <PrivateInfoForm />
        </main>
      </div>
    </div>
  );
}

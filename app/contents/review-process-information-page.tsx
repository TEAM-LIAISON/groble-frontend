import Header, { Back } from "@/components/header";
import ReviewProcessInformationForm from "./review-process-information-form";

export default async function ReviewProcessInformationPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <ReviewProcessInformationForm />
      </div>
    </div>
  );
}

import Header, { Back } from "@/components/header";
import ReviewProcessInformationForm from "./review-process-information-form";

export default async function ReviewProcessInformationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <ReviewProcessInformationForm />
    </div>
  );
}

import Header, { Back } from "@/components/header";
import GuidanceForm from "./guidance-form";

export default async function GuidancePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <GuidanceForm />
    </div>
  );
}

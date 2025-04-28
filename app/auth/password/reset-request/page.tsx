import Header, { Back } from "@/components/header";
import ResetRequestForm from "./form";

export default function ResetRequestPage() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <ResetRequestForm />
      </main>
    </>
  );
}

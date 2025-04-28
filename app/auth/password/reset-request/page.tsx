import Header, { Back } from "@/components/header";
import RequestPasswordResetForm from "./form";

export default function ResetRequestPage() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <RequestPasswordResetForm />
      </main>
    </>
  );
}

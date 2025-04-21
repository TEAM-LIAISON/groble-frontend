import Header, { Back } from "@/components/header";
import AgreeToTermsForm from "./form";

export default function AgreeToTerms() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <AgreeToTermsForm />
      </main>
    </>
  );
}

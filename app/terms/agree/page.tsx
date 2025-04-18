import Header, { BackButton } from "@/components/header";
import AgreeToTermsForm from "./form";

export default function AgreeToTerms() {
  return (
    <>
      <Header leftIcons={<BackButton />} />
      <main className="flex flex-col gap-8 p-5">
        <AgreeToTermsForm />
      </main>
    </>
  );
}

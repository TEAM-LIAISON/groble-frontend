import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import AgreeToTermsForm from "./form";

export const metadata: Metadata = {
  title: "회원 탈퇴",
};

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

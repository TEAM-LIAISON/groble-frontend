import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import AgreeToTermsForm from "./form";

export const metadata: Metadata = {
  title: "회원 탈퇴",
};

export default function AgreeToTerms() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <AgreeToTermsForm />
      </main>
    </div>
  );
}

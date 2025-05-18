import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { getSignUp } from "../actions";
import TermsForm from "./form";

export const metadata: Metadata = {
  title: "약관 동의",
};

export default async function TermsPage() {
  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <main className="flex flex-col gap-8 p-5">
          <TermsForm
            userType={(await getSignUp()).userType as "SELLER" | "BUYER"}
          />
        </main>
      </div>
    </div>
  );
}

import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { getSignUp } from "../actions";
import EmailForm from "./form";

export const metadata: Metadata = {
  title: "이메일 입력",
};

export default async function EmailPage() {
  const email = (await getSignUp()).email;

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <main className="flex flex-col gap-8 p-5">
          <EmailForm email={email} />
        </main>
      </div>
    </div>
  );
}

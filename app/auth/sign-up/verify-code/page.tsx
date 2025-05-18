import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { getSignUp } from "../actions";
import VerifyCodeForm from "./form";

export const metadata: Metadata = {
  title: "이메일 인증",
};

export default async function VerifyCodePage() {
  const email = (await getSignUp()).email;

  if (!email) throw new Error("email not found");

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <main className="flex flex-col gap-8 p-5">
          <VerifyCodeForm email={email} />
        </main>
      </div>
    </div>
  );
}

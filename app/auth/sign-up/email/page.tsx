import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { cookies } from "next/headers";
import EmailForm from "./form";

export const metadata: Metadata = {
  title: "이메일 입력",
};

export default async function EmailPage() {
  const email = (await cookies()).get("email")?.value;

  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <EmailForm email={email} />
      </main>
    </div>
  );
}

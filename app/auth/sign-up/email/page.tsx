import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import EmailForm from "./form";

export const metadata: Metadata = {
  title: "이메일",
};

export default function EmailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <EmailForm />
      </main>
    </div>
  );
}

import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import PasswordForm from "./form";

export const metadata: Metadata = {
  title: "비밀번호 입력",
};

export default function PasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <PasswordForm />
      </main>
    </div>
  );
}

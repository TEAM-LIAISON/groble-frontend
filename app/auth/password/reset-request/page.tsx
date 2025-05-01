import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import ResetRequestForm from "./form";

export const metadata: Metadata = {
  title: "비밀번호 재설정 요청",
};

export default function ResetRequestPage() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <ResetRequestForm />
      </main>
    </>
  );
}

import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import NicknameForm from "./form";

export const metadata: Metadata = {
  title: "닉네임 입력",
};

export default function NicknamePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <NicknameForm />
      </main>
    </div>
  );
}

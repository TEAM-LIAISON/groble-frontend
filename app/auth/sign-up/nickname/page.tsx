import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import NicknameForm from "./form";

export const metadata: Metadata = {
  title: "이메일",
};

export default function NicknamePage() {
  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <NicknameForm />
      </main>
    </>
  );
}

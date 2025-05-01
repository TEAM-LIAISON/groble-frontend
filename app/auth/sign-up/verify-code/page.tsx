import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { cookies } from "next/headers";
import VerifyCodeForm from "./form";

export const metadata: Metadata = {
  title: "이메일 인증",
};

export default async function VerifyCodePage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("Sign-Up-Email")?.value;

  if (!email) throw new Error("Sign-Up-Email not found");

  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <VerifyCodeForm email={email} />
      </main>
    </>
  );
}

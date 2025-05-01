import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import PasswordForm from "./form";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
};

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <PasswordForm token={token} />
      </main>
    </>
  );
}

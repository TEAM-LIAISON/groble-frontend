import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import ResetPasswordForm from "./form";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <main className="flex flex-col gap-8 p-5">
          <ResetPasswordForm token={token} />
        </main>
      </div>
    </div>
  );
}

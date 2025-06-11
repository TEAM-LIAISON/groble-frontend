import Header, { Back } from "@/components/header";
import { getUserMyPageDetail } from "@/lib/api";
import { Metadata } from "next";
import ResetPasswordRequestForm from "./form";

export const metadata: Metadata = {
  title: "비밀번호 재설정 요청",
};

export default async function ResetPasswordRequestPage() {
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  let email;
  if (response.status == 200) email = response.data.data?.email;

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <main className="flex flex-col gap-8 p-5">
          <ResetPasswordRequestForm email={email} />
        </main>
      </div>
    </div>
  );
}

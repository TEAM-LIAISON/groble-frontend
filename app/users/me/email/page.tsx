import Header, { Back } from "@/components/header";
import { getUserMyPageDetail } from "@/lib/api";
import { Metadata } from "next";
import EmailForm from "./form";

export const metadata: Metadata = {
  title: "이메일 입력",
};

export default async function EmailPage() {
  const userMyPageDetail = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (userMyPageDetail.status != 200) throw new Error("getUserMyPageDetail");

  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <EmailForm email={userMyPageDetail.data.data?.email} />
      </main>
    </div>
  );
}

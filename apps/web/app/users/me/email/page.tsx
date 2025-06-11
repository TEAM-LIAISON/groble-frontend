import Header, { Back } from "@/components/header";
import { getUserMyPageDetail } from "@/lib/api";
import { Metadata } from "next";
import EmailForm from "./form";

export const metadata: Metadata = {
  title: "이메일 입력",
};

export default async function EmailPage() {
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (response.status != 200) throw new Error(JSON.stringify(response));

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <main className="flex flex-col gap-8 p-5">
          <EmailForm email={response.data.data?.email} />
        </main>
      </div>
    </div>
  );
}

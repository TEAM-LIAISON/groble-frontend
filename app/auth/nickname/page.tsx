import Header, { Back } from "@/components/header";
import { getUserMyPageDetail } from "@/lib/api";
import { Metadata } from "next";
import NicknameForm from "./form";

export const metadata: Metadata = {
  title: "이메일",
};

export default async function NicknamePage() {
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (response.status !== 200) return <div>에러</div>;

  return (
    <>
      <Header left={<Back />} />
      <main className="flex flex-col gap-8 p-5">
        <NicknameForm nickname={response.data.nickname} />
      </main>
    </>
  );
}

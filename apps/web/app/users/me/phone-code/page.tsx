import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import PhoneCodeForm from "./form";

export const metadata: Metadata = {
  title: "휴대폰 번호 인증",
};

export default async function PhoneCodePage({
  searchParams,
}: {
  searchParams: Promise<{ "phone-number": string }>;
}) {
  const { "phone-number": phoneNumber } = await searchParams;

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <main className="flex flex-col gap-8 p-5">
          <PhoneCodeForm phoneNumber={phoneNumber} />
        </main>
      </div>
    </div>
  );
}

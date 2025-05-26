import Header, { Back } from "@/components/header";
import { getUserMyPageDetail } from "@/lib/api";
import { Metadata } from "next";
import PhoneSellerTermsForm from "./form";

export const metadata: Metadata = {
  title: "휴대폰 번호 설정 필요",
};

export default async function PhoneSellerTermsPage() {
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  let phoneNumber;
  if (response.status == 200) phoneNumber = response.data.data?.phoneNumber;

  return (
    <div className="flex h-screen flex-col">
      <Header left={<Back />} />
      <main className="flex flex-1 flex-col items-center justify-center gap-1.5 p-5 text-center">
        <PhoneSellerTermsForm phoneNumber={phoneNumber} />
      </main>
    </div>
  );
}

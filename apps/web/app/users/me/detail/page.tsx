import Header, { Back, Settings } from "@/components/header";
import { Metadata } from "next";
import Link from "next/link";
import Detail from "./detail";

export const metadata: Metadata = {
  title: "마이페이지 상세 조회",
};

export default async function DetailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-alternative md:items-center md:justify-start">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header
          left={<Back />}
          right={
            <Link href="/users/me/settings">
              <Settings />
            </Link>
          }
        />
        <Detail />
      </div>
    </div>
  );
}

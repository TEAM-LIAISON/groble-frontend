import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import SettingList from "./setting-list";

export const metadata: Metadata = {
  title: "마이페이지 설정",
};

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-alternative md:items-center md:justify-start">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <div className="flex flex-col gap-4">
          <SettingList />
        </div>
      </div>
    </div>
  );
}

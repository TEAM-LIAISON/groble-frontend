import Header, { Settings } from "@/components/header";
import NavigationBar from "@/components/navigation-bar";
import { getUserMyPageSummary } from "@/lib/api";
import { Metadata } from "next";
import Link from "next/link";
import Detail from "./detail/detail";
import SettingList from "./settings/setting-list";
import { Summary } from "./summary";

export const metadata: Metadata = {
  title: "마이페이지",
};

export default async function SummaryPage() {
  const response = await getUserMyPageSummary(
    // @ts-expect-error
    {},
  );

  if (response.status != 200) throw new Error(JSON.stringify(response));

  return (
    <div className="flex h-screen flex-col bg-background-alternative md:bg-white">
      <Header
        right={
          <Link href="/users/me/settings">
            <Settings />
          </Link>
        }
      />
      <Summary
        response={response}
        detail={<Detail className="hidden md:mt-[80px] md:flex" />}
        settings={<SettingList className="hidden md:mt-[80px] md:flex" />}
      />
      <NavigationBar />
    </div>
  );
}

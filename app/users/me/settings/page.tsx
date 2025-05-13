import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import { ReactNode } from "react";
import AdvertisingAgreement from "./advertising-agreement";
import DeleteAccount from "./delete-account";
import SignOut from "./sign-out";

export const metadata: Metadata = {
  title: "마이페이지 설정",
};

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-alternative">
      <Header left={<Back />} />
      <div className="flex flex-col gap-4">
        <ItemList>
          <ItemGroup>
            <SignOut />
          </ItemGroup>
          <ItemGroup>
            <DeleteAccount />
          </ItemGroup>
          <ItemGroup>
            <AdvertisingAgreement />
          </ItemGroup>
        </ItemList>
      </div>
    </div>
  );
}

function ItemList({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-5 text-body-1-normal font-semibold">
      {children}
    </div>
  );
}

function ItemGroup({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-7 rounded-[12px] bg-background-normal">
      {children}
    </div>
  );
}

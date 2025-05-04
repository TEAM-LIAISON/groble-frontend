import Header, { Back } from "@/components/header";
import Switch from "@/components/switch";
import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { UrlObject } from "url";
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
            <Item>
              <SignOut />
            </Item>
          </ItemGroup>
          <ItemGroup>
            <Item>
              <DeleteAccount />
            </Item>
          </ItemGroup>
          <ItemGroup>
            <Item href="#" rightText={<Switch />}>
              광고성 정보 수신 동의
            </Item>
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
    <div className="flex flex-col gap-7 rounded-[12px] bg-background-normal px-4 py-5">
      {children}
    </div>
  );
}

function Item({
  icon,
  href,
  children,
  rightText,
}: {
  icon?: ReactNode;
  href?: string | UrlObject;
  children?: ReactNode;
  rightText?: ReactNode;
}) {
  return href ? (
    <Link className="flex items-center gap-2" href={href}>
      {icon}
      <span className="flex-1">{children}</span>
      {rightText}
    </Link>
  ) : (
    <div className="flex items-center gap-2">
      {icon}
      <span className="flex-1">{children}</span>
      {rightText}
    </div>
  );
}

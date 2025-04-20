import Button from "@/components/button";
import Header, { BackButton } from "@/components/header";
import Popover, { PopoverClose } from "@/components/popover";
import Switch from "@/components/switch";
import Link from "next/link";
import { ReactNode } from "react";
import { UrlObject } from "url";

export default function SettingsPage() {
  return (
    <div className="flex flex-col bg-background-alternative">
      <Header leftIcons={<BackButton />} />
      <div className="flex flex-col gap-4">
        <ItemList>
          <ItemGroup>
            <Item>
              <button popoverTarget="popover">로그아웃</button>
            </Item>
            <Popover>
              로그아웃할까요?
              <div className="flex w-[90%] gap-1">
                <PopoverClose />
                <Button size="small" className="flex-1">
                  로그아웃
                </Button>
              </div>
            </Popover>
          </ItemGroup>
          <ItemGroup>
            <Item href="/auth/delete-account">탈퇴하기</Item>
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

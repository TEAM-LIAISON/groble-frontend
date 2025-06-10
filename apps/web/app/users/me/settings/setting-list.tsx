import { getAdvertisingAgreementStatus } from "@/lib/api";
import { ReactNode } from "react";
import AdvertisingAgreement from "./advertising-agreement";
import DeleteAccount from "./delete-account";
import SignOut from "./sign-out";

export default async function SettingList({
  className,
}: {
  className?: string;
}) {
  const response = await getAdvertisingAgreementStatus(
    // @ts-expect-error
    {},
  );
  if (response.status != 200) throw new Error(JSON.stringify(response));

  return (
    <div className={className}>
      <ItemList>
        <ItemGroup className="md:hidden">
          <SignOut />
        </ItemGroup>
        <ItemGroup>
          <DeleteAccount />
        </ItemGroup>
        <ItemGroup>
          <AdvertisingAgreement
            agreed={response.data.data as unknown as boolean}
          />
        </ItemGroup>
      </ItemList>
    </div>
  );
}

function ItemList({ children }: { children?: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-3 p-5 text-body-1-normal font-semibold">
      {children}
    </div>
  );
}

function ItemGroup({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-7 rounded-[12px] bg-background-normal ${className}`}
    >
      {children}
    </div>
  );
}

import { ShareIcon } from "@/components/icons/ShareIcon";
import { UserIcon } from "@/components/icons/UserIcon";
import Image from "next/image";

interface ProductInfoProps {
  contentType: string;
  title: string;
  sellerProfileImageUrl: string;
  sellerName: string;
}

export default function ProductInfo({
  contentType,
  title,
  sellerProfileImageUrl,
  sellerName,
}: ProductInfoProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-between">
        <div className="flex gap-[0.38rem]">
          <span className="rounded-sm bg-primary-sub-1 px-2 py-1 text-xs text-label-inverse">
            {contentType === "DOCUMENT" ? "자료" : "코칭"}
          </span>
        </div>

        <ShareIcon className="h-5 w-5 cursor-pointer" />
      </div>

      <h1 className="mt-3 text-heading-1 font-bold text-label-normal">
        {title}
      </h1>

      <span className="mt-2 flex items-center gap-2">
        <div className="relative h-9 w-9 rounded-full">
          {sellerProfileImageUrl ? (
            <Image
              src={sellerProfileImageUrl}
              alt="user_profile"
              fill
              className="object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-component-fill-neutral">
              <UserIcon className="h-9 w-9" />
            </span>
          )}
        </div>
        <p className="text-body-2-normal text-label-normal">{sellerName}</p>
      </span>
    </div>
  );
}

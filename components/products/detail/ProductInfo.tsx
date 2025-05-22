import { UserIcon } from "@/components/icons/UserIcon";
import { ContentType } from "@/lib/api/contentApi";
import { categoryOptionsByType } from "@/lib/data/filterData";
import Image from "next/image";
import ShareButton from "@/components/share-button";

interface ProductInfoProps {
  contentType: string;
  title: string;
  sellerProfileImageUrl: string;
  sellerName: string;
  categoryId: number;
}

export default function ProductInfo({
  contentType,
  title,
  sellerProfileImageUrl,
  sellerName,
  categoryId,
}: ProductInfoProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-between">
        <div className="flex gap-[0.38rem]">
          <span className="rounded-sm bg-primary-sub-1 px-2 py-1 text-xs text-label-inverse">
            {contentType === "DOCUMENT" ? "자료" : "코칭"}
          </span>
          <span className="rounded-sm bg-component-fill-strong px-2 py-1 text-caption-1 text-label-neutral">
            {/* categoryOptionsByType에 따라 카테고리 이름 표시 */}
            {
              // API에서 받은 contentType은 대문자(DOCUMENT, COACHING)이므로 소문자로 변환
              categoryOptionsByType[
                contentType.toLowerCase() as ContentType
              ]?.find(
                (option: { value: string; label: string }) =>
                  option.value === categoryId.toString(),
              )?.label
            }
          </span>
        </div>

        <ShareButton className="h-5 w-5 cursor-pointer hover:scale-115" />
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
              className="rounded-full object-cover"
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

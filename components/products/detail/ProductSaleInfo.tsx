import Button, { LinkButton } from "@/components/button";
import { CalenderIcon } from "@/components/icons/Calender";
import { ClipIcon } from "@/components/icons/ClipIcon";
import { ProductOption } from "@/lib/types/productType";
import ProductSalePackage from "./ProductSalePackage";
import { LocationIcon } from "@/components/icons/LocationIcon";

interface ProductSaleInfoProps {
  options: ProductOption[];
  contentType: string;
  lowestPrice: number;
}

export default function ProductSaleInfo({
  options,
  contentType,
  lowestPrice,
}: ProductSaleInfoProps) {
  return (
    <div className="flex w-full flex-col-reverse md:flex-row md:gap-8">
      <div className="flex flex-col gap-5 md:w-[32%]">
        <h2 className="text-body-1-normal font-semibold text-label-normal">
          {contentType === "COACHING" ? "코칭 상세 정보" : "자료 상세 정보"}
        </h2>

        <div className="flex flex-col gap-2">
          {contentType === "COACHING" ? (
            <span className="flex flex-col gap-2">
              <p className="flex gap-1 text-label-1-normal text-label-alternative">
                <CalenderIcon />
                코칭 기간{" "}
                {options[0]?.coachingPeriod === "ONE_DAY"
                  ? "1일"
                  : options[0]?.coachingPeriod === "TWO_TO_SIX_DAYS"
                    ? "2~6일"
                    : "1주일 이상"}
              </p>
              <p className="flex gap-1 text-label-1-normal text-label-alternative">
                <LocationIcon />
                {options[0]?.coachingTypeDescription}
              </p>
              <p className="flex gap-1 text-label-1-normal text-label-alternative">
                <ClipIcon />
                {options[0]?.documentProvision === "PROVIDED"
                  ? "자료 제공"
                  : "자료 미제공"}
              </p>
            </span>
          ) : (
            <span className="flex gap-1">
              <ClipIcon />
              <p className="text-label-1-normal text-label-alternative">
                {options[0]?.contentDeliveryMethod === "IMMEDIATE_DOWNLOAD"
                  ? "즉시 다운로드 가능"
                  : "작업 후 제공"}
              </p>
            </span>
          )}
        </div>
        <LinkButton
          href={``}
          group="outlined"
          type="tertiary"
          size="x-small"
          className="mt-3 w-full hover:bg-background-alternative"
        >
          문의하기
        </LinkButton>
      </div>

      {/* 오른쪽 가격 */}
      <div className="mb-4 md:mb-0 md:w-[65%]">
        <ProductSalePackage options={options} lowestPrice={lowestPrice} />
      </div>
    </div>
  );
}

("IMMEDIATE_DOWNLOAD");

import Button, { LinkButton } from "@/components/button";
import { CalenderIcon } from "@/components/icons/Calender";
import { ClipIcon } from "@/components/icons/ClipIcon";
import { ProductOption } from "@/lib/types/productType";
import ProductSalePackage from "./ProductSalePackage";

interface ProductSaleInfoProps {
  options: ProductOption[];
  contentType: string;
}

export default function ProductSaleInfo({
  options,
  contentType,
}: ProductSaleInfoProps) {
  return (
    <div className="flex w-full gap-12">
      <div className="flex w-[32%] flex-col gap-5">
        <h2 className="text-body-1-normal font-semibold text-label-normal">
          컨텐츠 상세 정보
        </h2>

        <div className="flex flex-col gap-2">
          {contentType === "COACHING" ? (
            <span className="flex gap-1">
              <CalenderIcon />
              <p className="text-label-1-normal text-label-alternative">
                코칭 기간{" "}
                {options[0].coachingPeriod === "ONE_DAY"
                  ? "1일"
                  : options[0].coachingPeriod === "TWO_TO_SIX_DAYS"
                    ? "2~6일"
                    : "1주일 이상"}
              </p>
              <p className="text-label-1-normal text-label-alternative">
                {options[0].coachingTypeDescription}
              </p>
              <p className="text-label-1-normal text-label-alternative">
                {options[0].documentProvision === "PROVIDED"
                  ? "자료 제공"
                  : "자료 미제공"}
              </p>
            </span>
          ) : (
            <span className="flex gap-1">
              <ClipIcon />
              <p className="text-label-1-normal text-label-alternative">
                {options[0].contentDeliveryMethod === "IMMEDIATE_DOWNLOAD"
                  ? "즉시 다운로드"
                  : "추후 다운로드"}
              </p>
            </span>
          )}
        </div>

        <LinkButton
          href={``}
          group="outlined"
          type="tertiary"
          size="x-small"
          className="w-full"
        >
          문의하기
        </LinkButton>
      </div>

      {/* 오른쪽 가격 */}
      <div className="w-[65%]">
        <ProductSalePackage options={options} />
      </div>
    </div>
  );
}

("IMMEDIATE_DOWNLOAD");

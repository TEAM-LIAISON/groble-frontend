import { LinkButton } from "@/components/button";
import ProductSalePackage from "./product-sale-package";
import { CalenderIcon } from "@/components/(improvement)/icons/Calender";
import { LocationIcon } from "@/components/(improvement)/icons/LocationIcon";
import { ClipIcon } from "@/components/(improvement)/icons/ClipIcon";
import { ProductDetailType, ProductOptionType } from "@/entities/product/model";

/** 코칭 기간 라벨 매핑 */
const PERIOD_LABEL_MAP: Record<
  Exclude<ProductOptionType["coachingPeriod"], undefined>,
  string
> = {
  ONE_DAY: "1일",
  TWO_TO_SIX_DAYS: "2~6일",
  MORE_THAN_ONE_WEEK: "1주일 이상",
};

/** ProductSaleInfo에서 필요한 Props */
export type ProductSaleInfoProps = Pick<
  ProductDetailType,
  "options" | "contentType" | "lowestPrice"
>;

export default function ProductSaleInfo({
  options,
  contentType,
  lowestPrice,
}: ProductSaleInfoProps) {
  const firstOption = options[0];
  const isCoaching = contentType === "COACHING";

  return (
    <div className="mt-9 flex w-full flex-col-reverse md:flex-row md:gap-8">
      {/* 상세 정보 */}
      <div className="flex flex-col md:w-1/3">
        <h2 className="text-headline-1 font-semibold text-label-normal">
          콘텐츠 상세 정보
        </h2>

        {/* 옵션 목록 */}
        <ul className="mt-5 flex flex-col gap-2">
          {isCoaching && firstOption && (
            <>
              <li className="flex gap-1 text-label-1-normal text-label-alternative">
                <CalenderIcon />
                <span>
                  코칭 기간 {PERIOD_LABEL_MAP[firstOption.coachingPeriod!]}
                </span>
              </li>
              <li className="flex gap-1 text-label-1-normal text-label-alternative">
                <LocationIcon />
                {options[0]?.coachingTypeDescription}
              </li>
              <li className="flex gap-1 text-label-1-normal text-label-alternative">
                <ClipIcon />
                {options[0]?.documentProvision === "PROVIDED"
                  ? "자료 제공"
                  : "자료 미제공"}
              </li>
            </>
          )}
          {!isCoaching && firstOption && (
            <li className="flex items-center gap-2 text-label-1-normal text-label-alternative">
              <ClipIcon />
              <span>
                {firstOption.deliveryMethod === "IMMEDIATE_DOWNLOAD"
                  ? "즉시 다운로드 가능"
                  : "작업 후 제공"}
              </span>
            </li>
          )}
        </ul>
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

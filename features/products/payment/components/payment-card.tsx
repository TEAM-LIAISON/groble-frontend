import Image from "next/image";
import { ProductPaymentTypes } from "../types/payment-types";

type PaymentCardProps = Pick<
  ProductPaymentTypes,
  "optionName" | "price" | "sellerName" | "thumbnailUrl" | "title"
>;

export default function PaymentCard({
  optionName,
  price,
  sellerName,
  title,
  thumbnailUrl,
}: PaymentCardProps) {
  const formattedPrice = price.toLocaleString();
  return (
    <div className="flex gap-4 rounded-xl bg-white p-5">
      <div className="relative h-[118px] w-[157px] rounded-[0.37rem]">
        <Image
          src={thumbnailUrl}
          alt="payment-card-image"
          fill
          className="rounded-[0.37rem]"
        />
      </div>
      <div className="flex flex-col justify-center gap-[0.13rem]">
        <p className="text-label-1-normal font-semibold text-label-alternative">
          {sellerName}
        </p>

        <p className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
          {title}
        </p>
        <p className="text-label-1-normal font-normal text-label-alternative">
          {optionName}
        </p>

        <p className="text-body-1-normal font-bold text-label-normal">
          {formattedPrice}
          <span className="text-body1-normal font-medium">원</span>
        </p>
      </div>
    </div>
  );
}

import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { getProductRejectReason } from "@/lib/api/productApi";
import Image from "next/image";
import rejectReasonImage from "./image.svg";
export default async function RejectReasonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getProductRejectReason(Number(id));

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />
        <div className="flex flex-col items-center p-6">
          <Image
            src={rejectReasonImage}
            alt="심사가 반려되었어요"
            width={200}
            height={200}
          />

          <h1 className="mt-4 text-2xl font-bold">심사가 반려되었어요</h1>
          <p className="mt-2 text-gray-500">반려 사유는 아래와 같아요</p>

          <div className="mt-6 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 whitespace-pre-wrap">
            {response.data.data}
          </div>
        </div>
        <BottomArea>
          <BottomLinkButton href={`/products/register?contentId=${id}`}>
            수정하기
          </BottomLinkButton>
        </BottomArea>
      </div>
    </div>
  );
}

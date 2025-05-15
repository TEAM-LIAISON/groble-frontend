import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { getExamineRejectReason } from "@/lib/api";

export default async function RejectReasonPage({
  params,
}: {
  params: Promise<{ contentId: string }>;
}) {
  const { contentId } = await params;
  const response = await getExamineRejectReason(Number(contentId));

  if (response.status !== 200) throw new Error(JSON.stringify(response));

  return (
    <div className="flex min-h-screen flex-col bg-background-normal">
      <Header left={<Back />} />
      <div className="flex flex-col items-center p-6">
        <div className="h-28 w-28 rounded-full bg-gray-300" />

        <h1 className="mt-4 text-2xl font-bold">심사가 반려되었어요</h1>
        <p className="mt-2 text-gray-500">반려 사유는 아래와 같아요</p>

        <div className="mt-6 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 whitespace-pre-wrap">
          {response.data.data}
        </div>
      </div>
      <BottomArea>
        <BottomLinkButton href="/contents/1/cancel">수정하기</BottomLinkButton>
      </BottomArea>
    </div>
  );
}

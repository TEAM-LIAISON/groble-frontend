import BottomArea, { BottomLinkButton } from '@/components/bottom-area';
import Header, { Back } from '@/components/header';
import { getProductRejectReason } from '@/lib/api/productApi';
import Image from 'next/image';
import rejectReasonImage from './image.svg';
import { Button, LinkButton } from '@groble/ui';
import WebHeader from '@/components/(improvement)/layout/header';
export default async function RejectReasonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getProductRejectReason(Number(id));

  return (
    <>
      <WebHeader hideMobile />
      <div className="flex flex-col bg-background-normal md:items-center min-h-screen md:min-h-[calc(100vh-64px)]">
        <div className="w-full  md:max-w-[480px] ">
          <Header left={<Back />} />
          <div className="flex flex-col items-center px-5 md:px-0 md:mt-[150px] mt-10">
            <Image
              src={rejectReasonImage}
              alt="심사가 반려되었어요"
              width={200}
              height={200}
            />

            <h1 className="mt-4 text-2xl font-bold">심사가 반려되었어요</h1>
            <p className="mt-2 text-gray-500">반려 사유는 아래와 같아요</p>

            <div className="mt-6 w-full  rounded-lg border border-line-normal bg-white p-4 whitespace-pre-wrap">
              {response.data.data}
            </div>
          </div>
        </div>

        <div className="mt-auto mb-5 w-full flex justify-center">
          <div className="max-w-[480px] w-full p-5 md:px-0">
            <LinkButton
              href="https://4q124.channel.io"
              group="solid"
              type="primary"
              size="large"
              className="w-full"
            >
              관리자에게 문의하기
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}

import { ChevronIcon } from '@/components/(improvement)/icons';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function MakerCertficationBubble({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      {/* 메이커 인증 말풍선 표시 */}

      <Link
        href="/users/maker/select-type"
        className={twMerge(
          'py-5 px-4 flex justify-between items-center bg-[#FEECEC] rounded-xl border-dashed border-[1.5px] border-status-error cursor-pointer hover:brightness-[102%]',
          className
        )}
      >
        <div className="flex flex-col gap-[0.12rem]">
          <p className="text-body-1-normal font-semibold text-label-normal">
            정산을 받으려면 메이커 인증이 필요해요
          </p>
          <p className="text-body-1-normal text-status-error font-semibold ">
            인증하러 가기
          </p>
        </div>
        <ChevronIcon className="w-5 h-5 text-status-error" />
      </Link>
    </>
  );
}

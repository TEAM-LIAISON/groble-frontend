import Image from 'next/image';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col ">
      <div className="items-start w-full flex-col gap-1 md:flex hidden">
        <h1 className="text-heading-1 font-bold text-label-normal">{title}</h1>
        <p className="text-body-1-normal text-label-alternative">
          고객 운영 현황을 한 눈에 확인하세요
        </p>
      </div>

      <div className="flex flex-col items-center justify-center md:mt-8">
        <div className="relative w-[180px] h-[180px]">
          <Image
            src={'/images/groble-3d-time.svg'}
            alt="groble-3d-time"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-3 text-title-3 font-bold text-label-normal">
          {title} 준비 중
        </div>
        {/* \n 줄바꿈을 실제 줄바꿈으로 처리 */}
        <div className="mt-1 text-body-2-normal text-label-alternative text-center">
          <div style={{ whiteSpace: 'pre-line' }}>
            {description?.replace(/\\n/g, '\n')}
          </div>
        </div>
      </div>
    </div>
  );
}

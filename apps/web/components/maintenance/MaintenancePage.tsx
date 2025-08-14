import Image from 'next/image';

export default function MaintenancePage() {
  return (
    <section className="flex min-h-screen items-center justify-center p-6">
      <div className="mx-auto w-full max-w-[30rem] text-center flex flex-col items-center">
        <div className="mb-6 h-[11rem] w-[11rem] relative">
          <Image
            src="/images/groble-3d-time.svg"
            alt="time"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-title-2 font-bold text-label-normal">
          서비스 점검 중
        </h1>
        <p className="text-body-1-normal text-label-alternative mt-2">
          안정적인 서비스를 위해 준비하고 있어요.
        </p>
        <p className="text-body-1-normal text-label-alternative">
          곧 돌아올게요!
        </p>
      </div>
    </section>
  );
}

import Image from "next/image";

interface ProductHeaderProps {
  thumbnailUrl: string;
}

export default function ProductThumbnail({ thumbnailUrl }: ProductHeaderProps) {
  // thumbnailUrl이 유효한지 확인
  const isValidThumbnail = thumbnailUrl && thumbnailUrl.trim() !== "";

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative aspect-[4/3] w-[20.9rem] max-w-full rounded-[0.75rem]">
        {isValidThumbnail ? (
          <Image
            src={thumbnailUrl}
            alt="thumbnail"
            fill
            className="rounded-[0.75rem] object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-[0.75rem] bg-gray-200">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm">이미지 없음</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

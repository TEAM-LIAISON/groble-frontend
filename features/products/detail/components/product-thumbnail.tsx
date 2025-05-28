import Image from "next/image";

interface ProductHeaderProps {
  thumbnailUrl: string;
}

export default function ProductThumbnail({ thumbnailUrl }: ProductHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative aspect-[4/3] w-[20.9rem] max-w-full rounded-[0.75rem]">
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          fill
          className="rounded-[0.75rem] object-cover"
          priority
        />
      </div>
    </div>
  );
}

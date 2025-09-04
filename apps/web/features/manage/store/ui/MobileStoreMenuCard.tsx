import Image from "next/image";
import Link from "next/link";
import type { MobileStoreMenu } from '../../types/storeTypes';

interface MobileStoreMenuCardProps {
  menu: MobileStoreMenu;
}

export function MobileStoreMenuCard({ menu }: MobileStoreMenuCardProps) {
  return (
    <Link href={menu.href}>
      <div
        className="w-full aspect-square p-4 bg-white rounded-xl shadow-[0px_5px_15px_0px_#00000008,0px_1px_8px_0px_#00000008]"
      >
        <div className="w-9 h-9 aspect-square rounded-full bg-[#EEFFFA] flex items-center justify-center mb-5">
          <Image
            src={menu.icon}
            alt={menu.title}
            width={20}
            height={20}
          />
        </div>
        <h2 className="text-body-2-normal font-semibold mb-0.5">{menu.title}</h2>
        <p className="text-caption-1 font-medium text-label-alternative whitespace-pre-line">
          {menu.description}
        </p>
      </div>
    </Link>
  );
}

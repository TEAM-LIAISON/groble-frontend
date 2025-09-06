import type { MobileStoreMenu } from "../../types/storeTypes";

export const mobileStoreMenuList: MobileStoreMenu[] = [
  {
    title: "대시보드",
    description: "스토어 운영 현황을\n한 눈에 확인해요",
    icon: "/assets/icons/store.svg",
    href: "/manage/store/dashboard",
  },
  {
    title: "마켓 관리",
    description: "나의 브랜드 마켓을\n생성하고 관리해요",
    icon: "/assets/icons/store.svg",
    href: "/manage/store/info",
  },
  {
    title: "상품 관리",
    description: "콘텐츠를 등록하고\n자유롭게 판매해요",
    icon: "/assets/icons/store.svg",
    href: "/manage/store/products",
  },
  {
    title: "정산 관리",
    description: "정산 현황을 한 눈에\n확인해요",
    icon: "/assets/icons/store.svg",
    href: "/manage/store/settlement",
  },
  {
    title: "고객 관리",
    description: "고객 현황을 확인하고\n관리해요",
    icon: "/assets/icons/store.svg",
    href: "/manage/store/customers",
  },
];

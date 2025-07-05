'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  DashboardIcon,
  StoreIcon,
  BoxIcon,
  CustomerIcon,
  SidebarLogoutIcon,
  InformationIcon,
} from '@/features/manage/store/ui/icons';

/**
 * 스토어 관리 메뉴 아이템 타입
 */
interface StoreMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

/**
 * 스토어 관리 사이드바 메뉴 목록
 */
const storeMenuItems: StoreMenuItem[] = [
  {
    id: 'dashboard',
    label: '대시보드',
    href: '/manage/store/dashboard',
    icon: <DashboardIcon className="w-5 h-5" />,
  },
  {
    id: 'info',
    label: '마켓 관리',
    href: '/manage/store/info',
    icon: <StoreIcon className="w-5 h-5" />,
  },
  {
    id: 'products',
    label: '상품 관리',
    href: '/manage/store/products',
    icon: <BoxIcon className="w-5 h-5" />,
  },
  {
    id: 'settlement',
    label: '정산 관리',
    href: '/manage/store/settlement',
    icon: <InformationIcon className="w-5 h-5" />,
  },
  {
    id: 'customers',
    label: '고객 관리',
    href: '/manage/store/customers',
    icon: <CustomerIcon className="w-5 h-5" />,
  },
];

/**
 * 스토어 관리 사이드바 컴포넌트
 * - 고정 포지션으로 스크롤되지 않음
 * - 현재 경로에 따른 활성 메뉴 표시
 */
export default function StoreSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        boxShadow:
          '0px 1px 8px 0px rgba(0, 0, 0, 0.03), 0px 5px 15px 0px rgba(0, 0, 0, 0.03)',
      }}
      className="w-[12.5rem] ml-5 mt-6 rounded-xl bg-white fixed left-0 top-[66px] z-10 py-9 px-5"
    >
      {/* 네비게이션 메뉴 */}
      <nav className="flex-1">
        <ul className="space-y-3">
          {storeMenuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-2 py-3 text-body-2-normal font-semibold rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-[#EEFFFA] text-primary-sub-1 border-green-200'
                        : 'text-label-alternative hover:bg-gray-50 '
                    }
                  `}
                >
                  {/* 아이콘 */}
                  <span
                    className={
                      isActive ? 'text-primary-sub-1' : 'text-label-alternative'
                    }
                  >
                    {item.icon}
                  </span>
                  {/* 메뉴 텍스트 */}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <hr className="my-3 border-line-normal" />
      {/* 사이드바 하단 */}

      <button className="hover:bg-gray-50 cursor-pointer text-label-alternative flex items-center gap-2 px-2 py-3 text-body-2-normal font-semibold rounded-lg w-full transition-colors">
        <SidebarLogoutIcon />
        <span>로그아웃</span>
      </button>
    </aside>
  );
}

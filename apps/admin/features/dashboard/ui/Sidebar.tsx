// features/dashboard/ui/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DashboardCustomerIcon,
  DashboardFolderIcon,
  DashboardHomeIcon,
  DashboardInstanceIcon,
  DashboardMypageIcon,
} from './icons';

const MENU = [
  { label: '홈', href: '/intro', Icon: DashboardHomeIcon },
  { label: '사용자', href: '/users', Icon: DashboardMypageIcon },
  { label: '콘텐츠', href: '/contents', Icon: DashboardFolderIcon },
  { label: '주문', href: '/orders', Icon: DashboardCustomerIcon },
  { label: '정산', href: '/settlement', Icon: DashboardInstanceIcon },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <nav className="space-y-1 w-full min-w-[11.25rem]">
      {MENU.map(({ label, href, Icon }) => {
        const active = path === href || path.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`flex gap-3 items-center text-body-1-normal font-semibold px-5 w-full py-4 rounded-md transition-colors group
              ${
                active
                  ? 'text-primary-sub-1'
                  : 'text-label-assistive hover:text-primary-sub-1'
              }`}
          >
            <Icon className="h-6 w-6" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

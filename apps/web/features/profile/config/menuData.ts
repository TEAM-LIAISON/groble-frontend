import type { ProfileMenuGroup } from '../model/types';
import { OrderListIcon } from '@/components/(improvement)/icons/profile/OrderListIcon';
import { CouponIcon } from '@/components/(improvement)/icons/profile/CouponIcon';
import { OneOnOneChatIcon } from '@/components/(improvement)/icons/profile/1on1ChatIcon';
import { QuestionIcon } from '@/components/(improvement)/icons/profile/QuestionIcon';
import { SettingIcon } from '@/components/(improvement)/icons/profile/SettingIcon';
import { LogoutIcon } from '@/components/(improvement)/icons/profile/LogoutIcon';
import { InformationIcon } from '@/components/(improvement)/icons/profile/InformationIcon';

export const profileMenuGroups: ProfileMenuGroup[] = [
  {
    id: 'shopping',
    items: [
      {
        id: 'purchase-history',
        label: '구매내역',
        icon: OrderListIcon,
        path: '/users/profile/purchase-history',
      },
    ],
  },
  {
    id: 'benefits',
    items: [
      {
        id: 'coupons',
        label: '쿠폰',
        icon: CouponIcon,
        path: '/users/profile/coupons',
      },
    ],
  },
  {
    id: 'support',
    items: [
      {
        id: 'one-on-one',
        label: '1:1 문의하기',
        icon: OneOnOneChatIcon,
        path: '/users/profile/inquiry',
      },
      {
        id: 'notices',
        label: '공지사항',
        icon: InformationIcon,
        path: '/users/profile/notices',
      },
      {
        id: 'faq',
        label: '자주 묻는 질문',
        icon: QuestionIcon,
        path: '/users/profile/faq',
      },
    ],
  },
  {
    id: 'account',
    items: [
      {
        id: 'settings',
        label: '설정',
        icon: SettingIcon,
        path: '/users/profile/settings',
      },
      {
        id: 'logout',
        label: '로그아웃',
        icon: LogoutIcon,
        path: '/auth/logout',
      },
    ],
  },
];

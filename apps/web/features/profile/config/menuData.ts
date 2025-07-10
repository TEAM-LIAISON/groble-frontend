import type { ProfileMenuGroup } from '../model/types';
import { OrderListIcon } from '@/components/(improvement)/icons/profile/OrderListIcon';
import { CouponIcon } from '@/components/(improvement)/icons/profile/CouponIcon';
import { OneOnOneChatIcon } from '@/components/(improvement)/icons/profile/1on1ChatIcon';
import { QuestionIcon } from '@/components/(improvement)/icons/profile/QuestionIcon';
import { SettingIcon } from '@/components/(improvement)/icons/profile/SettingIcon';
import { LogoutIcon } from '@/components/(improvement)/icons/profile/LogoutIcon';
import { InformationIcon } from '@/components/(improvement)/icons/profile/InformationIcon';
import { VerificationIcon } from '@/components/(improvement)/icons/profile/VerificationIcon';

export const profileMenuGroups: ProfileMenuGroup[] = [
  {
    id: 'shopping',
    items: [
      {
        id: 'purchase-history',
        label: '구매내역',
        icon: OrderListIcon,
        path: '/manage/purchase',
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
        id: 'notices',
        label: '공지사항',
        icon: InformationIcon,
        path: 'https://paint-crowley-ff2.notion.site/1f8c158365ac801e9781db1791a7129d?pvs=4',
      },
      {
        id: 'faq',
        label: '자주 묻는 질문',
        icon: QuestionIcon,
        path: 'https://paint-crowley-ff2.notion.site/1f8c158365ac80c493d6cf3ebb656b33?pvs=4',
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
        path: 'LOGOUT_ACTION',
      },
    ],
  },
];

export const sellerProfileMenuGroups: ProfileMenuGroup[] = [
  {
    id: 'verification',
    items: [
      {
        id: 'verification-status',
        label: '인증상태',
        icon: VerificationIcon,
        path: '/users/profile/verification',
        status: 'PENDING', // 기본값, 실제로는 API에서 받아온 값을 사용
      },
    ],
  },
  {
    id: 'shopping',
    items: [
      {
        id: 'purchase-history',
        label: '구매내역',
        icon: OrderListIcon,
        path: '/manage/purchase',
      },
    ],
  },
  {
    id: 'support',
    items: [
      {
        id: 'notices',
        label: '공지사항',
        icon: InformationIcon,
        path: 'https://paint-crowley-ff2.notion.site/1f8c158365ac801e9781db1791a7129d?pvs=4',
      },
      {
        id: 'faq',
        label: '자주 묻는 질문',
        icon: QuestionIcon,
        path: 'https://paint-crowley-ff2.notion.site/1f8c158365ac80c493d6cf3ebb656b33?pvs=4',
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
        path: 'LOGOUT_ACTION',
      },
    ],
  },
];

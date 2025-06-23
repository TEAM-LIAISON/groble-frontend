'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type {
  ProfileMenuGroup,
  ProfileMenuItem,
  VerificationStatus,
} from '../model/types';

interface ProfileMenuListProps {
  menuGroups: ProfileMenuGroup[];
}

const getVerificationStatusText = (status: VerificationStatus) => {
  switch (status) {
    case 'PENDING':
      return '인증 필요';
    case 'IN_PROGRESS':
      return '인증진행중';
    case 'FAILED':
      return '인증실패';
    case 'VERIFIED':
      return '인증 완료';
    default:
      return '';
  }
};

const getVerificationStatusColor = (status: VerificationStatus) => {
  switch (status) {
    case 'PENDING':
      return 'text-status-error';
    case 'IN_PROGRESS':
      return 'text-primary-sub-1';
    case 'FAILED':
      return 'text-status-error';
    case 'VERIFIED':
      return 'text-status-success';
    default:
      return 'text-label-normal';
  }
};

const ProfileMenuItem = ({
  item,
  isActive,
  isFirst,
  isLast,
  isSingle,
}: {
  item: ProfileMenuItem;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSingle: boolean;
}) => {
  const IconComponent = item.icon;

  const getRoundedClass = () => {
    if (isSingle) return 'rounded-xl';
    if (isFirst) return 'rounded-t-xl';
    if (isLast) return 'rounded-b-xl';
    return '';
  };

  // 인증상태 메뉴는 클릭할 수 없게 처리
  const isVerificationStatus = item.id === 'verification-status';

  if (isVerificationStatus) {
    return (
      <div
        className={`flex items-center justify-between px-4 py-5 text-body-1-normal font-semibold text-label-normal ${getRoundedClass()} ${
          isActive ? 'bg-gray-200' : 'bg-background-alternative'
        }`}
      >
        <div className="flex items-center gap-3">
          <IconComponent />
          <span className="text-body-1 font-medium">{item.label}</span>
        </div>

        {item.status && (
          <span
            className={`text-label-2-normal font-medium ${getVerificationStatusColor(
              item.status
            )}`}
          >
            {getVerificationStatusText(item.status)}
          </span>
        )}
      </div>
    );
  }

  return (
    <Link href={item.path}>
      <div
        className={`flex items-center justify-between px-4 py-5 cursor-pointer transition-colors text-body-1-normal font-semibold text-label-normal ${getRoundedClass()} ${
          isActive
            ? 'bg-gray-200'
            : 'hover:bg-gray-100 bg-background-alternative'
        }`}
      >
        <div className="flex items-center gap-3">
          <IconComponent />
          <span className="text-body-1 font-medium">{item.label}</span>
        </div>

        {item.status && (
          <span
            className={`text-label-2-normal font-medium ${getVerificationStatusColor(
              item.status
            )}`}
          >
            {getVerificationStatusText(item.status)}
          </span>
        )}
      </div>
    </Link>
  );
};

const ProfileMenuGroup = ({
  group,
  pathname,
}: {
  group: ProfileMenuGroup;
  pathname: string;
}) => {
  const itemCount = group.items.length;
  const isSingleItem = itemCount === 1;

  return (
    <div className="flex flex-col">
      {group.items.map((item, index) => (
        <ProfileMenuItem
          key={item.id}
          item={item}
          isActive={pathname === item.path}
          isFirst={index === 0}
          isLast={index === itemCount - 1}
          isSingle={isSingleItem}
        />
      ))}
    </div>
  );
};

export function ProfileMenuList({ menuGroups }: ProfileMenuListProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3 mt-3">
      {menuGroups.map((group) => (
        <ProfileMenuGroup key={group.id} group={group} pathname={pathname} />
      ))}
    </div>
  );
}

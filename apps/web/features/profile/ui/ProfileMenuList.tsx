'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { ProfileMenuGroup, ProfileMenuItem } from '../model/types';

interface ProfileMenuListProps {
  menuGroups: ProfileMenuGroup[];
}

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

  return (
    <Link href={item.path}>
      <div
        className={`flex items-center gap-3 px-4 py-5 cursor-pointer transition-colors text-body-1-normal font-semibold text-label-normal ${getRoundedClass()} ${
          isActive
            ? 'bg-gray-200'
            : 'hover:bg-gray-100 bg-background-alternative'
        }`}
      >
        <IconComponent />
        <span className="text-body-1 font-medium">{item.label}</span>
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
    <div className="flex flex-col gap-3 mt-8">
      {menuGroups.map((group) => (
        <ProfileMenuGroup key={group.id} group={group} pathname={pathname} />
      ))}
    </div>
  );
}

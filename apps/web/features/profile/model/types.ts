export interface UserDetail {
  nickname: string;
  userType: 'BUYER' | 'SELLER' | 'BUYER / SELLER';
  accountType: string;
  providerType: string;
  email: string;
  profileImageUrl: string;
  phoneNumber: string;
  canSwitchToSeller: boolean;
  sellerAccountNotCreated: boolean;
}

import { ComponentType } from 'react';

export interface ProfileMenuItem {
  id: string;
  label: string;
  icon: ComponentType;
  path: string;
}

export interface ProfileMenuGroup {
  id: string;
  items: ProfileMenuItem[];
}

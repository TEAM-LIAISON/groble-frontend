export type VerificationStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'FAILED'
  | 'VERIFIED';

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
  verificationStatus?: VerificationStatus;
  alreadyRegisteredAsSeller: boolean;
}

import { ComponentType } from 'react';

export interface ProfileMenuItem {
  id: string;
  label: string;
  icon: ComponentType;
  path: string;
  status?: VerificationStatus;
}

export interface ProfileMenuGroup {
  id: string;
  items: ProfileMenuItem[];
}

export interface ProfileImageUploadData {
  originalFileName: string;
  fileUrl: string;
  contentType: string;
  directory: string;
}

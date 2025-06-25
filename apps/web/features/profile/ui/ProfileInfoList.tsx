'use client';
import ProfileInfoItem from './ProfileInfoItem';
import { UserDetail } from '../model/types';
import { GroupIcon } from '@/components/(improvement)/icons/profile/GroupIcon';
import { SettingIcon } from '@/components/(improvement)/icons/profile/SettingIcon';
import { LockIcon } from '@/components/(improvement)/icons/profile/LockIcon';
import { PhoneIcon } from '@/components/(improvement)/icons/profile/PhoneIcon';
import { ProfileCheerIcon } from '@/components/(improvement)/icons/profile/ProfileCheerIcon';
import { EmailIcon } from '@/components/(improvement)/icons/profile/EmailIcon';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Modal } from '@groble/ui';
import { useSwitchUserType } from '../hooks/useSwitchUserType';

interface ProfileInfoListProps {
  userData?: UserDetail;
}

/**
 * 프로필 정보 목록 컴포넌트
 * 닉네임, 이메일, 비밀번호, 전화번호, 유형 정보를 표시
 */
export default function ProfileInfoList({ userData }: ProfileInfoListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const switchUserTypeMutation = useSwitchUserType();

  // 비밀번호 마스킹 처리
  const maskedPassword = '••••••••••';

  // 전화번호 포맷팅 (010-1234-5678 형태로)
  const formatPhoneNumber = (phone?: string) => {
    if (!phone) return '';
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  // 유형 표시 (구매자/메이커)
  const getUserTypeDisplay = (userType?: string) => {
    switch (userType) {
      case 'BUYER':
        return '메이커로 전환하기';
      case 'SELLER':
        return '구매자로 전환하기';
      default:
        return '메이커로 전환하기';
    }
  };

  // providerType에 따른 로그인 라벨 표시
  const getLoginTypeLabel = (providerType?: string) => {
    switch (providerType) {
      case 'KAKAO':
        return '카카오 로그인';
      case 'NAVER':
        return '네이버 로그인';
      case 'GOOGLE':
        return '구글 로그인';
      case 'EMAIL':
      default:
        return '이메일 로그인';
    }
  };

  const handleNicknameClick = () => {
    // 닉네임 수정 페이지로 이동 (replace를 사용하여 뒤로가기 시에도 새로운 데이터 로드)
    router.push(`/users/patch/nickname?nickname=${userData?.nickname}`);
  };

  const handleEmailClick = () => {
    // 이메일 수정 페이지로 이동
    router.push(`/users/patch/email?email=${userData?.email}`);
  };

  const handlePasswordClick = () => {
    // 비밀번호 변경 페이지로 이동
    router.push(`/users/patch/password?email=${userData?.email}`);
  };

  const handlePhoneClick = () => {
    // 전화번호 수정 페이지로 이동
    router.push(`/users/patch/phone?phone=${userData?.phoneNumber}`);
  };

  const handleUserTypeClick = () => {
    // BUYER이고 sellerAccountNotCreated가 false인 경우 select-type 페이지로 이동
    if (
      userData?.userType === 'BUYER' &&
      userData?.sellerAccountNotCreated === false
    ) {
      router.push('/users/maker/select-type');
      return;
    }

    // 그 외의 경우 유형 변경 모달 열기
    setIsUserTypeModalOpen(true);
  };

  const handleUserTypeSwitchConfirm = () => {
    // 현재 유형에 따라 반대 유형으로 전환
    const newUserType = userData?.userType === 'BUYER' ? 'SELLER' : 'BUYER';

    switchUserTypeMutation.mutate(
      { userType: newUserType },
      {
        onSuccess: () => {
          setIsUserTypeModalOpen(false);
        },
      }
    );
  };

  const handleUserTypeModalClose = () => {
    setIsUserTypeModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden">
        <ProfileInfoItem
          icon={<ProfileCheerIcon />}
          label="닉네임"
          value={userData?.nickname || '김그로블'}
          onClick={handleNicknameClick}
        />

        <ProfileInfoItem
          icon={<EmailIcon />}
          label={getLoginTypeLabel(userData?.providerType)}
          value={userData?.email || 'Groble@gmail.com'}
          onClick={handleEmailClick}
        />

        {/* 소셜 계정이 아닐 때만 비밀번호 항목 표시 */}
        {userData?.accountType !== 'SOCIAL' && (
          <ProfileInfoItem
            icon={<LockIcon />}
            label="비밀번호"
            value={maskedPassword}
            onClick={handlePasswordClick}
          />
        )}

        <ProfileInfoItem
          icon={<PhoneIcon />}
          label="전화번호"
          value={formatPhoneNumber(userData?.phoneNumber) || '010-7292-1378'}
          onClick={handlePhoneClick}
        />

        <ProfileInfoItem
          icon={<GroupIcon />}
          label="유형"
          value={getUserTypeDisplay(userData?.userType)}
          onClick={handleUserTypeClick}
        />
      </div>

      {/* 유형 변경 모달 */}
      <Modal
        isOpen={isUserTypeModalOpen}
        onRequestClose={handleUserTypeModalClose}
        title={`${
          userData?.userType === 'BUYER' ? '메이커' : '구매자'
        }로 전환할까요?`}
        subText={`${
          userData?.userType === 'BUYER' ? '메이커' : '구매자'
        }로 전환하시겠습니까?`}
        actionButton="전환하기"
        secondaryButton="닫기"
        onActionClick={handleUserTypeSwitchConfirm}
        onSecondaryClick={handleUserTypeModalClose}
      />
    </>
  );
}

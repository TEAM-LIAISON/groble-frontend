export type SocialProvider = 'google' | 'naver' | 'kakao';

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  isRecentLogin?: boolean;
  disabled?: boolean;
  onClick: (provider: SocialProvider) => void;
}

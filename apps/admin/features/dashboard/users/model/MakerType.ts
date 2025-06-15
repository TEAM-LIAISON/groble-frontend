// File: /apps/admin/features/dashboard/users/model/MakerType.ts

import { ApiResponse } from '@/shared/api/type';

// 사업자 유형 enum
export type BusinessType =
  | 'individual-simple'
  | 'individual-general'
  | 'corporation';

// 메이커 상세 정보 데이터 타입
export interface MakerDetailData {
  isBusinessMaker: boolean; // 사업자 메이커 여부
  bankAccountOwner: string; // 정산 계좌 예금주 이름
  bankName: string; // 정산용 은행명
  bankAccountNumber: string; // 정산 계좌번호
  copyOfBankbookUrl?: string; // 통장 사본 이미지 URL
  businessType?: BusinessType; // 사업자 유형
  businessCategory?: string; // 사업자 업종(업태)
  businessSector?: string; // 사업 분야
  businessName?: string; // 사업자 등록 상의 상호명
  representativeName?: string; // 대표자명
  businessAddress?: string; // 사업장 소재지 주소
  businessLicenseFileUrl?: string; // 사업자등록증 파일 URL
  taxInvoiceEmail?: string; // 세금계산서 수령 이메일
}

// 사업자 유형 한글 매핑
export const BusinessTypeLabels: Record<BusinessType, string> = {
  'individual-simple': '개인·간이과세자',
  'individual-general': '개인·일반과세자',
  corporation: '법인사업자',
};

// 메이커 유형 enum
export type MakerType = 'individual' | 'business' | 'none';

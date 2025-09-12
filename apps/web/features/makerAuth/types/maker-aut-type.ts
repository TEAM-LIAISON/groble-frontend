// 자료 파일 업로드 응답 타입 정의
export interface BusinessLicenseUploadResponse {
  originalFileName: string;
  fileUrl: string;
  contentType: string;
  directory: string;
}

// 메이커 통장 정보 등록 요청 타입 정의
export interface RegisterMakerBankAccountRequest {
  bankAccountOwner: string;
  bankName: string;
  bankAccountNumber: string;
  copyOfBankbookUrl: string;
  birthDate: {
    year: string;
    month: string;
    day: string;
  };
}

// 메이커 사업자 정보 등록 요청 타입 정의
export interface RegisterMakerBusinessRequest {
  businessType: "INDIVIDUAL_SIMPLIFIED" | "INDIVIDUAL_NORMAL" | "CORPORATE";
  businessCategory: string;
  businessSector: string;
  businessName: string;
  representativeName: string;
  businessAddress: string;
  businessLicenseFileUrl: string;
}

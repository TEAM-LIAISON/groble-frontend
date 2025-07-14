import { ApiResponse } from '@/shared/types/api-types';
import {
  BusinessLicenseUploadResponse,
  RegisterMakerBankAccountRequest,
  RegisterMakerBusinessRequest,
} from '../types/maker-aut-type';
import { fetchClient } from '@/shared/api/api-fetch';

/**
 * 통장 사본 파일을 업로드하는 함수
 * @param file 업로드할 파일
 * @returns 업로드 결과 (fileUrl 포함)
 * @throws 업로드 실패 시 오류 발생
 */
export async function uploadBankbookCopy(file: File): Promise<string> {
  if (!file) {
    throw new Error('파일이 선택되지 않았습니다.');
  }

  // 파일 크기 검증 (10MB 제한)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('파일 크기는 10MB 이하여야 합니다.');
  }

  // 파일 타입 검증
  if (
    ![
      'application/pdf',
      'application/zip',
      'application/x-zip-compressed',
      'image/jpeg',
      'image/png',
    ].includes(file.type)
  ) {
    throw new Error('PDF, ZIP, 이미지 파일만 업로드 가능합니다.');
  }

  const formData = new FormData();
  formData.append('bankbookCopyImage', file);

  // 실제 API 요청
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/account-verification/upload-bankbook-copy`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }
  );

  // 413 상태 코드(Payload Too Large)를 특별히 처리
  if (response.status === 413) {
    throw new Error(
      '파일 크기가 서버 허용 용량을 초과하여 업로드에 실패했습니다. 더 작은 크기의 파일을 업로드해 주세요.'
    );
  } else if (!response.ok) {
    throw new Error(
      `파일 업로드에 실패했습니다. 상태 코드: ${response.status}`
    );
  }

  const responseData: ApiResponse<BusinessLicenseUploadResponse> =
    await response.json();

  if (responseData.status === 'SUCCESS' && responseData.data) {
    return responseData.data.fileUrl;
  } else {
    throw new Error(responseData.message || '파일 업로드에 실패했습니다.');
  }
}

/**
 * 사업자 등록증 파일을 업로드하는 함수
 * @param file 업로드할 파일
 * @returns 업로드 결과 (fileUrl 포함)
 * @throws 업로드 실패 시 오류 발생
 */
export async function uploadBusinessCertificate(file: File): Promise<string> {
  if (!file) {
    throw new Error('파일이 선택되지 않았습니다.');
  }

  // 파일 크기 검증 (10MB 제한)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('파일 크기는 10MB 이하여야 합니다.');
  }

  // 파일 타입 검증
  if (
    ![
      'application/pdf',
      'application/zip',
      'application/x-zip-compressed',
      'image/jpeg',
      'image/png',
    ].includes(file.type)
  ) {
    throw new Error('PDF, ZIP, 이미지 파일만 업로드 가능합니다.');
  }

  const formData = new FormData();
  formData.append('businessLicenseImage', file);

  // 실제 API 요청
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/account-verification/upload-business-license`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }
  );

  // 413 상태 코드(Payload Too Large)를 특별히 처리
  if (response.status === 413) {
    throw new Error(
      '파일 크기가 서버 허용 용량을 초과하여 업로드에 실패했습니다. 더 작은 크기의 파일을 업로드해 주세요.'
    );
  } else if (!response.ok) {
    throw new Error(
      `파일 업로드에 실패했습니다. 상태 코드: ${response.status}`
    );
  }

  const responseData: ApiResponse<BusinessLicenseUploadResponse> =
    await response.json();

  if (responseData.status === 'SUCCESS' && responseData.data) {
    return responseData.data.fileUrl;
  } else {
    throw new Error(responseData.message || '파일 업로드에 실패했습니다.');
  }
}

/**
 * 메이커 사업자 통장 정보 등록
 */
export async function registerMakerBankAccount(
  data: RegisterMakerBankAccountRequest,
  type: 'private' | 'corporate'
) {
  let makerType: 'personal' | 'business';

  if (type === 'private') {
    makerType = 'personal';
  } else {
    makerType = 'business';
  }

  const response = await fetchClient<
    ApiResponse<RegisterMakerBankAccountRequest>
  >(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/account-verification/${makerType}-maker`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

/**
 * 메이커 사업자 정보 등록
 */
export async function registerMakerBusiness(
  data: RegisterMakerBusinessRequest
) {
  const response = await fetchClient<ApiResponse<RegisterMakerBusinessRequest>>(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/account-verification/business`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

/**
 * 메이커 약관 동의 API
 */
export async function agreeMakerTerms(): Promise<ApiResponse<any>> {
  const response = await fetchClient<any>(`/api/v1/maker/terms/agree`, {
    method: 'POST',
    body: JSON.stringify({ makerTermsAgreement: true }),
  });

  return response;
}

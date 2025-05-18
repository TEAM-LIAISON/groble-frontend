// 썸네일 업로드 응답 타입 정의
export interface ThumbnailUploadResponse {
  originalFileName: string;
  fileUrl: string;
  contentType: string;
  directory: string;
}

export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * 썸네일 이미지를 업로드하는 함수
 * @param file 업로드할 이미지 파일
 * @returns 업로드 결과 (fileUrl 포함)
 * @throws 업로드 실패 시 오류 발생
 */
export async function uploadThumbnailImage(file: File): Promise<string> {
  if (!file) {
    throw new Error("파일이 선택되지 않았습니다.");
  }

  // 파일 크기 검증 (10MB 제한)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("파일 크기는 10MB 이하여야 합니다.");
  }

  // 파일 타입 검증
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드 가능합니다.");
  }

  const formData = new FormData();
  formData.append("contentThumbnailImage", file);

  // 실제 API 요청
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/content/thumbnail/image`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  // 413 상태 코드(Payload Too Large)를 특별히 처리
  if (response.status === 413) {
    throw new Error(
      "파일 크기가 서버 허용 용량을 초과하여 업로드에 실패했습니다. 더 작은 크기의 파일을 업로드해 주세요.",
    );
  } else if (!response.ok) {
    throw new Error(
      `이미지 업로드에 실패했습니다. 상태 코드: ${response.status}`,
    );
  }

  const responseData: ApiResponse<ThumbnailUploadResponse> =
    await response.json();

  if (responseData.status === "SUCCESS" && responseData.data) {
    return responseData.data.fileUrl;
  } else {
    throw new Error(responseData.message || "이미지 업로드에 실패했습니다.");
  }
}

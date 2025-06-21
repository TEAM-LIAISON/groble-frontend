import { fetchClient } from '@/shared/api/api-fetch';

export interface SetNicknameRequest {
  nickname: string;
}

export interface SetNicknameResponse {
  success: boolean;
  message?: string;
}

export const setNickname = async (data: SetNicknameRequest) => {
  const url = `/api/v1/user/info/set-nickname?nickname=${encodeURIComponent(
    data.nickname
  )}`;

  return fetchClient<SetNicknameResponse>(url, {
    method: 'POST',
  });
};

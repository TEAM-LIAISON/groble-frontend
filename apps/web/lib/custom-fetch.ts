import { cookies } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { getGetUserMyPageDetailUrl } from './api';

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = async <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    try {
      return await c.json();
    } catch (error) {
      console.error(error);
      return null as T;
    }
  }

  if (contentType?.includes('application/pdf')) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  const requestUrl = new URL(`${baseUrl}${contextUrl}`);

  return requestUrl.toString();
};

// NOTE: Add headers
const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const cookieStore = await cookies();
  const cookieList = [];
  const accessToken = cookieStore.get('accessToken')?.value;
  if (accessToken) cookieList.push(`accessToken=${accessToken}`);
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (refreshToken) cookieList.push(`refreshToken=${refreshToken}`);

  return {
    Cookie: cookieList.join('; '),
    ...headers,
  };
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody<T>(response);

  const getUserMyPageDetailUrl = getGetUserMyPageDetailUrl(
    // @ts-expect-error
    {}
  );

  if (response.status === 401 && url !== getUserMyPageDetailUrl) unauthorized();

  return { status: response.status, data, headers: response.headers } as T;
};

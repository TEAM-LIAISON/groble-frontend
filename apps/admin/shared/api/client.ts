export const apiClient = (path: string, options: RequestInit = {}) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
